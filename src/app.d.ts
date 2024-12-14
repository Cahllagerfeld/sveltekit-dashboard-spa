// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthManager } from "@/auth/auth-manager.svelte";
import type { ApiClient } from "@/data/api-client";
import type { QueryClient } from "@tanstack/svelte-query";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			client: ApiClient;
			queryClient: QueryClient;
			authManager: AuthManager;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
