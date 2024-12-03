// Looking to send emails in production? Check out our Email API/SMTP product!

import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_API_TOKEN!;


  // console.log(TOKEN)

export const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3281821,
    accountId: 2122459,
  })
);


export const sender = `"Varun MERN TEST EMAIL" <varunpratap74358@gmail.com>`;
