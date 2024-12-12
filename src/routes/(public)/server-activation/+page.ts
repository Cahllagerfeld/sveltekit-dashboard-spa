import { serverQueries } from "@/data/server";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ parent }) => {
	const { queryClient, client } = await parent();

	const data = await queryClient.ensureQueryData(serverQueries.serverInfo(client));
	if (data.active === true) throw redirect(302, "/");
};
