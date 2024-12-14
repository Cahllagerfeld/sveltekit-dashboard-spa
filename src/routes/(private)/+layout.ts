import { redirect } from "@sveltejs/kit";
import { resolveRoute } from "$app/paths";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
	const { authManager } = await parent();
	if (!authManager.isAuthenticated) throw redirect(303, resolveRoute("/(public)/login", {}));
};
