import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/enums/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext,): boolean {
    const requiredRols = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user; 
    const hasRequiredRole = requiredRols.some((role) => user.role == role);
    return hasRequiredRole
  }
}
