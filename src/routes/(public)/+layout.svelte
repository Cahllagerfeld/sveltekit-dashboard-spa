<script lang="ts">
	let { children } = $props();
</script>

<div class="relative flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
	<svg class="absolute inset-0 z-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
				<path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="0.5" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>
	<main class="z-10">
		{@render children()}
	</main>
</div>
