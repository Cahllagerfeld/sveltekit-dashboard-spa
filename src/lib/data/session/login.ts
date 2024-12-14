import { apiPaths } from "@/data/api";
import { type LoginRequest, type TokenResponse } from "@/types/session";
import { type ApiClient } from "../api-client";
import { createMutation, type CreateMutationOptions } from "@tanstack/svelte-query";

type Login = {
	apiClient: ApiClient;
	body: LoginRequest;
};

export async function loginUser({ apiClient, body }: Login) {
	const response = await apiClient<TokenResponse>(apiPaths.login, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams(body),
	});
	return response;
}

export function useLoginUser(options?: CreateMutationOptions<TokenResponse, unknown, Login>) {
	return createMutation<TokenResponse, unknown, Login>({
		...options,
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
	});
}
