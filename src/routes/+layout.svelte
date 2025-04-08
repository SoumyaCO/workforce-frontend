<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Navbar from './Navbar.svelte';
</script>

<Navbar />

<!-- <Navbar loggedIn={true} accountType="recruiter" /> -->
{@render children()}
