<script lang="ts">
	// states
	import { goto } from '$app/navigation';
	import { json } from '@sveltejs/kit';
	import axios from 'axios';
	let type: 'password' | 'text' = $state('password');
	let name: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let error: string = $state('Invalid username');
	let hide: 'display: none' | 'display: block' = $state('display: none');

	// functions
	async function onclick() {
		if (comaprePassword()) {
			try {
				fetch(`http://localhost:8080/signup`, {
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password
					})
				})
					.then((res) => {
						res.json();
					})
					.then((data) => console.log('Data: \n', data))
					.catch((error) => console.log('Error:\n', error));
				// if (res.status == 201) {
				// 	sessionStorage.setItem('email', email);
				// 	sessionStorage.setItem('password', password);
				// 	goto('/options');
				// } else {
				// 	console.log('response from backend\n', res.json());
				// 	alert('Must be some problem from backend');
				// 	goto('/register');
				// }
			} catch (error) {
				console.log(error);
				// should show a popup
				alert('error registering the account');
				goto('/register');
			}
		}
	}

	function onchange() {
		type = type === 'password' ? 'text' : 'password';
	}

	function comaprePassword(): boolean {
		if (password === confirmPassword) {
			return true;
		} else {
			error = 'Password is not matching !';
			hide = 'display: block';
			setTimeout(() => {
				error = '';
				hide = 'display: none';
			}, 2000);
			return false;
		}
	}
</script>

<div class="error-container" style={hide}>
	<!-- should have an icon and a message -->
	<p>Error Occurred</p>
	<br />
	<p>{error}</p>
</div>

<div class="login-container">
	<label for="username">Username</label>
	<input class="account-details" type="text" id="username" bind:value={name} />

	<label for="email">Email ID</label>
	<input class="account-details" type="email" id="email" bind:value={email} />

	<label for="password">Password</label>
	<input class="account-details" {type} bind:value={password} />

	<label for="password">Confirm Password</label>
	<input class="account-details" {type} bind:value={confirmPassword} />

	<br />
	<input type="checkbox" {onchange} /> See password
	<br />
	<button {onclick}>SignUp</button>

	<p>Have an account? <a href="login">Login</a></p>
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
