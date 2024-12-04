import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PassportLocalGuard extends AuthGuard('local') {}
