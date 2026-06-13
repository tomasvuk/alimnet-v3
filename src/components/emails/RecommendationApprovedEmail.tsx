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

interface RecommendationApprovedEmailProps {
  userName?: string;
  merchantName: string;
  merchantId?: string;
}

export const RecommendationApprovedEmail = ({
  userName = 'Amigo/a',
  merchantName,
  merchantId,
}: RecommendationApprovedEmailProps) => {
  const exploreLink = merchantId 
    ? `https://www.alimnet.com/explorar?id=${merchantId}` 
    : 'https://www.alimnet.com/explorar';

  return (
    <Html>
      <Head />
      <Preview>¡Tu recomendación de "{merchantName}" fue aceptada! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>¡Hola {userName}!</Text>
          
          <Text style={text}>
            Te traemos excelentes noticias: hemos revisado y <strong>aprobado tu recomendación</strong> para incorporar a <strong>{merchantName}</strong> en el mapa de Alimnet.
          </Text>
          
          <Text style={text}>
            Tanto la comunidad como el comercio estamos profundamente agradecidos por tu valioso aporte. Gracias a vecinos activos como vos, seguimos tejiendo esta red de comida consciente.
          </Text>
          
          <Text style={text}>
            Ya podés ver el comercio en el mapa y compartirlo para que otros vecinos también lo conozcan.
          </Text>

          <Hr style={hr} />

          <Section style={btnContainer}>
            <Link style={button} href={exploreLink}>
              Ver {merchantName} en el Mapa
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            ¡Gracias nuevamente!<br />
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
