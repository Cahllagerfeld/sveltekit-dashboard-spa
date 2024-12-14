import { workspaceQueries } from "@/data/workspaces";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
	const { queryClient, client } = await parent();

	await queryClient.ensureQueryData(workspaceQueries.list(client));
};
