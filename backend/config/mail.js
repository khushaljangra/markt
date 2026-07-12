import nodemailer from 'nodemailer';

let transporter = null;

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || '"Digital Marketplace" <noreply@digitalmarketplace.com>';

if (smtpHost && smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  console.log('SMTP Mail Server Configured');
} else {
  console.log('SMTP credentials missing in .env. Mail will be logged to system console.');
}

/**
 * Send purchase confirmation email
 * @param {string} toEmail - Recipient email
 * @param {string} userName - Name of user
 * @param {Object} order - Order details
 * @param {Array} downloadLinks - Array of { title, downloadUrl } objects
 */
export const sendPurchaseEmail = async (toEmail, userName, order, downloadLinks) => {
  const itemsListHtml = order.items
    .map((item) => `<li><strong>${item.titleAtPurchase}</strong> - INR ${item.priceAtPurchase}</li>`)
    .join('');

  const linksHtml = downloadLinks
    .map(
      (link) =>
        `<div style="margin: 15px 0; padding: 12px; background: #f0f4f9; border-radius: 6px;">
          <h4 style="margin: 0 0 5px 0; color: #1e293b;">${link.title}</h4>
          <a href="${link.downloadUrl}" style="background: #2563eb; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px; font-weight: bold;">Download Project</a>
          <p style="margin: 5px 0 0 0; font-size: 11px; color: #64748b;">Link expires in 15 minutes. Download from your dashboard anytime.</p>
        </div>`
    )
    .join('');

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Purchase Confirmation</h2>
      <p>Hello ${userName},</p>
      <p>Thank you for shopping at Digital Project Marketplace! Your payment was successful, and your projects are ready for download.</p>
      
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${order.razorpayOrderId}</p>
      <p><strong>Total Amount Paid:</strong> INR ${order.totalAmount}</p>
      <ul>
        ${itemsListHtml}
      </ul>

      <h3>Download Links</h3>
      <p>Click the buttons below to download your files:</p>
      ${linksHtml}

      <p style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 13px; color: #94a3b8;">
        Need help? Reply to this email or visit our Support Chat.
      </p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: toEmail,
        subject: `Your Purchase Confirmation - Order ${order.razorpayOrderId}`,
        html: htmlContent,
      });
      console.log(`Purchase confirmation email successfully sent to ${toEmail}`);
    } catch (error) {
      console.error('Error sending purchase email:', error.message);
    }
  } else {
    // Log to console for local testing
    console.log('\n--- EMAIL SENT (MOCK) ---');
    console.log(`To: ${toEmail}`);
    console.log(`Subject: Your Purchase Confirmation - Order ${order.razorpayOrderId}`);
    console.log(`Total Paid: INR ${order.totalAmount}`);
    console.log('Download Links generated:');
    downloadLinks.forEach((link) => {
      console.log(` - ${link.title}: ${link.downloadUrl}`);
    });
    console.log('-------------------------\n');
  }
};
