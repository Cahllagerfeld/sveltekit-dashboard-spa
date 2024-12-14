<script lang="ts">
	import {
		Card,
		CardHeader,
		CardContent,
		CardDescription,
		CardFooter,
		CardTitle,
	} from "@/components/ui/card";
	import LoginForm from "./login-form.svelte";
	import { Button } from "@/components/ui/button";
</script>

<Card class="md:w-[500px]">
	<CardHeader>
		<CardTitle class="text-2xl">Login</CardTitle>
		<CardDescription>Use your credentials to log in.</CardDescription>
	</CardHeader>
	<CardContent>
		<LoginForm />
	</CardContent><CardFooter class="flex">
		<Button type="submit" class="w-full" form="login-form">Login</Button>
	</CardFooter>
</Card>
