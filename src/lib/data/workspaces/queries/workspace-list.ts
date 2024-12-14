import { apiPaths } from "../../api";
import { type WorkspaceList } from "$lib/types/workspaces";
import { type ApiClient, type WithApiClient } from "../../api-client";
import { queryOptions } from "@tanstack/svelte-query";

type WorkspaceListRequest = WithApiClient<{}>;

export async function fetchWorkspaceList({ apiClient }: WorkspaceListRequest) {
	const data = await apiClient<WorkspaceList>(apiPaths.workspaces.base);
	return data;
}

export const workspaceListQuery = (apiClient: ApiClient) =>
	queryOptions({
		queryKey: ["workspaces"],
		queryFn: () => fetchWorkspaceList({ apiClient }),
	});
