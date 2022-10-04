import nodemailer from 'nodemailer';
import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class MailerProvider implements IMailProvider {
  public async sendMail({ email, subject, html }: ISendMailDTO): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'mail.evacommerce.com.br',
      port: 465,
      secure: true,
      auth: {
        pass: process.env.SMPT_PASSWORD,
        user: process.env.SMPT_USER,
      },
    });

    const message = {
      from: '"Agência Eva Commerce" <noreply@evacommerce.com.br>',
      to: email,
      subject,
      html,
    };

    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  }
}
