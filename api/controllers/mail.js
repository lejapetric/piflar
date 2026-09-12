import nodemailer from "nodemailer";

// create transporter with Ethereal account
const testAccountPromise = nodemailer.createTestAccount();

const sendMail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "Missing email data" });
    }

    const testAccount = await testAccountPromise;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates for testing
      }
    });

    const info = await transporter.sendMail({
      from: `"Oblacek Test" <${testAccount.user}>`,
      to,
      subject,
      text: message
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: "Mail sent (Ethereal test)",
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({ message: "Mail failed" });
  }
};

export default { sendMail };