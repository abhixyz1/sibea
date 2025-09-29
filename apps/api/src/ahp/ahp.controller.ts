import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AhpService } from './ahp.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { 
  UserRole, 
  type AuthUser 
} from '@sibea/shared';

import { ahpMatrixSchema, type AhpMatrixDto, computeAhpWeightsSchema, type ComputeAhpWeightsDto } from '@sibea/shared';

@ApiTags('AHP')
@Controller('ahp')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AhpController {
  constructor(private ahpService: AhpService) {}

  @Post('matrices')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create or update AHP pairwise comparison matrix' })
  async createOrUpdateMatrix(
    @Body() dto: AhpMatrixDto,
    @CurrentUser() user: AuthUser,
  ) {
    // Validasi pakai Zod biar semua field required
    const parsed = ahpMatrixSchema.parse(dto);
    return this.ahpService.createOrUpdateMatrix(parsed, user.id);
  }

  @Post('compute')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Compute AHP weights and consistency ratio' })
  async computeWeights(
    @Body() dto: ComputeAhpWeightsDto,
    @CurrentUser() user: AuthUser,
  ) {
    const parsed = computeAhpWeightsSchema.parse(dto);
    return this.ahpService.computeWeights(parsed, user.id);
  }

  @Get('matrices/:scholarshipId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.VERIFIKATOR, UserRole.AUDITOR)
  @ApiOperation({ summary: 'Get AHP matrix for scholarship' })
  async getMatrix(@Param('scholarshipId') scholarshipId: string) {
    return this.ahpService.getMatrix(scholarshipId);
  }
}
