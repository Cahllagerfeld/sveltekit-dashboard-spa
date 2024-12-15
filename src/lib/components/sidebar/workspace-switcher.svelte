<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolveRoute } from "$app/paths";
	import { page } from "$app/stores";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import { createApiClient } from "@/data/api-client";
	import { serverQueries } from "@/data/server";
	import { workspaceQueries } from "@/data/workspaces";
	import { getGradientAvatarUrl } from "@/features/avatars/gradient-avatar";
	import { setWorkspaceToLocalStorage } from "@/features/workspaces/store-workspaces";
	import { createQuery } from "@tanstack/svelte-query";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Plus from "lucide-svelte/icons/plus";
	import { Avatar, AvatarImage } from "../ui/avatar";
	import { useSidebar } from "../ui/sidebar";
	import Skeleton from "../ui/skeleton/skeleton.svelte";
	import CreateWorkspaceDialog from "@/features/workspaces/create/create-workspace-dialog.svelte";

	const sidebar = useSidebar();

	const apiClient = createApiClient();

	const workspaces = createQuery(workspaceQueries.list(apiClient));
	const serverInfo = createQuery(serverQueries.serverInfo(apiClient));

	let isCreateDialogOpen = false;

	$: activeWorkspace = $workspaces.data?.items.find(
		(w) => w.id === $page.params.workspace_id
	)?.name;
</script>

{#if $workspaces.status === "pending"}
	<Skeleton class="h-[50px]" />
{/if}

{#if $workspaces.status === "error"}
	<div class="p-4 text-red-500">Failed to fetch workspaces</div>
{/if}

{#if $workspaces.status === "success" && $serverInfo.status === "success"}
	<CreateWorkspaceDialog bind:open={isCreateDialogOpen} />
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar class="size-8 shrink-0 rounded-md">
								<AvatarImage
									src={getGradientAvatarUrl(activeWorkspace || "", {
										size: 32,
									})}
								/>
							</Avatar>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">
									{activeWorkspace}
								</span>
								<span class="truncate text-xs">{$serverInfo.data.name}</span>
							</div>
							<ChevronsUpDown class="ml-auto" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
					align="start"
					side={sidebar.isMobile ? "bottom" : "right"}
					sideOffset={4}
				>
					<DropdownMenu.Label class="text-xs text-muted-foreground">Workspaces</DropdownMenu.Label>
					{#each $workspaces.data.items as workspace}
						<DropdownMenu.Item
							onSelect={() => {
								setWorkspaceToLocalStorage(workspace.id);
								goto(resolveRoute("/(private)/[workspace_id]", { workspace_id: workspace.id }));
							}}
							class="gap-2 p-2"
						>
							<Avatar class="size-6 shrink-0 rounded-md">
								<AvatarImage src={getGradientAvatarUrl(workspace.name, { size: 24 })} />
							</Avatar>
							<span class="truncate">{workspace.name}</span>
						</DropdownMenu.Item>
					{/each}
					<DropdownMenu.Separator />
					<DropdownMenu.Item onSelect={() => (isCreateDialogOpen = true)} class="gap-2 p-2">
						<div class="flex size-6 items-center justify-center rounded-md border bg-background">
							<Plus class="size-4" />
						</div>
						<div class="font-medium text-muted-foreground">Create workspace</div>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/if}
