import { LoginRequestDto, LoginResponseDto } from "../../dto/login.dto";
import {
	RegisterRequestDto,
	RegisterResponseDto,
} from "../../dto/register.dto";

export interface IAuthService {
	login(dto: LoginRequestDto): Promise<LoginResponseDto>;
	register(dto: RegisterRequestDto): Promise<RegisterResponseDto>;
}
