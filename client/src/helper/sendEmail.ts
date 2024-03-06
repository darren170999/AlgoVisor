import nodemailer from 'nodemailer';

export const sendEmail = async (email: string) => {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Assuming you're using Gmail as your email provider
            auth: {
                user: 'algovisorav@gmail.com', // Your Gmail email address
                pass: 'Zxcvbnm,./', // Your Gmail app password or account password
            },
        });

        // Email options
        const mailOptions = {
            from: 'algovisorav@gmail.com', // Sender email address
            to: email, // Recipient email address
            subject: 'Email Verification', // Email subject
            text: 'Please verify your email address.', // Plain text body
            html: '<p>Please verify your email address.</p>', // HTML body (optional)
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Verification email sent successfully.");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
