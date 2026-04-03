import { Resend } from 'resend';

// Lazy initialization of the Resend client
let resendClient: Resend | null = null;

const getResend = () => {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
};

/**
 * Utility to send emails via Resend.
 * Centralizing this ensures consistent "From" addresses and error handling.
 */
export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}) => {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: 'Alimnet <info@alimnet.com>',
      to,
      subject,
      react,
    });

    if (error) {
      console.error('Error report from Resend:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Critical failure in mailing service:', error);
    throw error;
  }
};
