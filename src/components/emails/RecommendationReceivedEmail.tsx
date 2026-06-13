import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface RecommendationReceivedEmailProps {
  userName?: string;
  merchantName: string;
}

export const RecommendationReceivedEmail = ({
  userName = 'Amigo/a',
  merchantName,
}: RecommendationReceivedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>¡Recibimos tu recomendación de "{merchantName}"! 🌿</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>Hola {userName},</Text>
          
          <Text style={text}>
            Te escribimos para contarte que recibimos tu recomendación del comercio <strong>{merchantName}</strong>. ¡Muchísimas gracias por tu colaboración!
          </Text>
          
          <Text style={text}>
            Te agradecemos enormemente por darle valor a la comunidad. Creemos firmemente que <strong>entre todos hacemos Alimnet</strong>, y tu aporte ayuda a que más vecinos encuentren alimentos reales y de calidad.
          </Text>
          
          <Text style={text}>
            Tu sugerencia ya entró en nuestro proceso de admisión. Estaremos revisando los detalles y, en cuanto la validemos, aparecerá activa en el mapa para todo el mundo.
          </Text>

          <Hr style={hr} />

          <Section style={btnContainer}>
            <Link style={button} href="https://www.alimnet.com/explorar">
              Ver el Mapa de Alimnet
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Un abrazo,<br />
            <strong>El equipo de Alimnet</strong><br />
            info@alimnet.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles (Matching WelcomeEmail.tsx)
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '560px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '16px',
};

const btnContainer = { textAlign: 'center' as const, margin: '32px 0' };

const button = {
  backgroundColor: '#5F7D4A', // Brand green from Alimnet style
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '16px 32px',
  display: 'inline-block',
};

const hr = { borderColor: '#e5e7eb', margin: '30px 0' };

const footer = {
  color: '#9ca3af',
  fontSize: '15px',
  lineHeight: '24px',
  marginTop: '20px',
};
