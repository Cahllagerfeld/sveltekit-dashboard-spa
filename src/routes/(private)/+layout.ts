import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { resolveRoute } from "$app/paths";

export const load: LayoutLoad = async ({ parent }) => {
	const { authManager } = await parent();
	if (!authManager.isAuthenticated) throw redirect(303, resolveRoute("/(public)/login", {}));
};
