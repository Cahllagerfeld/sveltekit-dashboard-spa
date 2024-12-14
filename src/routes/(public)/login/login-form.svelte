<script lang="ts">
	import { goto } from "$app/navigation";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "@/components/ui/input";
	import { createApiClient } from "@/data/api-client";
	import { useLoginUser } from "@/data/session/login";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { loginSchema } from "./schema";
	import { page } from "$app/stores";

	const { authManager } = $page.data;

	const client = createApiClient();
	const loginMutation = useLoginUser({
		onSuccess: (_, { body: { username } }) => {
			authManager.login(username);
			goto("/");
		},
	});

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		onUpdate({ form }) {
			if (!form.valid) return;
			$loginMutation.mutate({
				apiClient: client,
				body: {
					username: form.data.username,
					password: form.data.password,
				},
			});
		},
	});

	const { enhance, form: formData } = form;
</script>

<form id="login-form" use:enhance>
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
</form>
