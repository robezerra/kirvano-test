export type LoginRequestDto = {
	email: string;
	password: string;
};

export type LoginResponseDto = {
	access_token: string;
};
