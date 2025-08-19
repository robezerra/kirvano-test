import axios from "axios";

import { IAuthService } from "./auth.interface";
import { LoginRequestDto, LoginResponseDto } from "../../dto/login.dto";
import {
	RegisterRequestDto,
	RegisterResponseDto,
} from "../../dto/register.dto";
// @ts-ignore
const { default: api } = await import("host_app/api");

export class AuthService implements IAuthService {
	private apiPath: string = "/auth";

	async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
		const response = await api.post(this.apiPath + "/login", dto);

		return response.data;
		// try {
		// } catch (error) {
		// 	throw new Error(error?.response?.data);
		// }
	}

	async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
		try {
			const response = await api.post(this.apiPath + "/register", dto);
			return response.data;
		} catch (error) {
			throw new Error(error?.response?.data?.data);
		}
	}
}
