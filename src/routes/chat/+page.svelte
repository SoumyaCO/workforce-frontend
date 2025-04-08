<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';

	const socket = io('http://localhost:3000/');

	let messages = [];
	let newMessage = '';

	const sendMessage = () => {
		if (newMessage.trim()) {
			const message = {
				text: newMessage,
				isSent: true,
				timestamp: new Date().toLocaleTimeString()
			};
			socket.emit('chatMessage', message);
			messages = [...messages, message];
			newMessage = '';
		}
	};

	onMount(() => {
		socket.on('chatMessage', (message) => {
			messages = [...messages, { ...message, isSent: false }];
		});

		return () => {
			socket.disconnect();
		};
	});
</script>

<div class="main-container">
	<div class="chat-container">
		<div class="chat-header">
			<h2>Chat</h2>
		</div>
		<div class="chat-messages">
			{#each messages as message}
				<div class="message {message.isSent ? 'sent' : 'received'}">
					<!--class attribute is dynamically set based on the message.isSent sent or received -->
					<div class="message-text">{message.text}</div>
					<div class="message-timestamp">{message.timestamp}</div>
				</div>
			{/each}
		</div>
		<div class="chat-input">
			<input
				type="text"
				bind:value={newMessage}
				placeholder="Message..."
				on:keydown={(e) => e.key === 'Enter' && sendMessage()}
			/>
			<button on:click={sendMessage}>Send</button>
		</div>
	</div>
</div>

<style>
	.main-container {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.chat-container {
		width: 450px;
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 80vh;
	}

	.chat-header {
		background-color: #6d6f72;
		color: white;
		padding: 16px;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.chat-messages {
		flex: 1;
		padding: 16px;
		overflow-y: auto;
		background-color: #363535;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.chat-input {
		display: flex;
		padding: 12px;
		background-color: #201e1e;
		border-top: 1px solid #e9ecef;
	}

	input {
		flex: 1;
		padding: 10px 12px;
		border: 1px solid #635f5f;
		border-radius: 8px;
		margin-right: 10px;
		font-size: 14px;
		outline: none;
		transition: border-color 0.3s ease;
	}

	input:focus {
		border-color: #222a22;
	}

	button {
		padding: 10px 20px;
		background-color: #787c81;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0056b3;
	}

	.message {
		max-width: 70%;
		padding: 12px;
		border-radius: 12px;
		background-color: #e9ecef;
		color: #333;
		position: relative;
		animation: fadeIn 0.3s ease;
	}

	.message.sent {
		background-color: #007bff;
		color: white;
		align-self: flex-end;
	}

	.message.received {
		background-color: #ffffff;
		border: 1px solid #0d0e10;
		align-self: flex-start;
	}

	.message-timestamp {
		font-size: 12px;
		color: #666;
		margin-top: 4px;
		text-align: right;
	}

	.message.sent .message-timestamp {
		color: rgba(255, 255, 255, 0.8);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
