import { Module } from '@nestjs/common';
import { SawService } from './saw.service';
import { SawController } from './saw.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [SawController],
  providers: [SawService],
  exports: [SawService],
})
export class SawModule {}

