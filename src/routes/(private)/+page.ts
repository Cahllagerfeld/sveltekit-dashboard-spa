import { workspaceQueries } from "@/data/workspaces";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { resolveRoute } from "$app/paths";
import { getWorkspaceFromLocalStorage } from "@/features/workspaces/store-workspaces";

export const load: PageLoad = async ({ parent }) => {
	const { queryClient, client } = await parent();

	const workspaces = await queryClient.ensureQueryData(workspaceQueries.list(client));

	const { items: workspaceItems } = workspaces;

	const storedWorkspaceId = getWorkspaceFromLocalStorage();
	const storedWorkspace = workspaceItems.find((w) => w.id === storedWorkspaceId);

	if (storedWorkspace) {
		throw redirect(
			302,
			resolveRoute("/(private)/[workspace_id]", { workspace_id: storedWorkspace.id })
		);
	}

	const defaultWorkspace = workspaceItems.find((w) => w.name === "default");
	if (!defaultWorkspace) {
		throw redirect(303, resolveRoute("/(public)/login", {}));
	}

	throw redirect(
		303,
		resolveRoute("/(private)/[workspace_id]", { workspace_id: defaultWorkspace.id })
	);
};
