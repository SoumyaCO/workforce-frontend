/*
    All global states related to alert should be stored here
*/

// bidding alert
export const BiddingAlertData = $state<{ showAlert: boolean; response: boolean }>({
	showAlert: false,
	response: false
});
