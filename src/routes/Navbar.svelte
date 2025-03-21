<script lang="ts">
	import Icon from '@iconify/svelte';

	// By default, the user is not logged in
	let accountInfo: { loggedIn: Boolean; accountType: 'recruiter' | 'employee' } = {
		loggedIn: true,
		accountType: 'recruiter'
	};

	const width = '24';
	const height = '24';
	const iconStyle = 'color: #333';

	let searchPlaceholder = 'Search...';

	// toggle hamburger menu
	let isHamburgerMenuOpen = false;
	const toggleHamburgerMenu = () => {
		isHamburgerMenuOpen = !isHamburgerMenuOpen;
	};
</script>

<nav class="navbar">
	<div class="navbar-brand">
		<a href="/"><img src="logo-wg.png" alt="Logo" class="logo" /></a>
	</div>

	<!-- Hamburger Menu -->
	<button class="hamburger" on:click={toggleHamburgerMenu} aria-label="Toggle Menu">
		<Icon icon="ci:hamburger" {width} {height} style={iconStyle} />
	</button>

	<ul class="nav-links {isHamburgerMenuOpen ? 'open' : ''}">
		{#if accountInfo.loggedIn}
			{#if accountInfo.accountType == 'employee'}
				<li>
					<a href="/jobs" title="Jobs">
						<Icon icon="ri-briefcase-4-fill" {width} {height} style={iconStyle} />
						<span>Jobs</span>
					</a>
				</li>
				<li>
					<a href="/mybidding">
						<Icon icon="mdi:handshake" {width} {height} style={iconStyle} />
						<span>Biddings</span>
					</a>
				</li>
				<li>
					<a href="/profile">
						<Icon icon="ix:user-profile-filled" {width} {height} style={iconStyle} />
						<span>Profile</span>
					</a>
				</li>
				<li>
					<a href="/messages">
						<Icon icon="mynaui:message-solid" {width} {height} style={iconStyle} />
						<span>Messages</span>
					</a>
				</li>
			{:else if accountInfo.accountType == 'recruiter'}
				<li>
					<a href="/freelancers" title="Find Employees">
						<Icon icon="ion:people" {width} {height} style={iconStyle} />
						<span>Freelancers</span>
					</a>
				</li>
				<li>
					<a href="/jobs" title="My Jobs">
						<Icon icon="material-symbols:work" {width} {height} style={iconStyle} />
						<span>Jobs</span>
					</a>
				</li>
				<li>
					<a href="/recruiters/2" title="Profile">
						<Icon icon="ix:user-profile-filled" {width} {height} style={iconStyle} />
						<span>Profile</span>
					</a>
				</li>
				<li>
					<a href="/messages" title="Messages">
						<Icon icon="mynaui:message-solid" {width} {height} style={iconStyle} />
						<span>Messages</span>
					</a>
				</li>
			{/if}
		{:else}
			<!--show  the Login option for non login users -->
			<li>
				<a href="/login">
					<Icon icon="ix:user-profile-filled" {width} {height} style={iconStyle} />
					<span>Login</span>
				</a>
			</li>
		{/if}
	</ul>

	<!-- Search Bar -->
	<div class="nav-right">
		<input type="text" placeholder={searchPlaceholder} class="search-bar" />
		<button class="search-button">
			<Icon icon="material-symbols:search" {width} {height} style="color: #fff" />
		</button>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: #f7f7f7;
		position: relative;
	}

	.navbar-brand {
		display: flex;
		align-items: center;
		font-weight: bold;
		font-size: 1.2rem;
		gap: 10px;
	}

	.navbar-brand a {
		text-decoration: none;
		color: inherit;
	}

	.logo {
		height: 40px;
	}

	.nav-links {
		list-style: none;
		display: flex;
		margin: 0;
		padding: 0;
		gap: 110px;
	}

	.nav-links a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.nav-links a:hover {
		color: #007bff;
	}

	.nav-links a span {
		font-size: 1rem;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.search-bar {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 25px;
		font-size: 1rem;
		outline: none;
		background-color: #000;
		color: #fff;
		border: none;
	}

	.search-bar::placeholder {
		color: #ccc;
	}

	.search-bar:focus {
		border-color: #007bff;
	}

	.search-button {
		background-color: #000;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-button:hover {
		background-color: #333;
	}

	/* Mobile Styles */
	.hamburger {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.hamburger {
			display: block;
		}

		.nav-links {
			display: none;
			flex-direction: column;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			background-color: #f7f7f7;
			gap: 0;
			z-index: 1000;
		}

		.nav-links.open {
			display: flex;
		}

		.nav-links li {
			padding: 1rem;
			border-bottom: 1px solid #ccc;
		}

		.nav-links a {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.navbar {
			padding: 1rem;
		}

		.logo {
			height: 30px;
		}

		.nav-links li {
			padding: 0.75rem;
		}
	}
</style>
