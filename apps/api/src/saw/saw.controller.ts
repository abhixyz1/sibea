import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { SawService } from './saw.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { 
  UserRole, 
  type AuthUser, 
  type SawBulkScoreDto, 
  type ComputeSawRankingDto 
} from '@sibea/shared';

@ApiTags('SAW')
@Controller('saw')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SawController {
  constructor(private sawService: SawService) {}

  @Post('scores')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Import SAW scores for applications' })
  @ApiResponse({ status: 201, description: 'Scores imported successfully' })
  @ApiResponse({ status: 400, description: 'Invalid score data' })
  @ApiResponse({ status: 404, description: 'Scholarship not found' })
  async importScores(
    @Body() dto: SawBulkScoreDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.sawService.importScores(dto, user.id);
  }

  @Post('compute')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Compute SAW ranking with normalization' })
  @ApiResponse({ status: 200, description: 'Ranking computed successfully' })
  @ApiResponse({ status: 400, description: 'Missing weights or scores' })
  @ApiResponse({ status: 404, description: 'Scholarship not found' })
  async computeRanking(
    @Body() dto: ComputeSawRankingDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.sawService.computeRanking(dto, user.id);
  }

  @Get('ranking/:scholarshipId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.VERIFIKATOR, UserRole.AUDITOR)
  @ApiOperation({ summary: 'Get SAW ranking results' })
  @ApiResponse({ status: 200, description: 'Ranking retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ranking not found' })
  async getRanking(@Param('scholarshipId') scholarshipId: string) {
    return this.sawService.getRanking(scholarshipId);
  }
}

