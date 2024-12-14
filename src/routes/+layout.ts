import { browser } from "$app/environment";
import { createApiClient } from "@/data/api-client";
import { serverQueries } from "@/data/server";
import { redirect } from "@sveltejs/kit";
import { QueryCache, QueryClient } from "@tanstack/svelte-query";
import type { LayoutLoad } from "./$types";
import { resolveRoute } from "$app/paths";
import { AuthManager, setStoredUser } from "@/auth/auth-manager.svelte";
import { isFetchError } from "@/fetch-error";

export const ssr = false;

export const load: LayoutLoad = async ({ fetch, route }) => {
	const authManager = new AuthManager();
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error) => {
				if (isFetchError(error)) {
					if (error.status === 401) {
						setStoredUser(null);
						window.location.assign("/login");
					}
				}
			},
		}),
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

	const client = createApiClient(fetch);
	const data = await queryClient.ensureQueryData(serverQueries.serverInfo(client));
	if (route.id !== "/(public)/server-activation") {
		if (!data.active) throw redirect(303, resolveRoute("/(public)/server-activation", {}));
	}

	return { queryClient, client, authManager };
};
