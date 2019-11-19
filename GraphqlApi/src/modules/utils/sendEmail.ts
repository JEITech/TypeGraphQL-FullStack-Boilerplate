import nodemailer from 'nodemailer';

export async function sendEmail (email: string, url: string) {
    let account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    const mailOptions = {
        from: 'Boobs McGee',
        to: email,
        subject: 'Boobs',
        text: 'Boobs',
        html: `<a href="${url}">${url}</a>`

    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}