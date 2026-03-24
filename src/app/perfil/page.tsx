'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Download, 
  Share2, 
  Instagram, 
  ChevronRight, 
  CheckCircle,
  Star,
  Activity,
  History,
  TrendingUp,
  Loader2,
  Clock,
  Send,
  Leaf,
  X,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function MerchantProfilePage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [showChat, setShowChat] = useState(false);
  const [isHoveringBubble, setIsHoveringBubble] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: '¡Hola! Estamos muy contentos de que seas parte de esta comunidad. ¿En qué podemos ayudarte hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  
  // -- NUEVOS ESTADOS PARA DATOS REALES --
  const [profile, setProfile] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Detector de pantalla
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    bio_short: '',
    bio_long: '',
    type: 'Productor',
    whatsapp: '',
    email_public: '',
    instagram_url: '',
    website_url: '',
    locality: '',
    delivery_info: '',
    working_hours: '',
    order_instructions: '',
    preferred_contact_channel: 'whatsapp'
  });

  // Lógica de Límite de Chat (5 mensajes / 24hs) - Discreto
  useEffect(() => {
    fetchData();
    
    const savedData = localStorage.getItem('alimnet_chat_limit');
    if (savedData) {
      const { count, timestamp } = JSON.parse(savedData);
      const now = Date.now();
      if (now - timestamp > 24 * 60 * 60 * 1000) {
        setMsgCount(0);
        localStorage.setItem('alimnet_chat_limit', JSON.stringify({ count: 0, timestamp: now }));
      } else {
        setMsgCount(count);
      }
    } else {
      localStorage.setItem('alimnet_chat_limit', JSON.stringify({ count: 0, timestamp: Date.now() }));
    }
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      // 1. Obtener Perfil
      const { data: pData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (pData) setProfile(pData);

      // 2. Obtener Mercante
      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', user.id).single();
      if (mData) {
        setMerchant(mData);
        setFormData({
          name: mData.name || '',
          bio_short: mData.bio_short || '',
          bio_long: mData.bio_long || '',
          type: mData.type || 'Productor',
          whatsapp: mData.whatsapp || '',
          email_public: mData.email || '',
          instagram_url: mData.instagram_url || '',
          website_url: mData.website_url || '',
          locality: mData.locations?.[0]?.locality || '',
          delivery_info: mData.delivery_info || '',
          working_hours: mData.working_hours || '',
          order_instructions: mData.order_instructions || '',
          preferred_contact_channel: mData.preferred_contact_channel || 'whatsapp'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>;

  const handleUpdateProfile = async () => {
    if (!merchant) return;
    setSaving(true);
    setFeedback(null);

    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          name: formData.name,
          bio_short: formData.bio_short,
          bio_long: formData.bio_long,
          type: formData.type,
          whatsapp: formData.whatsapp,
          email: formData.email_public,
          instagram_url: formData.instagram_url,
          website_url: formData.website_url,
          delivery_info: formData.delivery_info,
          working_hours: formData.working_hours,
          order_instructions: formData.order_instructions,
          preferred_contact_channel: formData.preferred_contact_channel,
          updated_at: new Date().toISOString()
        })
        .eq('id', merchant.id);

      if (error) throw error;
      
      setMerchant({ ...merchant, ...formData });
      setFeedback({ type: 'success', text: '¡Perfil actualizado correctamente! ✨' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Error al actualizar: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (msgCount >= 5) {
      setChatHistory(prev => [...prev, { 
        role: 'bot', 
        text: 'Has alcanzado el límite de mensajes. Para una atención inmediata, por favor escribinos a info@alimnet.com. ¡Gracias por ser parte!' 
      }]);
      setMessage('');
      return;
    }

    const newCount = msgCount + 1;
    setMsgCount(newCount);
    localStorage.setItem('alimnet_chat_limit', JSON.stringify({ count: newCount, timestamp: Date.now() }));

    const userMsg = message;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        '¡Gracias por tu mensaje! En breve un humano de nuestro equipo te responderá.',
        'Recibimos tu consulta. Recordá que también podés escribirnos a info@alimnet.com para más ayuda.',
        'Estamos procesando tu duda. Alimnet crece gracias a proyectos como el tuyo.',
        '¡Entendido! Ya notificamos a soporte. También podés contactarnos en info@alimnet.com.'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatHistory(prev => [...prev, { role: 'bot', text: randomResponse }]);
    }, 1500);
  };

  // Categorías
  const CATEGORIES_OPTIONS = [
    'Agroecológico', 'Orgánico', 'Biodinámico', 'De Pastura', 'Libre de Gluten', 'Libre de Azúcar', 'Vegano', 'Vegetariano', 'Otro'
  ];
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // To store the selected category

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value); // Update selected category state
    if (value === 'Otro') {
      setShowOtherCategory(true);
    } else {
      setShowOtherCategory(false);
      setOtherCategory(''); // Clear other category if 'Otro' is deselected
      // Simulación de agregar tag (logic for actual data persistence would go here)
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Tu Panel Alimnet</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Resumen del impacto de tu comercio en la red.</p>
              </div>
              <div style={{ padding: '0.8rem 1.5rem', background: '#FEF3C7', color: '#92400E', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '800' }}>
                <Clock size={16} /> Pendiente de Validación
              </div>
            </div>

            {/* ESTADÍSTICAS MENSUALES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { label: 'Validaciones', value: merchant?.validation_count || '0', icon: ShieldCheck, sub: 'Totales en red' },
                { label: 'Vistas Perfil', value: '12', icon: User, sub: 'Estimado mensual' },
                { label: 'Interés IG', value: '8', icon: Instagram, sub: 'Clicks a redes' },
                { label: 'Interés Wzp', value: '5', icon: MessageSquare, sub: 'Inicio de chats' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div style={{ background: '#F0F4ED', color: 'var(--primary)', padding: '8px', borderRadius: '12px' }}>
                      <stat.icon size={20} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--primary-dark)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Próximo Correo de Estadísticas</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Cada mes te enviaremos un reporte detallado a tu correo de contacto con el resumen de tu impacto y consejos para mejorar tu visibilidad.
                  </p>
                  <div style={{ padding: '1rem', background: '#F8F9F5', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Faltan 14 días para tu próximo reporte.</span>
                  </div>
                </div>

                <div style={{ background: 'var(--primary-dark)', borderRadius: '40px', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                   <Leaf size={150} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.1, transform: 'rotate(-20deg)' }} />
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '950', marginBottom: '1rem', position: 'relative' }}>Kit de Prensa Alimnet</h3>
                   <p style={{ opacity: 0.8, marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.6', position: 'relative' }}>
                    Descargá logos oficiales y materiales digitales para tus redes.
                  </p>
                   <button style={{ padding: '1rem 2rem', background: 'white', color: 'var(--primary-dark)', border: 'none', borderRadius: '16px', fontWeight: '1000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                     <Download size={18} /> Descargar materiales
                   </button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Previsualización</h3>
                <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                  <div style={{ height: '120px', background: '#F0F4ED' }}></div>
                  <div style={{ padding: '1.5rem', marginTop: '-40px' }}>
                     <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '20px', border: '4px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <Leaf size={40} color="var(--primary)" />
                     </div>
                     <h4 style={{ fontSize: '1.3rem', fontWeight: '950', marginTop: '1rem', color: 'var(--primary-dark)' }}>{merchant?.name || 'Tu Comercio'}</h4>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '800', marginTop: '5px' }}>
                        <Star size={14} fill="var(--primary)" /> {merchant?.validation_count || 0} Validaciones
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Editar Perfil Público</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Esta información es la que verán los consumidores en Alimnet.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* SECCIÓN 1: IDENTIDAD */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div> Identidad del Comercio
                </h3>
                <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.5rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Nombre del comercio</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nombre oficial" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Descripción corta (1 línea)</label>
                    <input 
                      type="text" 
                      value={formData.bio_short}
                      onChange={(e) => setFormData({...formData, bio_short: e.target.value})}
                      placeholder="Ej: Huerta orgánica en las sierras" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Tipo de comercio</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}
                    >
                        <option>Productor</option>
                        <option>Almacen / Tienda</option>
                        <option>Restaurante / Cafetería</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Descripción Completa / Historia</label>
                    <textarea 
                      value={formData.bio_long}
                      onChange={(e) => setFormData({...formData, bio_long: e.target.value})}
                      rows={4}
                      placeholder="Contanos tu historia..." 
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', resize: 'none' }} 
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: MEDIOS */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div> Logo y Galería
                 </h3>
                 <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ width: '120px', height: '120px', background: '#F8F9F5', borderRadius: '24px', border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                       <Leaf size={24} color="var(--text-secondary)" />
                       <span style={{ fontSize: '0.65rem', fontWeight: '800', marginTop: '8px' }}>Subir Logo</span>
                    </div>
                    <div style={{ flex: 1, height: '120px', background: '#F8F9F5', borderRadius: '24px', border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                       <Share2 size={24} color="var(--text-secondary)" />
                       <span style={{ fontSize: '0.65rem', fontWeight: '800', marginTop: '8px' }}>Subir hasta 3 fotos de galería</span>
                    </div>
                 </div>
              </div>

              {/* SECCIÓN 3: UBICACIÓN Y HORARIOS */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div> Presencia Local
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Ubicación Principal (Localidad)</label>
                    <input 
                      type="text" 
                      value={formData.locality}
                      onChange={(e) => setFormData({...formData, locality: e.target.value})}
                      placeholder="Ej: Pilar, Buenos Aires" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Zonas de reparto / Envío</label>
                    <textarea 
                      value={formData.delivery_info}
                      onChange={(e) => setFormData({...formData, delivery_info: e.target.value})}
                      placeholder="Ej: Repartos los Jueves en Zona Norte y Capital..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', minHeight: '80px' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Días y Horarios</label>
                    <textarea 
                      value={formData.working_hours}
                      onChange={(e) => setFormData({...formData, working_hours: e.target.value})}
                      placeholder="Ej: Lun a Vie 9:00 a 18:00..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', minHeight: '80px' }} 
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 4: CONTACTO Y REDES */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div> Conexiones Digitales
                </h3>
                <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>WhatsApp de Ventas</label>
                    <input 
                      type="text" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      placeholder="+54..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Email Público</label>
                    <input 
                      type="email" 
                      value={formData.email_public}
                      onChange={(e) => setFormData({...formData, email_public: e.target.value})}
                      placeholder="hola@..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Instagram (Usuario o URL)</label>
                    <input 
                      type="text" 
                      value={formData.instagram_url}
                      onChange={(e) => setFormData({...formData, instagram_url: e.target.value})}
                      placeholder="@..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Web / Linktree</label>
                    <input 
                      type="text" 
                      value={formData.website_url}
                      onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                      placeholder="https://..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Instrucciones para la comunidad (Cómo pedir, qué saber)</label>
                    <textarea 
                      value={formData.order_instructions}
                      onChange={(e) => setFormData({...formData, order_instructions: e.target.value})}
                      placeholder="Ej: Pedir con 48hs de anticipación por WhatsApp..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', minHeight: '100px' }} 
                    />
                  </div>
                </div>
              </div>

              {feedback && (
                <div style={{ 
                  padding: '1.2rem', borderRadius: '20px', 
                  background: feedback.type === 'success' ? '#F0F4ED' : '#FEF2F2',
                  color: feedback.type === 'success' ? 'var(--primary-dark)' : '#B91C1C',
                  fontWeight: '800', textAlign: 'center', boxShadow: 'var(--shadow-sm)'
                }}>
                  {feedback.text}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <button 
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  style={{ 
                    padding: '1.2rem 3rem', background: saving ? '#888' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '20px', 
                    fontWeight: '950', fontSize: '1.1rem', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 10px 20px rgba(95, 125, 74, 0.2)',
                    display: 'flex', alignItems: 'center', gap: '10px'
                  }}
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : null}
                    {saving ? 'Guardando...' : 'Actualizar Perfil Público'}
                 </button>
              </div>

            </div>
          </div>
        );

      case 'config':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Configuración de Cuenta</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Gestioná tu acceso privado y datos de contacto con Alimnet.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* ACCESO PRIVADO */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                 <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Credenciales de Acceso</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Correo para iniciar sesión</label>
                      <input type="email" defaultValue="comercio@ejemplo.com" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#F8F9F5' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Contraseña actual</label>
                      <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>Nueva contraseña</label>
                      <input type="password" placeholder="Mínimo 8 caracteres" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} />
                    </div>
                    <button style={{ alignSelf: 'flex-start', padding: '0.8rem 1.5rem', background: 'var(--primary-dark)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Guardar Cambios</button>
                 </div>
              </div>

              {/* CONTACTO INTERNO */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border)' }}>
                 <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Contacto con Alimnet</h3>
                 <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Dato privado para que el equipo de Alimnet se comunique con vos (no se muestra al público).</p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', marginBottom: '0.6rem' }}>WhatsApp / Teléfono privado</label>
                      <input type="text" placeholder="+54..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }} />
                    </div>
                    <button style={{ alignSelf: 'flex-start', padding: '0.8rem 1.5rem', background: 'var(--primary-dark)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Actualizar contacto</button>
                 </div>
              </div>

               {/* ZONA PELIGROSA */}
               <div style={{ padding: '2.5rem', borderRadius: '32px', border: '2px solid #FEE2E2', background: '#FEF2F2' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: '#991B1B', marginBottom: '1rem' }}>Zona de Peligro</h3>
                  <p style={{ fontSize: '0.85rem', color: '#B91C1C', marginBottom: '1.5rem' }}>Eliminar tu cuenta es permanente y borrará toda tu información de Alimnet.</p>
                  <button style={{ padding: '0.8rem 1.5rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>Eliminar mi comercio definitivamente</button>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', paddingTop: '56px' }}>
      
      <Header />

      {/* SUB-MENU HORIZONTAL (SOLO MÓVIL) */}
      {isMobileView && (
        <div style={{ 
          background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.8rem 1rem', 
          overflowX: 'auto', whiteSpace: 'nowrap', gap: '10px', display: 'flex',
          scrollbarWidth: 'none', msOverflowStyle: 'none'
        }}>
          {[
            { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
            { id: 'perfil', label: 'Editar Perfil', icon: User },
            { id: 'config', label: 'Configuración', icon: Settings }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
                borderRadius: '14px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : '#F0F4ED',
                color: activeTab === item.id ? 'white' : '#5F7D4A', fontWeight: '900', fontSize: '0.8rem',
                transition: 'all 0.2s', flexShrink: 0
              }}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        
        {/* SIDEBAR (SOLO ESCRITORIO) */}
        {!isMobileView && (
          <div style={{ width: '280px', background: 'white', borderRight: '1px solid var(--border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100vh - 56px)', position: 'sticky', top: '56px' }}>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
                { id: 'perfil', label: 'Editar Perfil', icon: User },
                { id: 'config', label: 'Configuración', icon: Settings }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
                    borderRadius: '16px', border: 'none', background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                    color: activeTab === item.id ? 'white' : 'var(--text-secondary)', fontWeight: '800', 
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                  }}
                >
                  <item.icon size={20} /> {item.label}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', background: '#F0F4ED', padding: '1.5rem', borderRadius: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Chat de Soporte</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '1rem' }}>
                Atención personalizada para tu crecimiento.
              </p>
              <button 
                onClick={() => setShowChat(true)}
                style={{ width: '100%', padding: '0.8rem', background: 'white', border: 'none', borderRadius: '12px', color: 'var(--primary)', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              >
                <MessageSquare size={16} /> Abrir Soporte
              </button>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: 1, padding: '3rem', maxWidth: '1200px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>

      {/* CHAT FLOATING BUBBLE & TOOLTIP */}
      {!showChat && (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 1000 }}>
          {isHoveringBubble && (
            <div style={{ 
              background: 'white', padding: '1rem 1.5rem', borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '15px', maxWidth: '280px',
              border: '1px solid var(--border)', animation: 'fadeInDown 0.3s ease-out'
            }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '750', color: 'var(--primary-dark)', lineHeight: '1.4' }}>
                {msgCount >= 5 ? 'Has alcanzado el límite de mensajes. Escribinos a info@alimnet.com' : '¿Necesitas ayuda? Nuestro equipo está listo para apoyarte.'}
              </p>
            </div>
          )}
          <button 
            onMouseEnter={() => setIsHoveringBubble(true)}
            onMouseLeave={() => setIsHoveringBubble(false)}
            onClick={() => setShowChat(true)}
            style={{ 
              width: '65px', height: '65px', background: msgCount >= 5 ? '#A0A0A0' : 'var(--primary)', color: 'white', 
              borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            className="hover-scale"
          >
            <MessageSquare size={30} fill="white" />
          </button>
        </div>
      )}

      {/* CHAT WINDOW */}
      {showChat && (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', width: '380px', background: 'white', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid var(--border)', overflow: 'hidden', zIndex: 1000, display: 'flex', flexDirection: 'column', animation: 'scaleUp 0.3s ease-out' }}>
          <div style={{ background: 'var(--primary-dark)', padding: '1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px' }}>
                <Leaf size={20} fill="white" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '950' }}>Soporte Alimnet</h4>
                <p style={{ fontSize: '0.65rem', opacity: 0.8 }}>Ayuda para comerciantes</p>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          <div style={{ height: '350px', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{ 
                maxWidth: '85%', padding: '0.8rem 1rem', borderRadius: '16px', fontSize: '0.85rem', lineHeight: '1.4',
                alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end',
                background: msg.role === 'bot' ? '#F0F4ED' : 'var(--primary)',
                color: msg.role === 'bot' ? 'var(--primary-dark)' : 'white'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', animation: 'pulse 1.5s infinite' }}>Escribiendo respuesta...</div>}
            <div id="chat-end"></div>
          </div>

          <form onSubmit={sendMessage} style={{ padding: '1.5rem', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
            <input 
              type="text" value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={msgCount >= 5 ? "Has alcanzado el límite" : "Escribí tu duda aquí..."} 
              disabled={msgCount >= 5}
              style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.85rem' }}
            />
            <button type="submit" disabled={msgCount >= 5} style={{ width: '45px', height: '45px', borderRadius: '12px', background: msgCount >= 5 ? '#ccc' : 'var(--primary)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hover-scale:hover {
          transform: scale(1.1);
        }
      `}</style>

    </div>
  );
}
