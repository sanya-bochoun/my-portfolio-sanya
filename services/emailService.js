import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
    // Gmail configuration
    gmail: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    },
    // Alternative: Ethereal (for testing)
    ethereal: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'ethereal.user@ethereal.email',
            pass: 'ethereal.pass'
        }
    }
};

// Create transporter
const createTransporter = async () => {
    try {
        // Use Gmail if configured, otherwise use Ethereal for testing
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            return nodemailer.createTransport(EMAIL_CONFIG.gmail);
        } else {
            // Create Ethereal test account for development
            const testAccount = await nodemailer.createTestAccount();
            
            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }
    } catch (error) {
        console.error('Error creating email transporter:', error);
        throw error;
    }
};

// Send email function
export const sendEmail = async (to, subject, text, html = null) => {
    try {
        const transporter = await createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Portfolio Admin" <noreply@portfolio.com>',
            to: to,
            subject: subject,
            text: text,
            html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        
        // If using Ethereal, log the preview URL
        if (!process.env.EMAIL_USER) {
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        }
        
        return {
            success: true,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        };
        
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Send reply email specifically
export const sendReplyEmail = async (contactEmail, contactName, subject, replyMessage, originalMessage) => {
    const emailSubject = `Re: ${subject}`;
    
    const emailText = `
Hello ${contactName},

Thank you for contacting us. Here is our reply to your message:

${replyMessage}

---
Your original message:
"${originalMessage}"

Best regards,
Portfolio Admin Team
    `;

    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hello ${contactName},</h2>
            
            <p>Thank you for contacting us. Here is our reply to your message:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                ${replyMessage.replace(/\n/g, '<br>')}
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <div style="color: #666; font-size: 14px;">
                <strong>Your original message:</strong><br>
                <em>"${originalMessage}"</em>
            </div>
            
            <div style="margin-top: 30px; color: #666; font-size: 12px;">
                <p>Best regards,<br>Portfolio Admin Team</p>
            </div>
        </div>
    `;

    return await sendEmail(contactEmail, emailSubject, emailText, emailHtml);
};

export default { sendEmail, sendReplyEmail };
