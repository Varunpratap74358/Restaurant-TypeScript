import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./emailHtml";
import { sender, transport } from "./maitrap";

export const sendVErificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [email];
  try {
    const res = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      text: "Send verification email!",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verificatio",
    })

  } catch (error) {
    console.log(error);
    throw new Error("Faild to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [email];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Welcome to VarunEats",
      text: "htmlContent",
      html: htmlContent,
      templateVariables: {
        company_info_name: "VarunEats",
        name: name,
      },
      sandbox: true,
    });
    console.log(res)
  } catch (error) {
    console.log(error);
    throw new Error("Faild to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipients = [email];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      //   text: "Hello this is text",
      html: htmlContent,
      category: "Reset password",
      sandbox: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Faild to send welcome email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [email];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Password reset successfully",
      //   text: "Hello this is text",
      html: htmlContent,
      category: "Password Reset",
      sandbox: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Faild to send password reset email");
  }
};
