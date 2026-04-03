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

interface WelcomeEmailProps {
  userName?: string;
  lang?: 'es' | 'en';
}

export const WelcomeEmail = ({ userName = 'Amigo/a', lang = 'es' }: WelcomeEmailProps) => {
  const isEs = lang === 'es';

  const content = {
    preview: isEs 
      ? '¡Bienvenido! Un mensaje personal de Tomás de Alimnet'
      : 'Welcome! A personal message from Tomás at Alimnet',
    greeting: isEs ? `Hola ${userName},` : `Hi ${userName},`,
    intro: isEs 
      ? 'Soy Tomás Vukojicic, fundador de Alimnet.'
      : 'I\'m Tomás Vukojicic, founder of Alimnet.',
    why: isEs
      ? 'Creamos Alimnet porque queríamos una forma simple, transparente y humana de conectar con alimentos reales y productores locales que cuidan lo que comemos.'
      : 'We started Alimnet because we wanted a simple, transparent, and human way to connect with real food and local producers who care about what we eat.',
    tipsHeading: isEs ? 'Aquí tienes 3 tips para empezar:' : 'Here are 3 tips to get started:',
    tip1: isEs 
      ? '📍 Explora el mapa para encontrar alimentos cuidados cerca de ti.' 
      : '📍 Explore the map to find conscious food near you.',
    tip2: isEs
      ? '🌱 Suma tu comercio o productor favorito si aún no está en la red.'
      : '🌱 Add your favorite shop or producer if they are not on the network yet.',
    tip3: isEs
      ? '🤝 Únete a la comunidad y elige soberanía alimentaria.'
      : '🤝 Join the community and choose food sovereignty.',
    cta: isEs ? 'Explorar el Mapa' : 'Explore the Map',
    question: isEs
      ? 'P.D.: ¿Por qué te uniste hoy? ¿Qué te trajo aquí?'
      : 'P.S.: Why did you join today? What brought you here?',
    replyInvite: isEs
      ? 'Dale a "Responder" y cuéntame. Leo y respondo cada mensaje personalmente.'
      : 'Hit "Reply" and let me know. I personally read and reply to every message.',
    cheers: isEs ? 'Saludos,' : 'Cheers,',
  };

  return (
    <Html>
      <Head />
      <Preview>{content.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>{content.greeting}</Text>
          
          <Text style={text}>
            <strong>{content.intro}</strong>
          </Text>
          
          <Text style={text}>{content.why}</Text>

          <Hr style={hr} />

          <Text style={subheading}>{content.tipsHeading}</Text>
          
          <Section style={tipBox}>
            <Text style={tipText}>{content.tip1}</Text>
            <Text style={tipText}>{content.tip2}</Text>
            <Text style={tipText}>{content.tip3}</Text>
          </Section>

          <Section style={btnContainer}>
            <Link style={button} href="https://www.alimnet.com/explorar">
              {content.cta}
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={psText}>
            <strong>{content.question}</strong>
          </Text>
          
          <Text style={text}>{content.replyInvite}</Text>

          <Text style={footer}>
            {content.cheers}<br />
            <strong>Tomás Vukojicic</strong><br />
            Alimnet
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
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

const subheading = {
  color: '#111827',
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '16px',
};

const tipBox = {
  backgroundColor: '#f8fafc',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '24px',
};

const tipText = { ...text, marginBottom: '8px', fontSize: '15px' };

const btnContainer = { textAlign: 'center' as const, margin: '32px 0' };

const button = {
  backgroundColor: '#22c55e',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '16px 32px',
  display: 'inline-block',
};

const hr = { borderColor: '#e5e7eb', margin: '30px 0' };

const psText = { ...text, color: '#111827', marginBottom: '8px' };

const footer = {
  color: '#9ca3af',
  fontSize: '15px',
  lineHeight: '24px',
  marginTop: '20px',
};
