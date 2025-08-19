export type RegisterRequestDto = {
	name: string;
	email: string;
	password: string;
};

export type RegisterResponseDto = {
	access_token: string;
};
