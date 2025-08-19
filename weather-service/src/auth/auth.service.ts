import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Redis } from 'ioredis';

import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from 'src/users/dto/register.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Errors } from 'src/enum/errors.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async register(dto: RegisterDto) {
    const user: UserDocument = await this.usersService.create(dto);
    const payload = { sub: user._id, email: user.email };

    return { access_token: this.jwtService.sign(payload) };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findEntityByEmail(dto.email);

    if (!user) throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);

    const payload = { sub: user._id, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    await this.redisClient.set(`token:${accessToken}`, 'valid', 'EX', 3600);

    return { access_token: accessToken };
  }

  async logout(token: string | undefined) {
    if (!token) throw new Error(Errors.TOKEN_NOT_FOUND);

    await this.redisClient.del(`token:${token}`);
  }

  async isTokenValid(token: string): Promise<boolean> {
    const exists = await this.redisClient.get(`token:${token}`);

    return !!exists;
  }
}
