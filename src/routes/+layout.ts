import { browser } from "$app/environment";
import { createApiClient } from "@/data/api-client";
import { serverQueries } from "@/data/server";
import { redirect } from "@sveltejs/kit";
import { QueryClient } from "@tanstack/svelte-query";
import type { LayoutLoad } from "./$types";
import { resolveRoute } from "$app/paths";
import { AuthManager } from "@/auth/auth-manager.svelte";

export const ssr = false;

export const load: LayoutLoad = async ({ fetch, route }) => {
	const authManager = new AuthManager();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000,
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
