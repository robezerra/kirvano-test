import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    const AUTH_SECRET = configService.get<string>('AUTH_SECRET');

    if (!AUTH_SECRET) {
      throw new Error('Auth secret não encontrada');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: { jti: string; sub: string; email: string },
  ) {
    const authHeader = req.headers['authorization'];
    const token =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : undefined;

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    const isValid = await this.authService.isTokenValid(token);

    if (!isValid) {
      throw new UnauthorizedException('Token inválido');
    }
    return { userId: payload.sub, email: payload.email, token };
  }
}
