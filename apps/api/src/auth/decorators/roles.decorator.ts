import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@sibea/shared';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

