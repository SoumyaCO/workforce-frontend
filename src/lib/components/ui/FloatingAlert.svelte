<script lang="ts">
	// have to have some global state which we can manipulate from this component
	import { BiddingAlertData } from '$lib/states/alerts.svelte';
	let { amount, comment } = $props<{
		amount: string;
		comment: string;
	}>();
</script>

<div
	class="popup-overlay"
	style={`${BiddingAlertData.showAlert ? 'display: block' : 'display: none'}`}
>
	<!-- background darkening container -->
	<div
		class="popup fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md border-1 bg-white p-10 w-100 text-center"
	>
		<p class="text-xl">Are you sure?</p>
		<p class="italic text-red-500">Amount: {amount}</p>
		<p>Comment: {comment}</p>
		<div class="mt-5 flex w-80 flex-wrap justify-around">
			<button
				class="w-20 border-1 bg-amber-100 p-1 transition-all duration-300 hover:cursor-pointer hover:scale-105 rounded-sm hover:bg-red-500 hover:text-white"
				onclick={() => {
					BiddingAlertData.response = false;
					BiddingAlertData.showAlert = false;
				}}>Cancel</button
			>
			<button
				class="w-20 border-1 border-blue-900 bg-gray-300 p-1 transition-all duration-300 hover:cursor-pointer hover:scale-105 rounded-sm hover:bg-green-600"
				onclick={() => {
					BiddingAlertData.response = true;
					BiddingAlertData.showAlert = false;
				}}>Yes</button
			>
		</div>
	</div>
</div>

<style>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8); /* Dim the background */
		display: none; /* Hidden by default */
		z-index: 1; /* Make sure it's above the content */
	}

	.popup {
		z-index: 3;
	}
</style>
