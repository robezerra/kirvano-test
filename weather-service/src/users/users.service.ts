import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/find-user.dto';
import { mapUserToDto } from './mapper/map-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { Errors } from 'src/enum/errors.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(dto: RegisterDto): Promise<UserDocument> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) throw new ConflictException(Errors.EMAIL_ALREADY_IN_USE);

    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });
  }

  // For internal use — returns the full entity
  async findEntityByEmail(email: string): Promise<UserDocument> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);

    return user;
  }

  // For API response use — returns only public fields
  async findPublicByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);

    return mapUserToDto(user);
  }

  // For internal use — returns the full entity
  private async findEntityById(id: string): Promise<UserDocument> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);

    return user;
  }

  // For API response use — returns only public fields
  async findPublicById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);

    return mapUserToDto(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<{ message: string }> {
    const user = await this.findEntityById(id);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);

    if (dto.email && dto.email !== user.email) {
      const existing: User | null = await this.usersRepository.findByEmail(
        dto.email,
      );

      if (existing) throw new ConflictException(Errors.EMAIL_ALREADY_IN_USE);
      user.email = dto.email;
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    await this.usersRepository.update((user._id = id), {
      name: user.name,
      email: user.email,
      password: user.passwordHash,
    });

    return {
      message: 'Usuário atualizado com sucesso',
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(id);

    if (result.deletedCount === 0)
      throw new NotFoundException(Errors.USER_NOT_FOUND);

    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
