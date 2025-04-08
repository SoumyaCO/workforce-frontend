<script lang="ts">
	// import { BACKEND_API_URL } from '$env/static/private';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	// states
	let type: 'password' | 'text' = $state('password');
	let email: string = $state('');
	let password: string = $state('');
	let error: string = $state('Invalid username');
	let hide: 'display: none' | 'display: block' = $state('display: none');

	// functions
	async function onclick() {
		// POST request to backend, '/login' route
		try {
			let res = await axios.post(
				`http://localhost:8080/login`,
				{
					email: email,
					password: password
				},
				{ withCredentials: true }
			);
			if (res.status == 200) {
				console.log('data: \n', res.data);
				sessionStorage.setItem('email', email);
				sessionStorage.setItem('password', password);
				goto('/jobs');
			} else {
				console.log('status-code: ', res.status);
				console.log('data\n', res.data);
			}
		} catch (error) {
			// should be a popup indicating error
			console.log(error);
			alert('Error occurred while loggin in');
			goto('/login');
		}
	}

	function onchange() {
		type = type === 'password' ? 'text' : 'password';
	}
</script>

<div class="error-container" style={hide}>
	<!-- should have an icon and a message -->
	<p>Error Occurred</p>
	<br />
	<p>{error}</p>
</div>

<div class="login-container">
	<label for="email">Email</label>
	<input class="account-details" type="email" id="mail" bind:value={email} />

	<label for="password">Password</label>
	<input class="account-details" {type} bind:value={password} />

	<br />
	<input type="checkbox" {onchange} /> See password
	<br />
	<button {onclick}>Login</button>

	<p>Don't have an account yet? <a href="register">Register</a></p>
</div>

<style>
	.account-details {
		display: block;
		border-radius: 5px;
	}

	label {
		display: block;
		font-family: monospace;
		font-size: 1rem;
		margin: 5px 0px 0px 5px;
	}

	.login-container > p {
		color: gray;
		margin-top: 10px;
		text-align: center;
	}
	a {
		color: blue;
		text-decoration: underline;
	}
	.login-container > button {
		/* position */
		position: relative;
		left: 50%;
		transform: translate(-50%, 0);
		margin: 5px;

		/* shape */
		width: 50%;
		border-radius: 5px;
		padding: 3px 8px;

		/* colors */
		border: 2px solid black;
		background-color: lime;
	}

	.login-container > button:active {
		background-color: green;
	}

	.login-container {
		/* positions */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		/* shape */
		padding: 15px 20px;
		border-radius: 10px;

		/* colors */
		background-image: linear-gradient(to bottom, limegreen, lightblue);
		border: 2px solid white;
		box-shadow: gray 0px 0px 20px 1px;
	}

	.error-container {
		/* positions */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;

		/* shape */
		padding: 15px 20px;
		border-radius: 10px;
		color: black;

		/* color */
		background-color: lime;
		border: 2px solid black;

		/* shadow */
		box-shadow: gray 0px 0px 20px 5px;
	}
</style>
