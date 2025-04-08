"use server"

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" }
    }

    // In a real application, you would use a service like Nodemailer, SendGrid, etc.
    // For this example, we'll simulate sending an email

    // Log the email data (for demonstration purposes)
    console.log("Email data:", { name, email, subject, message, recipient: "nethumsemithaperera@gmail.com" })

    // In production, you would send the actual email here
    // Example with EmailJS or similar service would go here

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}
