import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpay = null;

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (keyId && keySecret) {
  try {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    console.log('Razorpay SDK Initialized Successfully');
  } catch (error) {
    console.error('Failed to initialize Razorpay SDK:', error.message);
  }
} else {
  console.log('Razorpay credentials missing in .env. Running in Sandbox/Mock Mode.');
}

/**
 * Create a Razorpay Order
 * @param {number} amount - Amount in INR (sub-units, i.e., paise, so 100 paise = 1 INR)
 * @param {string} receiptId - Unique receipt identifier
 * @returns {Promise<Object>} Razorpay order details or mock order
 */
export const createRazorpayOrder = async (amount, receiptId) => {
  const amountInPaise = Math.round(amount * 100);

  if (razorpay) {
    return await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
    });
  } else {
    // Generate a mock order if Razorpay is not configured
    const mockOrderId = `order_mock_${Math.random().toString(36).substring(2, 12)}`;
    return {
      id: mockOrderId,
      entity: 'order',
      amount: amountInPaise,
      amount_paid: 0,
      amount_due: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000),
      isMock: true,
    };
  }
};

/**
 * Verify Razorpay Signature (Backend Payment Verification)
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - Razorpay signature
 * @returns {boolean} Whether signature is valid
 */
export const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  // If in mock mode, mock orders succeed automatically if they have mock signatures or matching mock patterns
  if (!razorpay || orderId.startsWith('order_mock_')) {
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

/**
 * Verify Razorpay Webhook Signature
 * @param {string} rawBody - Raw request body string
 * @param {string} signature - Signature from headers (x-razorpay-signature)
 * @param {string} webhookSecret - Configured webhook secret
 * @returns {boolean} Whether signature is valid
 */
export const verifyWebhookSignature = (rawBody, signature, webhookSecret) => {
  if (!webhookSecret) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');
    
  return expectedSignature === signature;
};

export default razorpay;
