import { queryOptions } from "@tanstack/svelte-query";
import { fetchServerInfo } from "./info";
import type { ApiClient } from "../api-client";

export const serverQueries = {
	serverInfo: (apiClient: ApiClient) =>
		queryOptions({
			queryKey: ["info"],
			queryFn: async () => fetchServerInfo(apiClient),
		}),
};
