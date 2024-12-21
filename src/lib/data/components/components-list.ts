import type { StackComponentList, StackComponentListQueries } from "@/types/components";
import { queryOptions } from "@tanstack/svelte-query";
import { apiPaths } from "../api";
import { type ApiClient, type WithApiClient } from "../api-client";
import { buildQueryString } from "@/utils";

type ComponentListRequest = WithApiClient<{
	workspaceId: string;
	options?: StackComponentListQueries;
}>;

export async function fetchComponentList({
	apiClient,
	workspaceId,
	options,
}: ComponentListRequest) {
	const data = await apiClient<StackComponentList>(
		apiPaths.workspaces.components(workspaceId) + (options ? `?${buildQueryString(options)}` : "")
	);
	return data;
}

export const componentListQuery = (
	apiClient: ApiClient,
	workspaceId: string,
	options?: StackComponentListQueries
) =>
	queryOptions({
		queryKey: ["workspaces", workspaceId, "components", options],
		queryFn: () => fetchComponentList({ apiClient, workspaceId, options }),
	});
