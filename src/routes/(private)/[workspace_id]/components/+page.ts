import { componentQueries } from "@/data/components";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
	const { queryClient, client } = await parent();

	await queryClient.ensureQueryData(componentQueries.list(client, params.workspace_id));
};
