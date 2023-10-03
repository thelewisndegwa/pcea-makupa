document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('paymentForm');
    const paymentResponse = document.getElementById('paymentResponse');

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from the form
        const phone = document.querySelector('input[name="phone"]').value;
        const amount = document.querySelector('input[name="amount"]').value;
        const district = document.querySelector('select[name="district"]').value; // Add this line

        // Call the function to initiate the STK Push payment
        initiateSTKPushPayment(phone, amount, district); // Pass the district as an argument
    });

    function initiateSTKPushPayment(phone, amount, district) {
        const apiKey = 'AGTmbtGZjzPFGyAWKNjHwxT98Gj4x1MQ'; // Replace with your Daraja API Key
        const shortCode = '503466'; // Replace with your M-Pesa Paybill or Till Number
        const passkey = 'YOUR_PASSKEY'; // Replace with your Daraja API Passkey
        const callbackUrl = 'https://thelewisndegwa.github.io/pcea-makupa'; // Replace with your callback URL

        const endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; // Sandbox URL

        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

        const requestData = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone,
            PartyB: shortCode,
            PhoneNumber: phone,
            CallBackURL: callbackUrl,
            AccountReference: 'Payment',
            TransactionDesc: 'Payment for Services',
            // Add District to the request data
            District: district,
        };

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response here
            paymentResponse.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error(error);
            paymentResponse.innerHTML = 'Error: ' + error.message;
        });
    }
});
