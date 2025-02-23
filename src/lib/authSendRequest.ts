import { env } from "$env/dynamic/private"
import sgMail from "@sendgrid/mail"

export async function sendVerificationRequest(email: string, url: string) {
    // Call the cloud Email provider API for sending emails
    sgMail.setApiKey(env.SEND_EMAIL)
    const msg = {
        to: email, // Change to your recipient
        from: 'mismatch25vitc@gmail.com', // Change to your verified sender
        subject: 'Verify your email address',
        text: 'Click the link below',
        html: '<a href="' + url + '">Click here to verify</a>',
    }
    const response = await sgMail.send(msg)
    if (!response) {
        console.log("Error")
    } else {
        console.log("Email sent")
    }
}
