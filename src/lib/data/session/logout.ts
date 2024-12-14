import { apiPaths } from "../api";
import { page } from "$app/stores";
import type { WithApiClient } from "../api-client";
import { createMutation } from "@tanstack/svelte-query";
import { goto } from "$app/navigation";
import { get } from "svelte/store";

type Logout = WithApiClient<{}>;

async function performLogout({ apiClient }: Logout) {
	const res = await apiClient<string>(apiPaths.logout);
	return res;
}

export function useLogoutUser() {
	const {
		data: { authManager },
	} = get(page);
	return createMutation({
		mutationFn: performLogout,
		onSuccess: async () => {
			authManager.logout();
			goto("/login");
		},
	});
}
