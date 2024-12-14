<script lang="ts">
	import "../app.css";
	import { Toaster } from "$lib/components/ui/sonner";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import type { LayoutData } from "./$types";
	import type { Snippet } from "svelte";
	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<div class="font-medium antialiased">
		<Toaster position="top-center" />
		{@render children()}
	</div>
</QueryClientProvider>
