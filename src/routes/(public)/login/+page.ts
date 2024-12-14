import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { resolveRoute } from "$app/paths";

export const load: PageLoad = async ({ parent }) => {
	const { authManager } = await parent();
	if (authManager.isAuthenticated) throw redirect(303, resolveRoute("/(private)", {}));
};
