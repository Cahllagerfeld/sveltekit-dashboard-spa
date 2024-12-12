import type { ServerActivation } from "@/types/server";
import type { ApiClient } from "../api-client";
import { apiPaths } from "../api";
import type { User } from "@/types/user";
import { createMutation, type CreateMutationOptions } from "@tanstack/svelte-query";
import type { FetchError } from "@/fetch-error";

type ActivateServerArgs = {
	body: ServerActivation;
	client: ApiClient;
};
async function activateServer({ body, client }: ActivateServerArgs) {
	const response = await client<User>(apiPaths.activate, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	return response;
}

export function useServerActivation(
	options?: CreateMutationOptions<User | null, FetchError, ActivateServerArgs>
) {
	return createMutation({
		...options,
		mutationFn: activateServer,
	});
}
