<script context="module" lang="ts">
	export async function load({ params }) {
		// params contains dynami route parameter
		return {
			props: {
				id: params.id
			}
		};
	}
</script>

<script lang="ts">
	export let data: { id: string };
</script>

<h1>This is page {data.id}</h1>
