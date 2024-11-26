import axios from 'axios';

// Note: In a real application, these would be environment variables
const CONSUMER_KEY = 'your_consumer_key';
const CONSUMER_SECRET = 'your_consumer_secret';
const PASSKEY = 'your_passkey';
const BUSINESS_SHORT_CODE = '174379';
const CALLBACK_URL = 'https://your-callback-url.com/mpesa-callback';

export async function initiateSTKPush(phoneNumber: string, amount: number) {
  try {
    // Get access token
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    const accessToken = tokenResponse.data.access_token;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString('base64');

    // Initiate STK Push
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: CALLBACK_URL,
        AccountReference: 'MKU Hostels',
        TransactionDesc: 'Hostel Booking Payment'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('M-Pesa API Error:', error);
    throw new Error('Failed to initiate payment');
  }
}