<script lang="ts">
	import { page } from '$app/state';
	let id = page.params.id;
	async function fetchRecruiter() {
		try {
			let res = await fetch(`http://localhost:8080/api/recruiters/${id}`, {
				method: "GET",
				mode: "no-cors"
			});
			if (res.status == 200) {
				console.log(res.json());
			}
		} catch (error) {
			console.error(error);
		}
	}
	// fetch recruiters and show it here
</script>

<h1>Hey this is profile no. {id}</h1>
<button onclick={fetchRecruiter}>Fetch</button>
