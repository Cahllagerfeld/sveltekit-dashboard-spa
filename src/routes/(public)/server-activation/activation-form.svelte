<script lang="ts">
	import { goto } from "$app/navigation";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "@/components/ui/input";
	import { createApiClient } from "@/data/api-client";
	import { useServerActivation } from "@/data/server/activate-server";
	import { useQueryClient } from "@tanstack/svelte-query";
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
	import { activationSchema } from "./schema";

	const client = createApiClient();
	const queryClient = useQueryClient();

	const mutation = useServerActivation({
		onSuccess: async () => {
			toast.success("Server activated successfully");
			queryClient.invalidateQueries({ queryKey: ["info"] });
			goto("/");
		},
		onError: async (e) => {
			toast.error("Failed to activate server");
		},
	});

	const form = superForm(defaults(zod(activationSchema)), {
		SPA: true,
		validators: zod(activationSchema),
		onUpdate({ form }) {
			if (!form.valid) return;
			$mutation.mutate({
				client,
				body: {
					admin_username: form.data.username,
					admin_password: form.data.password,
					server_name: uniqueNamesGenerator({
						dictionaries: [adjectives, colors, animals],
						separator: "-",
					}),
				},
			});
		},
	});

	const { enhance, form: formData } = form;
</script>

<form id="activation-form" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input type="password" {...props} bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="confirmPassword">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Confirm Password</Form.Label>
				<Input type="password" {...props} bind:value={$formData.confirmPassword} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>
