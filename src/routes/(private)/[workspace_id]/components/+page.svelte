<script lang="ts">
	import DataTable from "@/components/ui/data-table/data-table.svelte";
	import { createApiClient } from "@/data/api-client";
	import { componentQueries } from "@/data/components";
	import { createQuery } from "@tanstack/svelte-query";
	import { stackComponentColumns } from "./columns";
	import { type RowSelectionState } from "@tanstack/table-core";
	import { page } from "$app/stores";
	import { Skeleton } from "@/components/ui/skeleton";

	const apiClient = createApiClient();
	const components = createQuery(componentQueries.list(apiClient, $page.params.workspace_id));

	let rowSelectionState = $state<RowSelectionState>({});
</script>

{#if $components.status === "pending"}
	<Skeleton class="h-[200px] w-full" />
{/if}

{#if $components.status === "success"}
	<div class="space-y-4">
		<div>
			<h1 class="text-2xl font-bold">Components</h1>
			<p class="text-sm text-muted-foreground">
				Components are the building blocks of your stacks.
			</p>
		</div>
		<DataTable
			getRowId={(r) => r.id}
			columns={stackComponentColumns}
			bind:rowSelection={rowSelectionState}
			data={$components.data.items}
		/>
	</div>
{/if}
