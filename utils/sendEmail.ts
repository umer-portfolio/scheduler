import nodemailer from 'nodemailer';

export const sendEmail = async (formData: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Meeting Scheduler" <${process.env.SMTP_USER}>`,
    to: `${process.env.ADMIN_EMAIL}, ${formData.email}`,
    subject: `Meeting Scheduled - ${formData.fullName}`,
    html: `
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Date:</strong> ${formData.date}</p>
      <p><strong>Time:</strong> ${formData.time}</p>
      <p><strong>Timezone:</strong> ${formData.timezone}</p>
      <p><strong>Message:</strong> ${formData.message || 'N/A'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
