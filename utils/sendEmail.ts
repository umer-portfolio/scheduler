import nodemailer from 'nodemailer';
import moment from 'moment-timezone';

// Time zone display names
const timeZoneLabels: { [key: string]: string } = {
  'UTC': 'UTC - Coordinated Universal Time',
  'America/New_York': 'EST - Eastern Standard Time (New York)',
  'America/Chicago': 'CST - Central Standard Time (Chicago)',
  'America/Denver': 'MST - Mountain Standard Time (Denver)',
  'America/Los_Angeles': 'PST - Pacific Standard Time (Los Angeles)',
  'Europe/London': 'GMT - Greenwich Mean Time (London)',
  'Europe/Paris': 'CET - Central European Time (Paris)',
};

export const sendEmail = async (formData: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Format the date
  const formattedDate = moment(formData.date).format('MMMM D, YYYY');
  const formattedTime = formData.time.split(':')[0] >= 12 
    ? `${formData.time.split(':')[0] - 12 || 12}:00 PM`
    : `${formData.time.split(':')[0]}:00 AM`;

  // Send email to admin
  const adminMailOptions = {
    from: `"Meeting Scheduler" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Meeting Request from ${formData.name}`,
    html: `
      <h2>New Meeting Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phoneNumber || 'Not provided'}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formattedTime}</p>
      <p><strong>Time Zone:</strong> ${formData.timeZone}</p>
      <p><strong>Additional Information:</strong></p>
      <p>${formData.additionalInfo || 'None provided'}</p>
    `,
  };

  // Send confirmation email to user
  const userMailOptions = {
    from: `"Team X" <${process.env.SMTP_USER}>`,
    to: formData.email,
    subject: 'Meeting Request Received - Team X',
    html: `
      <h2>Thank you for your meeting request!</h2>
      <p>Thank you! Your meeting request with Team X has been received. Our team will respond as soon as possible.</p>
      <p>We have received the following details:</p>
      <ul>
        <li>Date: ${formattedDate}</li>
        <li>Time: ${formattedTime}</li>
        <li>Time Zone: ${formData.timeZone}</li>
      </ul>
      <p>Best regards,<br>Team X</p>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
