import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { LoginDto, RegisterDto, type AuthTokens, type AuthUser } from '@sibea/shared';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private auditService: AuditService,
  ) {}

  async register(registerDto: RegisterDto, ipAddress?: string, userAgent?: string): Promise<AuthTokens> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        passwordHash,
        role: registerDto.role,
      },
    });

    await this.auditService.log({
      actorId: user.id,
      action: 'CREATE',
      entity: 'User',
      entityId: user.id,
      newData: { email: user.email, role: user.role },
      ipAddress,
      userAgent,
    });

    return this.generateTokens(user.id);
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { profileSiswa: true },
    });

    if (!user || !(await argon2.verify(user.passwordHash, loginDto.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    await this.auditService.log({
      actorId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress,
      userAgent,
    });

    return this.generateTokens(user.id);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.auditService.log({
      actorId: userId,
      action: 'LOGOUT',
      entity: 'User',
      entityId: userId,
      ipAddress,
      userAgent,
    });
  }

  async validateUser(userId: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profileSiswa: true },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      role: user.role as any, // Type assertion to resolve enum mismatch
      profileSiswa: user.profileSiswa ? {
        ...user.profileSiswa,
        jenisKelamin: user.profileSiswa.jenisKelamin as 'L' | 'P', // Type assertion for gender
      } : undefined,
      permissions: this.getPermissions(user.role),
    };
  }

  private async generateTokens(userId: string): Promise<AuthTokens> {
    const payload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION', '1h'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private getPermissions(role: string): string[] {
    const permissions: Record<string, string[]> = {
      ADMIN: [
        'users:read',
        'users:write',
        'scholarships:read',
        'scholarships:write',
        'criteria:read',
        'criteria:write',
        'applications:read',
        'applications:write',
        'ahp:read',
        'ahp:write',
        'saw:read',
        'saw:write',
        'results:read',
        'results:write',
        'audit:read',
      ],
      VERIFIKATOR: [
        'scholarships:read',
        'applications:read',
        'applications:write',
        'results:read',
      ],
      OPERATOR: [
        'scholarships:read',
        'criteria:read',
        'criteria:write',
        'applications:read',
        'ahp:read',
        'ahp:write',
        'saw:read',
        'saw:write',
        'results:read',
        'results:write',
      ],
      SISWA: [
        'scholarships:read',
        'applications:read',
        'applications:write:own',
        'profile:read:own',
        'profile:write:own',
      ],
      AUDITOR: [
        'scholarships:read',
        'applications:read',
        'results:read',
        'audit:read',
      ],
    };

    return permissions[role] || [];
  }
}

