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
  Img,
} from '@react-email/components';
import * as React from 'react';

// This template is for Tomas Vukojicic (Admin)
export const AdminAlertEmail = ({ 
  title, 
  content, 
  metadata = {} 
}: { 
  title: string; 
  content: string; 
  metadata?: any; 
}) => {
  return (
    <Html>
      <Head />
      <Preview>⚠️ Alerta Alimnet: {title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Alerta de Sistema</Heading>
          <Text style={label}>NUEVA ACCIÓN REQUERIDA:</Text>
          <Text style={titleText}>{title}</Text>
          
          <Hr style={hr} />

          <Text style={text}>{content}</Text>

          {/* Information from metadata */}
          {(metadata.email || metadata.merchant_name) && (
            <Section style={infoBox}>
              <Text style={infoLabel}>DETALLES DEL REMITENTE:</Text>
              {metadata.email && (
                <Text style={infoValue}><strong>Email:</strong> {metadata.email}</Text>
              )}
              {metadata.merchant_name && (
                <Text style={infoValue}><strong>Comercio:</strong> {metadata.merchant_name}</Text>
              )}
              {metadata.locality && (
                <Text style={infoValue}><strong>Ubicación:</strong> {metadata.locality}</Text>
              )}
            </Section>
          )}

          <Section style={btnContainer}>
            <Link style={button} href="https://www.alimnet.com/admin">
              Ir al Panel de Admin
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Resumen Automático — Alimnet CC (Control Center) <br />
            Este es un canal de alerta para Tomas Vukojicic.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f1f5f9', // Slate 100
  fontFamily: 'Inter, -apple-system, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '20px auto',
  padding: '30px',
  borderRadius: '8px',
  maxWidth: '520px',
  border: '1px solid #e2e8f0',
};

const label = {
  color: '#22c55e', // Primary Alimnet
  fontSize: '12px',
  fontWeight: '900',
  letterSpacing: '1px',
  margin: '0',
};

const h1 = {
  color: '#0f172a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const titleText = {
  color: '#1e293b',
  fontSize: '20px',
  fontWeight: '800',
  margin: '8px 0',
};

const text = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '24px',
};

const infoBox = {
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '8px',
  margin: '20px 0',
};

const infoLabel = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#64748b',
  marginBottom: '4px',
};

const infoValue = {
  fontSize: '14px',
  color: '#334155',
  margin: '4px 0',
};

const btnContainer = { textAlign: 'center' as const, margin: '30px 0' };

const button = {
  backgroundColor: '#0f172a', // Dark Admin Theme
  borderRadius: '6px',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 24px',
  display: 'inline-block',
};

const hr = { borderColor: '#f1f5f9', margin: '20px 0' };

const footer = {
  color: '#94a3b8',
  fontSize: '12px',
  textAlign: 'center' as const,
};
