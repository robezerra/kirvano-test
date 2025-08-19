export class UserResponseDto {
  id: string;
  name: string;
  email: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
