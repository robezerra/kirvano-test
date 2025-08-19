export interface IAuthService {
	isJwtValid(token: string): Promise<boolean>;
	getToken(): string | null;
}
