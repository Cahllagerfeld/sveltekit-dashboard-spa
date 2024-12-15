<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "@/components/ui/input";
	import { cn } from "@/utils";
	import { type HTMLAttributes } from "svelte/elements";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { createWorkspaceSchema } from "./schema";
	import { Button } from "@/components/ui/button";
	import { useCreateWorkspace } from "@/data/workspaces/mutations/create-workspace";
	let {
		class: className,
		isDialogOpen = $bindable(),
		...rest
	}: HTMLAttributes<HTMLFormElement> & { isDialogOpen: boolean } = $props();

	const createWorkspace = useCreateWorkspace({
		onSuccess: () => {
			isDialogOpen = false;
		},
	});

	const form = superForm(defaults(zod(createWorkspaceSchema)), {
		SPA: true,
		validators: zod(createWorkspaceSchema),
		onUpdate({ form }) {
			if (!form.valid) return;
			$createWorkspace.mutate({
				name: form.data.name,
				description: form.data.description,
			});
		},
	});

	const { enhance, form: formData } = form;
</script>

<form {...rest} class={cn("space-y-4", className)} use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Description</Form.Label>
				<Input {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Button class="w-full" type="submit">Create Workspace</Button>
</form>
