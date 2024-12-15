<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { MediaQuery } from "runed";
	import CreateWorkspaceForm from "./create-workspace-form.svelte";

	type Props = {
		open: boolean;
	};

	let { open = $bindable() }: Props = $props();
	const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

{#if isDesktop.matches}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Create Workspace</Dialog.Title>
				<Dialog.Description>
					Create a new workspace to start collaborating with your team.
				</Dialog.Description>
			</Dialog.Header>
			<CreateWorkspaceForm bind:isDialogOpen={open} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Create Workspace</Drawer.Title>
				<Drawer.Description>
					Create a new workspace to start collaborating with your team.
				</Drawer.Description>
			</Drawer.Header>
			<CreateWorkspaceForm bind:isDialogOpen={open} class="px-4" />
			<Drawer.Footer class="pt-2">
				<Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
