<script lang="ts">
	import Icon from '@iconify/svelte';
	/*
	check whether it's logged in or not, also, if logged in
	then check it's a recruiter or an employee.
	and show nav elements acordingly.
	*/

	// rather than fetching this in navbar, we can fetch them in parent component
	let accountInfo: { loggedIn: Boolean; accountType: 'recruiter' | 'employee' } = $props();

	const width = '30';
	const height = '30';
	const style = 'color: #000';
</script>

<div class="navigation-bar-container">
	<nav class="navigation-bar-nav">
		<ul class="left">
			<li><a href="/"><img src="logo-wg.png" alt="" /></a></li>
		</ul>
		<ul class="right">
			{#if !accountInfo.loggedIn}
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/contact">Contact us</a></li>
			{:else if accountInfo.loggedIn && accountInfo.accountType == 'employee'}
				<li><a href="/jobs"><Icon icon="mdi-light:job" /></a></li>
				<li><a href="/mybidding">Biddings</a></li>
				<li><a href="/profile">Profile</a></li>
				<li><a href="/messages">Messages</a></li>
			{:else if accountInfo.loggedIn && accountInfo.accountType == 'recruiter'}
				<li><a href="/find-employees" title="find employees"><Icon icon="ion:people" {width} {height} {style} /></a></li>
				<li>
					<a href="/jobs" title="my jobs"
						><Icon icon="material-symbols:work" {width} {height} {style} /></a
					>
				</li>
				<li><a href="/profile" title="profile"><Icon icon="ix:user-profile-filled" {width} {height} {style} /></a></li>
				<li><a href="/messages" title="messages"><Icon icon="mynaui:message-solid" {width} {height} {style}/></a></li>
			{/if}
		</ul>
	</nav>
</div>

<style>
	.navigation-bar-container {
		background-color: teal;

	}
	nav {
		display: grid;
		padding: 0px 10px;
		grid-template-columns: 1fr 1fr 2fr;
		align-items: center;
	}

	.left img {
		height: 70px;
	}

	.right {
		color: red;
		grid-column: 3;
		gap: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		padding: 5px;
		justify-self: end;

	}
	.right li {
		border-radius: 5px;
		padding:5px;
	}
	.right li:hover {
		background-color: white;	
	}

	.right li:active {
		background-color: gray;	
	}

</style>
