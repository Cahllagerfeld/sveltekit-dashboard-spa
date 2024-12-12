<script>
	import { Button } from "@/components/ui/button";
	import {
		Card,
		CardHeader,
		CardContent,
		CardDescription,
		CardFooter,
		CardTitle,
	} from "@/components/ui/card";
	import ActivationForm from "./activation-form.svelte";
</script>

<Card class="md:w-[500px]">
	<CardHeader>
		<CardTitle>Activate Server</CardTitle>
		<CardDescription>Activate your new ZenML Server</CardDescription>
	</CardHeader>
	<CardContent>
		<ActivationForm />
	</CardContent>
	<CardFooter class="flex justify-end">
		<Button type="submit" form="activation-form">Activate</Button>
	</CardFooter>
</Card>
