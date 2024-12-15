import type { CreateWorkspace, Workspace } from "@/types/workspaces";
import { apiPaths } from "../../api";
import { createApiClient } from "../../api-client";
import { createMutation, useQueryClient, type CreateMutationOptions } from "@tanstack/svelte-query";
import { toast } from "svelte-sonner";
import { goto } from "$app/navigation";
import { resolveRoute } from "$app/paths";

async function createWorkspace(payload: CreateWorkspace, apiClient = createApiClient()) {
	const workspace: Workspace = await apiClient<Workspace>(apiPaths.workspaces.base, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	return workspace;
}

export function useCreateWorkspace(
	options?: CreateMutationOptions<Workspace, unknown, CreateWorkspace>
) {
	const queryClient = useQueryClient();

	const { onSuccess, ...rest } = options || {};
	return createMutation({
		...rest,
		mutationFn: createWorkspace,
		onSuccess: (data, vars, ctx) => {
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
			toast.success(`Workspace ${data.name} created`);
			goto(resolveRoute("/(private)/[workspace_id]", { workspace_id: data.id }));
			onSuccess?.(data, vars, ctx);
		},
	});
}
