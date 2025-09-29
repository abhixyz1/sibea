import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScholarshipsModule } from './scholarships/scholarships.module';
// import { CriteriaModule } from './criteria/criteria.module';
// import { ApplicationsModule } from './applications/applications.module';
import { AhpModule } from './ahp/ahp.module';
import { SawModule } from './saw/saw.module';
// import { ResultsModule } from './results/results.module';
// import { FilesModule } from './files/files.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ScholarshipsModule,
    // CriteriaModule,
    // ApplicationsModule,
    AhpModule,
    SawModule,
    // ResultsModule,
    // FilesModule,
    AuditModule,
  ],
})
export class AppModule {}
