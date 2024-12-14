import type { components } from "./core";

export type LoginRequest = {
	username: string;
	password: string;
};

export type TokenResponse = components["schemas"]["OAuthTokenResponse"];
