import { UserResponseDto } from '../dto/find-user.dto';
import { UserDocument } from '../schemas/user.schema';

export function mapUserToDto(user: UserDocument): UserResponseDto {
  return { id: String(user._id), name: user.name, email: user.email };
}
