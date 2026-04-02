'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Leaf,
  Plus,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  Instagram,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Users,
  Store,
  ShieldCheck,
  Mail, AlertTriangle, Check,
  X,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  Edit,
  Map as MapIcon,
  Trash
} from 'lucide-react';
import Header from '@/components/Header';

// --- Tipos ---
interface Location {
  id: string;
  location_type: string;
  address: string;
  locality: string;
  province?: string;
  lat: number;
  lng: number;
  is_primary: boolean;
}

interface Merchant {
  id: string;
  name: string;
  type: string;
  status: string;
  verified: boolean;
  claimed: boolean;
  contact_status: 'sin_contacto' | 'contactado' | 'en_proceso' | 'verificado';
  admin_notes: string | null;
  instagram_url: string;
  website_url: string;
  validation_count: number;
  created_at: string;
  locations?: Location[];
  // Derived fields
  province?: string;
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  external_id: string;
  created_at: string;
  metadata?: { frequency?: string };
}

interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'comercios' | 'mensajes' | 'pendientes' | 'usuarios' | 'pagos'>('comercios');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  
  // Edit Merchant State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [merchantMembers, setMerchantMembers] = useState<any[]>([]);
  const [newMemberId, setNewMemberId] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  
  // Filtros Avanzados
  const [filterProvince, setFilterProvince] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [provinces, setProvinces] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  // Stats Reales
  const [stats, setStats] = useState({
    totalMerchants: 0,
    totalLocations: 0,
    pendingApprovals: 0,
    totalUsers: 0
  });
  
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const initAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace('/login'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        router.replace('/');
        return;
      }

      fetchData();
    };
    initAdmin();
  }, []);

  const fetchDonations = async () => {
    setDonationsLoading(true);
    const { data } = await supabase
      .from('user_donations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    setDonations(data || []);
    setDonationsLoading(false);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Calcular actividad sugerida por el usuario
    const processedUsers = (data || []).map(u => {
      const v = u.validations?.[0]?.count || 0;
      const f = u.favorites?.[0]?.count || 0;
      const s = u.user_saved_merchants?.[0]?.count || 0;
      const m = u.merchants?.[0]?.count || 0;
      
      return {
        ...u,
        v_count: v,
        f_count: f,
        s_count: s,
        m_count: m,
        activity: (v * 10) + (f * 5) + (s * 2) + (m * 50)
      };
    });
    
    setUsers(processedUsers);
    setUsersLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: mData } = await supabase
        .from('merchants')
        .select(`
          *, 
          locations(*), 
          merchant_validations(
            id, 
            user_id, 
            profiles(full_name)
          )
        `)
        .order('created_at', { ascending: false });
      
      const processedMerchants = (mData || []).map(m => ({
        ...m,
        province: m.locations?.[0]?.province || 'Sin Provincia',
        validationsCount: (m.merchant_validations || []).length,
        v_users: (m.merchant_validations || []).map((v: any) => v.profiles?.full_name || 'Anónimo')
      }));
      
      setMerchants(processedMerchants);

      // Extraer provincias y tipos únicos para los filtros
      const uniqueProvinces = Array.from(new Set(processedMerchants.map(m => m.province).filter(Boolean))) as string[];
      const uniqueTypes = Array.from(new Set(processedMerchants.map(m => m.type).filter(Boolean))) as string[];
      setProvinces(uniqueProvinces.sort());
      setTypes(uniqueTypes.sort());

      const { data: msgData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages(msgData || []);

      const { count: mCount, error: mErr } = await supabase.from('merchants').select('id', { count: 'exact', head: false }).eq('status', 'active');
      const { count: lCount, error: lErr } = await supabase.from('locations').select('id', { count: 'exact', head: false });
      const { count: pCount, error: pErr } = await supabase.from('merchants').select('id', { count: 'exact', head: false }).eq('status', 'pending');
      const { count: uCount, error: uErr } = await supabase.from('profiles').select('id', { count: 'exact', head: false });

      if (mErr || lErr || pErr || uErr) {
        console.error("Count Errors:", { mErr, lErr, pErr, uErr });
        setError(`Error al contar datos: ${mErr?.message || lErr?.message || pErr?.message || uErr?.message}`);
      }

      setStats({
        totalMerchants: mCount || 0,
        totalLocations: lCount || 0,
        pendingApprovals: pCount || 0, // Comercios status='pending'
        totalUsers: uCount || 0
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error desconocido al cargar datos");
    }
    setLoading(false);
  };

  const handleImport = async () => {
    if (!importText) return;
    setIsImporting(true);
    
    // 1. Separar filas y encabezados (Asumimos Tabulación como separador de Excel)
    const rows = importText.split('\n').filter(r => r.trim());
    if (rows.length < 2) {
      alert('Se necesitan encabezados y al menos una fila.');
      setIsImporting(false);
      return;
    }

    const headers = rows[0].split('\t').map(h => h.trim().toLowerCase());
    const dataRows = rows.slice(1);
    let successCount = 0;

    for (const rowText of dataRows) {
      const values = rowText.split('\t');
      const row: any = {};
      headers.forEach((h, i) => row[h] = values[i]?.trim());

      // Mapeo Inteligente (Basado en tus columnas)
      const name = row['nombre del emprendimiento'] || row['nombre'];
      if (!name) continue;

      try {
        // A. Insert Merchant
        const { data: merchant, error: mError } = await supabase.from('merchants').insert({
          name: name,
          instagram_url: row['instagram'],
          website_url: row['sitio web'] || row['linktr'],
          whatsapp: row['telefono'],
          bio_long: row['notas extra'],
          status: 'active'
        }).select().single();

        if (mError) throw mError;

        // B. Insert Location (Si hay datos de zona/localidad)
        if (merchant && (row['país'] || row['localidad/barrio'])) {
           await supabase.from('locations').insert({
             merchant_id: merchant.id,
             locality: row['localidad/barrio'],
             district: row['región/zona'],
             province: row['provincia'],
             location_type: 'fixed',
             lat: -34.6037, // Default BA por ahora, se puede mejorar con geocoding
             lng: -58.3816
           });
        }
        successCount++;
      } catch (e) {
        console.error('Error importando fila:', e);
      }
    }

    alert(`¡Éxito! Se cargaron ${successCount} nuevos emprendimientos a la red.`);
    setIsImporting(false);
    setShowImportModal(false);
    setImportText('');
    fetchData();
  };

  const updateMerchantStatus = async (merchantId: string, status: 'active' | 'rejected') => {
    try {
      const { error: patchError } = await supabase
        .from('merchants')
        .update({ status })
        .eq('id', merchantId);

      if (patchError) throw patchError;

      // Actualizar estado local
      setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, status } : m));
      alert(`Comercio ${status === 'active' ? 'aprobado' : 'rechazado'} con éxito.`);
      fetchData(); // Recargar stats
    } catch (e: any) {
      alert(`Error al cambiar estado: ${e.message}`);
    }
  };

  const updateContactStatus = async (merchantId: string, contactStatus: string) => {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ contact_status: contactStatus })
        .eq('id', merchantId);

      if (error) throw error;
      
      setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, contact_status: contactStatus } as any : m));
    } catch (e: any) {
      alert(`Error al actualizar contacto: ${e.message}`);
    }
  };

  const toggleVerified = async (merchantId: string, currentVerified: boolean) => {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ verified: !currentVerified })
        .eq('id', merchantId);

      if (error) throw error;
      
      setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, verified: !currentVerified } as any : m));
    } catch (e: any) {
      alert(`Error al verificar: ${e.message}`);
    }
  };

  const openEditModal = async (merchant: Merchant) => {
    setEditingMerchant(merchant);
    setShowEditModal(true);
    
    // Fetch members
    const { data } = await supabase
      .from('merchant_members')
      .select(`
        id,
        user_id,
        role,
        profile:profiles(full_name, role)
      `)
      .eq('merchant_id', merchant.id);
    setMerchantMembers(data || []);
  };

  const handleUpdateMerchant = async () => {
    if (!editingMerchant) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          name: editingMerchant.name,
          type: editingMerchant.type,
          instagram_url: editingMerchant.instagram_url,
          website_url: editingMerchant.website_url,
          admin_notes: editingMerchant.admin_notes,
          status: editingMerchant.status,
          verified: editingMerchant.verified
        })
        .eq('id', editingMerchant.id);

      if (error) throw error;
      
      alert('Comercio actualizado correctamente.');
      setShowEditModal(false);
      fetchData();
    } catch (e: any) {
      alert(`Error al actualizar: ${e.message}`);
    }
    setIsSaving(false);
  };

  const handleAddMember = async () => {
    if (!editingMerchant || !newMemberId) return;
    setIsAddingMember(true);
    try {
      const { error } = await supabase
        .from('merchant_members')
        .insert({
          merchant_id: editingMerchant.id,
          user_id: newMemberId,
          role: 'member'
        });

      if (error) throw error;
      
      // Refresh members
      const { data } = await supabase
        .from('merchant_members')
        .select(`
          id,
          user_id,
          role,
          profile:profiles(full_name, role)
        `)
        .eq('merchant_id', editingMerchant.id);
      setMerchantMembers(data || []);
      setNewMemberId('');
      alert('Miembro agregado con éxito.');
    } catch (e: any) {
      alert(`Error al agregar miembro: ${e.message}`);
    }
    setIsAddingMember(false);
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('¿Seguro que querés eliminar a este miembro?')) return;
    try {
      const { error } = await supabase
        .from('merchant_members')
        .delete()
        .eq('id', memberId);
      if (error) throw error;
      setMerchantMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (e: any) {
      alert(`Error al eliminar: ${e.message}`);
    }
  };

  const filteredMerchants = merchants.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (m.type && m.type.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProvince = filterProvince === 'all' || m.province === filterProvince;
    const matchesType = filterType === 'all' || m.type === filterType;
    const matchesVerification = filterVerification === 'all' || 
                               (filterVerification === 'verified' && m.verified) ||
                               (filterVerification === 'unverified' && !m.verified);
    
    return matchesSearch && matchesProvince && matchesType && matchesVerification;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px' }}>
      <Header />
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} /> Central de Operaciones
            </div>
            <h1 style={{ fontSize: '2.85rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em', margin: 0 }}>Alimnet Control Center</h1>
            <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '0.4rem', fontWeight: '550' }}>Gestionando la red soberana v3.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button style={{ padding: '0.9rem 1.8rem', background: 'white', border: '1px solid #E4EBDD', borderRadius: '16px', fontWeight: '900', color: '#2D3A20', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <BarChart3 size={18} /> Reporte
             </button>
             <button onClick={() => setShowImportModal(true)} style={{ padding: '0.9rem 1.8rem', background: '#5F7D4A', border: 'none', borderRadius: '16px', fontWeight: '900', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(95, 125, 74, 0.2)' }}>
               <Plus size={18} strokeWidth={3} /> Importar Excel
             </button>
          </div>
        </div>

        {/* KPIs REALES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
           <KPICard label="Comercios" value={stats.totalMerchants} trend="Activos" icon={<Store size={22} />} color="#5F7D4A" />
           <KPICard label="Puntos de Red" value={stats.totalLocations} trend="En Mapa" icon={<MapPin size={22} />} color="#2D3A20" />
           <KPICard label="Por Aprobar" value={stats.pendingApprovals} trend="Nuevos" icon={<Clock size={22} />} color="#B2AC88" />
           <KPICard label="Usuarios" value={stats.totalUsers} trend="Activos" icon={<Users size={22} />} color="#5F7D4A" />
        </div>

        {/* CONTENEDOR TABS */}
        <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.04)', border: '1px solid #E4EBDD' }}>
           
           <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #F0F4ED', marginBottom: '2.5rem' }}>
              <TabItem active={activeTab === 'comercios'} label="Comercios" onClick={() => setActiveTab('comercios')} count={stats.totalMerchants} />
              <TabItem active={activeTab === 'usuarios'} label="Usuarios" onClick={() => { setActiveTab('usuarios'); fetchUsers(); }} count={stats.totalUsers} />
              <TabItem active={activeTab === 'mensajes'} label="Mensajes" onClick={() => setActiveTab('mensajes')} count={messages.filter(m => m.status === 'unread').length} />
              <TabItem active={activeTab === 'pendientes'} label="Por Aprobar" onClick={() => setActiveTab('pendientes')} count={stats.pendingApprovals} />
              <TabItem active={activeTab === 'pagos'} label="Pagos" onClick={() => { setActiveTab('pagos'); fetchDonations(); }} count={donations.length || undefined} />
           </div>

           {error && (
             <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '1.2rem', borderRadius: '18px', marginBottom: '2rem', fontWeight: '1000', border: '1.5px solid #FECACA', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: '700' }}>DETALLE TÉCNICO DEL ERROR:</div>
                  <div style={{ fontSize: '1rem' }}>{error}</div>
                </div>
             </div>
           )}

           {activeTab === 'pagos' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ borderBottom: '2px solid #F8F9F5' }}>
                    <tr>
                      <th style={THStyle}>FECHA</th>
                      <th style={THStyle}>MONTO</th>
                      <th style={THStyle}>MÉTODO</th>
                      <th style={THStyle}>TIPO</th>
                      <th style={THStyle}>ESTADO</th>
                      <th style={THStyle}>ID EXTERNO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donationsLoading ? (
                      <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Cargando pagos...</td></tr>
                    ) : donations.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '6rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <CreditCard size={48} color="#E4EBDD" />
                            <p style={{ color: '#2D3A20', fontWeight: '1000', fontSize: '1.2rem', margin: 0 }}>Sin pagos registrados aún.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      donations.map(d => (
                        <tr key={d.id} style={{ borderBottom: '1px solid #F0F4ED' }}>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', color: '#555', fontWeight: '700' }}>
                            {new Date(d.created_at).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={{ fontWeight: '1000', color: '#2D3A20', fontSize: '1rem' }}>
                              {d.currency === 'USD' ? 'USD ' : 'ARS $'}{Number(d.amount).toLocaleString('es-AR')}
                            </span>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={{ ...BadgeStyle, background: d.payment_method === 'stripe' ? '#EEF2FF' : '#FFF7ED', color: d.payment_method === 'stripe' ? '#4F46E5' : '#C2410C' }}>
                              {d.payment_method === 'stripe' ? 'Stripe' : 'Mercado Pago'}
                            </span>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={BadgeStyle}>{d.metadata?.frequency === 'monthly' ? 'Mensual' : 'Único'}</span>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '900', fontSize: '0.8rem', color: d.status === 'succeeded' ? '#5F7D4A' : '#B2AC88' }}>
                              <CheckCircle size={14} /> {d.status}
                            </div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.75rem', color: '#AAA', fontFamily: 'monospace' }}>
                            {d.external_id?.slice(0, 20)}…
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'usuarios' ? (
              <div style={{ overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ borderBottom: '2px solid #F8F9F5' }}>
                    <tr>
                      <th style={THStyle}>USUARIO</th>
                      <th style={THStyle}>ROL</th>
                      <th style={THStyle}>LOCALIDAD</th>
                      <th style={THStyle}>ACTIVIDAD</th>
                      <th style={THStyle}>REGISTRO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Cargando usuarios...</td></tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #F0F4ED' }}>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ fontWeight: '1000', color: '#2D3A20' }}>{u.full_name || 'Sin Nombre'}</div>
                            <div style={{ fontSize: '0.7rem', color: '#AAA' }}>ID: {u.id.slice(0, 8)}...</div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={{ 
                              ...BadgeStyle, 
                              background: u.role === 'admin' ? '#EEF2FF' : '#F0F4ED',
                              color: u.role === 'admin' ? '#4F46E5' : '#5F7D4A'
                            }}>
                              {u.role.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', color: '#555' }}>
                            {u.locality || 'No indicada'}, {u.province || ''}
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                               {u.m_count > 0 && <span title="Comercios Creados" style={{ ...BadgeStyle, background: '#F0FDFA', color: '#0D9488' }}>🌱 {u.m_count}</span>}
                               {u.v_count > 0 && <span title="Validaciones" style={{ ...BadgeStyle, background: '#FEFCE8', color: '#A16207' }}>✅ {u.v_count}</span>}
                               {u.f_count > 0 && <span title="Favoritos" style={{ ...BadgeStyle, background: '#FFF1F2', color: '#E11D48' }}>❤️ {u.f_count}</span>}
                               {u.s_count > 0 && <span title="Guardados" style={{ ...BadgeStyle, background: '#EFF6FF', color: '#2563EB' }}>🔖 {u.s_count}</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                               <div style={{ width: '100px', height: '6px', background: '#F0F4ED', borderRadius: '10px', overflow: 'hidden' }}>
                                  <div style={{ width: `${Math.min(u.activity, 100)}%`, height: '100%', background: '#5F7D4A' }}></div>
                               </div>
                               <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A' }}>{u.activity}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.8rem', color: '#888' }}>
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                 </table>
              </div>
            ) : activeTab === 'mensajes' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ borderBottom: '2px solid #F8F9F5' }}>
                    <tr>
                      <th style={THStyle}>FECHA</th>
                      <th style={THStyle}>REMITENTE</th>
                      <th style={THStyle}>ASUNTO</th>
                      <th style={THStyle}>MENSAJE</th>
                      <th style={THStyle}>ESTADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(messages || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '6rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <Mail size={48} color="#F0F4ED" />
                            <p style={{ color: '#2D3A20', fontWeight: '1000', fontSize: '1.2rem', margin: 0 }}>La central de mensajes está vacía.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      messages.map(msg => (
                        <tr key={msg.id} style={{ borderBottom: '1px solid #F0F4ED', background: msg.status === 'unread' ? '#FFFBEB' : 'white' }}>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', color: '#888', fontWeight: '700' }}>
                            {new Date(msg.created_at).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ fontWeight: '1000', color: '#2D3A20' }}>{msg.sender_name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#B2AC88' }}>{msg.sender_email}</div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', fontWeight: '800' }}>{msg.subject || 'Sin Asunto'}</td>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.9rem', color: '#555', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {msg.message}
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={{ ...BadgeStyle, background: msg.status === 'unread' ? '#FEF3C7' : '#F0F4ED', color: msg.status === 'unread' ? '#D97706' : '#888' }}>
                              {msg.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
           ) : (
             <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                   {/* Buscador principal */}
                   <div style={{ position: 'relative', width: '350px' }}>
                      <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} size={18} />
                      <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.9rem 1.2rem 0.9rem 3.2rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                      />
                   </div>

                   {/* Filtro: Provincia */}
                   <select 
                     value={filterProvince} 
                     onChange={(e) => setFilterProvince(e.target.value)}
                     style={FilterSelectStyle}
                   >
                     <option value="all">Todas las Provincias</option>
                     {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                   </select>

                   {/* Filtro: Tipo */}
                   <select 
                     value={filterType} 
                     onChange={(e) => setFilterType(e.target.value)}
                     style={FilterSelectStyle}
                   >
                     <option value="all">Todos los Tipos</option>
                     {types.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>

                   {/* Filtro: Verificación */}
                   <select 
                     value={filterVerification} 
                     onChange={(e) => setFilterVerification(e.target.value)}
                     style={FilterSelectStyle}
                   >
                     <option value="all">Todos los Estados</option>
                     <option value="verified">✅ Verificados</option>
                     <option value="unverified">🔸 Comunitarios</option>
                   </select>

                   {(filterProvince !== 'all' || filterType !== 'all' || filterVerification !== 'all' || searchTerm) && (
                     <button 
                       onClick={() => { setFilterProvince('all'); setFilterType('all'); setFilterVerification('all'); setSearchTerm(''); }}
                       style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                     >
                       <X size={14} /> Limpiar
                     </button>
                   )}
                </div>

                <div style={{ overflowX: 'auto' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead style={{ borderBottom: '2px solid #F8F9F5' }}>
                         <tr>
                            <th style={THStyle}>COMERCIO</th>
                            <th style={THStyle}>UBICACIÓN</th>
                            <th style={THStyle}>ESTADO</th>
                            <th style={THStyle}>OUTREACH</th>
                            <th style={THStyle}>TIPO</th>
                            <th style={{ ...THStyle, width: '40px' }}></th>
                         </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Cargando...</td></tr>
                        ) : filteredMerchants.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ padding: '8rem 4rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <Leaf size={48} color="#E4EBDD" />
                                <p style={{ color: '#2D3A20', fontWeight: '1000', fontSize: '1.4rem', margin: 0 }}>La red está lista para florecer.</p>
                                <p style={{ color: '#888', fontWeight: '550' }}>No hay comercios. Empezá cargando tu Excel.</p>
                                <button onClick={() => setShowImportModal(true)} className="button-primary" style={{ marginTop: '1rem', padding: '1rem 2rem', borderRadius: '18px' }}>Importar Ahora</button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredMerchants.map(m => (
                            <MerchantRow 
                              key={m.id} 
                              merchant={m} 
                              expanded={expandedId === m.id} 
                              toggle={() => setExpandedId(expandedId === m.id ? null : m.id)} 
                               onUpdateStatus={updateMerchantStatus}
                              onUpdateContactStatus={updateContactStatus}
                              onToggleVerified={toggleVerified}
                              onOpenEdit={openEditModal}
                            />
                          ))
                        )}
                     </tbody>
                  </table>
               </div>
             </>
           )}
        </div>
      </main>

      {/* MODAL EDICIÓN */}
      {showEditModal && editingMerchant && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(45, 58, 32, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: '40px', padding: '3rem', position: 'relative', overflowY: 'auto' }}>
             <button onClick={() => setShowEditModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#F8F9F5', border: 'none', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer' }}>
               <X size={24} color="#B2AC88" />
             </button>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                {/* COLUMNA IZQUIERDA: GENERAL INFO */}
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em', marginBottom: '2rem' }}>Editar Comercio</h2>
                  
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={LabelStyle}>Nombre</label>
                      <input 
                        style={InputStyle} 
                        value={editingMerchant.name} 
                        onChange={(e) => setEditingMerchant({...editingMerchant, name: e.target.value})} 
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={LabelStyle}>Tipo</label>
                        <select 
                          style={InputStyle} 
                          value={editingMerchant.type || ''} 
                          onChange={(e) => setEditingMerchant({...editingMerchant, type: e.target.value})}
                        >
                          <option value="productor">Productor</option>
                          <option value="almacen">Almacén</option>
                          <option value="restaurante">Restaurante</option>
                          <option value="chef">Chef / Cocina</option>
                        </select>
                      </div>
                      <div>
                        <label style={LabelStyle}>Verificado</label>
                        <select 
                          style={InputStyle} 
                          value={editingMerchant.verified ? 'true' : 'false'} 
                          onChange={(e) => setEditingMerchant({...editingMerchant, verified: e.target.value === 'true'})}
                        >
                          <option value="false">🔸 Comunitario</option>
                          <option value="true">✅ Verificado (Proyecto Cuidado)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={LabelStyle}>Instagram URL</label>
                      <input 
                        style={InputStyle} 
                        value={editingMerchant.instagram_url || ''} 
                        onChange={(e) => setEditingMerchant({...editingMerchant, instagram_url: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label style={LabelStyle}>Web / Linktr.ee</label>
                      <input 
                        style={InputStyle} 
                        value={editingMerchant.website_url || ''} 
                        onChange={(e) => setEditingMerchant({...editingMerchant, website_url: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label style={LabelStyle}>Notas de Administración (Privado)</label>
                      <textarea 
                        style={{ ...InputStyle, height: '100px' }} 
                        value={editingMerchant.admin_notes || ''} 
                        onChange={(e) => setEditingMerchant({...editingMerchant, admin_notes: e.target.value})} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button onClick={handleUpdateMerchant} disabled={isSaving} style={{ flex: 1, padding: '1rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '1000', cursor: 'pointer' }}>
                        {isSaving ? 'Guardando...' : 'Guardar Información'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA: MIEMBROS Y UBICACIONES */}
                <div>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1.5rem' }}>Gestión de Miembros (IDs)</h3>
                   
                   <div style={{ background: '#F8F9F5', padding: '1.5rem', borderRadius: '25px', border: '1px solid #F0F4ED', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                         <input 
                           placeholder="ID del Usuario (UUID)..." 
                           value={newMemberId}
                           onChange={(e) => setNewMemberId(e.target.value)}
                           style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #E4EBDD', fontSize: '0.85rem' }} 
                         />
                         <button 
                           onClick={handleAddMember}
                           disabled={isAddingMember || !newMemberId}
                           style={{ background: '#5F7D4A', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '12px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                         >
                           +
                         </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         {merchantMembers.map(m => (
                           <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>{m.profile?.full_name || 'Sin Nombre'}</div>
                                <div style={{ fontSize: '0.7rem', color: '#B2AC88' }}>{m.role === 'owner' ? 'DUEÑO' : 'MIEMBRO'}</div>
                              </div>
                              <button onClick={() => handleRemoveMember(m.id)} style={{ padding: '6px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash size={14} /></button>
                           </div>
                         ))}
                      </div>
                   </div>

                   <h3 style={{ fontSize: '1.2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1rem' }}>Ubicaciones</h3>
                   <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>Puntos actuales cargados en el mapa.</p>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {editingMerchant.locations?.map(loc => (
                        <div key={loc.id} style={{ padding: '1rem', border: '1px solid #F0F4ED', borderRadius: '15px', background: '#F8F9F5' }}>
                           <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{loc.address || 'Sin Dirección'}</div>
                           <div style={{ fontSize: '0.7rem', color: '#B2AC88' }}>LAT: {loc.lat}, LNG: {loc.lng}</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* MODAL IMPORTACIÓN */}
      {showImportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(45, 58, 32, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '800px', borderRadius: '40px', padding: '3rem', position: 'relative' }}>
             <button onClick={() => setShowImportModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#F8F9F5', border: 'none', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer' }}>
               <X size={24} color="#B2AC88" />
             </button>
             <div style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em', margin: 0 }}>Importar Excel</h2>
               <p style={{ color: '#888', marginTop: '0.5rem' }}>Pegá las filas de tu planilla acá. Mapearemos los campos automáticamente.</p>
             </div>
             <textarea 
               value={importText}
               onChange={(e) => setImportText(e.target.value)}
               placeholder="Nombre	Instagram	Zona	Bio..."
               style={{ width: '100%', height: '250px', borderRadius: '25px', border: '2px solid #F0F4ED', background: '#F8F9F5', padding: '1.5rem', outline: 'none', marginBottom: '2rem' }}
             />
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
               <button onClick={() => setShowImportModal(false)} style={{ padding: '1rem 2rem', background: 'white', border: '1.5px solid #F0F4ED', borderRadius: '18px', fontWeight: '1000' }}>Cancelar</button>
               <button onClick={handleImport} disabled={!importText || isImporting} style={{ padding: '1rem 3rem', background: '#5F7D4A', border: 'none', borderRadius: '18px', fontWeight: '1000', color: 'white', cursor: 'pointer', opacity: (!importText || isImporting) ? 0.5 : 1 }}>
                 {isImporting ? 'Procesando...' : 'Iniciar Carga'}
               </button>
             </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
        body { font-family: 'Manrope', sans-serif; }
        .button-primary { transition: all 0.2s; }
        .button-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(95, 125, 74, 0.2); }
      `}</style>
    </div>
  );
}

// --- Subcomponentes ---
function KPICard({ label, value, trend, icon, color }: any) {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#B2AC88' }}>
          {icon}
          <div style={{ fontSize: '0.75rem', fontWeight: '950', background: '#F8F9F5', padding: '4px 10px', borderRadius: '10px', color: '#5F7D4A' }}>{trend}</div>
       </div>
       <div>
         <div style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em' }}>{value}</div>
         <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#B2AC88', textTransform: 'uppercase' }}>{label}</div>
       </div>
    </div>
  );
}

function TabItem({ active, label, onClick, count }: any) {
  return (
    <div onClick={onClick} style={{ padding: '1rem 0', cursor: 'pointer', borderBottom: '3px solid', borderColor: active ? '#5F7D4A' : 'transparent', color: active ? '#2D3A20' : '#B2AC88', fontWeight: '950', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label}
      {count !== undefined && <span style={{ background: active ? '#5F7D4A' : '#F0F4ED', color: active ? 'white' : '#B2AC88', padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem' }}>{count}</span>}
    </div>
  );
}

function checkIntegrity(m: any) {
  const missing = [];
  if (!m.description) missing.push('Descripción');
  if (!m.phone) missing.push('Teléfono');
  if (!m.instagram) missing.push('Instagram');
  if (!m.website) missing.push('Web');
  if (!m.type) missing.push('Tipo');
  return missing;
}

function MerchantRow({ merchant, expanded, toggle, onUpdateStatus, onUpdateContactStatus, onToggleVerified, onOpenEdit }: any) {
  return (
    <>
      <tr onClick={(e) => {
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('select')) return;
        toggle();
      }} style={{ 
        borderBottom: '1px solid #F0F4ED', 
        cursor: 'pointer', 
        background: merchant.verified ? 'transparent' : 'rgba(255, 251, 235, 0.5)',
        transition: 'all 0.2s'
      }}>
        <td style={{ padding: '1.2rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontWeight: '1000', color: '#2D3A20', fontSize: '1.05rem' }}>{merchant.name}</div>
            
            {/* SELLO DE TIERRA (OFICIAL/VERIFICADO) */}
            {merchant.owner_id ? (
              <div title="Comercio Oficial / Verificado (Sello Alimnet)" style={{ 
                background: '#A67C00', 
                color: 'white', 
                padding: '4px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                transform: 'rotate(-3deg)'
              }}>
                <ShieldCheck size={14} strokeWidth={3} />
              </div>
            ) : (
                <span title="Cargado por la Comunidad" style={{ fontSize: '0.65rem', background: '#FEF3C7', color: '#B45309', padding: '3px 8px', borderRadius: '6px', fontWeight: '950' }}>COMUNITARIO</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
             {checkIntegrity(merchant).length > 0 ? (
               <span title={`Falta: ${checkIntegrity(merchant).join(', ')}`} style={{ fontSize: '0.6rem', color: '#EF4444', fontWeight: '900', background: '#FEE2E2', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                 <AlertTriangle size={10} /> INFO FALTANTE ({checkIntegrity(merchant).length})
               </span>
             ) : (
               <span style={{ fontSize: '0.6rem', color: '#5F7D4A', fontWeight: '900', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>✓ INFO COMPLETA</span>
             )}
             <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: '700' }}>Actualizado: {new Date(merchant.created_at).toLocaleDateString()}</span>
          </div>
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '850', color: '#2D3A20', fontSize: '0.85rem' }}>
             <MapPin size={14} color="#B2AC88" /> {merchant.province}
           </div>
           <div style={{ fontSize: '0.7rem', color: '#B2AC88', marginLeft: '20px' }}>
             {merchant.locations?.length === 1 
               ? '1 punto de red' 
               : `${merchant.locations?.length || 0} puntos de red`}
           </div>
        </td>
         <td style={{ padding: '1.2rem 1rem' }}>
           <button 
             onClick={() => onToggleVerified(merchant.id, merchant.verified)}
             style={{ 
               border: 'none', 
               background: merchant.status === 'active' ? '#5F7D4A15' : '#F0F4ED', 
               color: merchant.status === 'active' ? '#5F7D4A' : '#888',
               padding: '6px 12px',
               borderRadius: '10px',
               fontSize: '0.75rem',
               fontWeight: '1000',
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '6px'
             }}
           >
             {merchant.status === 'active' ? <CheckCircle size={14} /> : <div style={{width:14,height:14,borderRadius:'50%',border:'2px solid currentColor'}} />}
             {merchant.status === 'active' ? 'ACTIVO' : 'PENDIENTE'}
           </button>
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
           <select 
             value={merchant.contact_status || 'sin_contacto'} 
             onChange={(e) => onUpdateContactStatus(merchant.id, e.target.value)}
             style={{
               border: '1px solid #E4EBDD',
               background: merchant.contact_status === 'sin_contacto' ? '#F8F9F5' : '#5F7D4A',
               color: merchant.contact_status === 'sin_contacto' ? '#2D3A20' : 'white',
               padding: '4px 10px',
               borderRadius: '8px',
               fontSize: '0.7rem',
               fontWeight: '900',
               outline: 'none',
               cursor: 'pointer'
             }}
           >
             <option value="sin_contacto">SIN CONTACTO</option>
             <option value="contactado">CONTACTADO</option>
             <option value="en_proceso">EN PROCESO</option>
             <option value="verificado">VERIFICADO ✓</option>
           </select>
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
          <span style={BadgeStyle}>{merchant.type || 'S/D'}</span>
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
           <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenEdit(merchant); }}
                style={{ padding: '8px', background: '#F8F9F5', border: '1px solid #E4EBDD', borderRadius: '10px', color: '#5F7D4A', cursor: 'pointer' }}
              >
                <Edit size={16} />
              </button>
              {expanded ? <ChevronUp size={18} color="#B2AC88" /> : <ChevronDown size={18} color="#B2AC88" />}
           </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: '2.5rem 3rem', background: '#FBFBFA', borderBottom: '1px solid #F0F4ED' }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                <div>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Ubicaciones</h4>
                   {merchant.locations?.length === 0 ? (
                     <p style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>Sin ubicaciones registradas.</p>
                   ) : merchant.locations?.map((loc: any) => (
                     <div key={loc.id} style={{ background: 'white', padding: '1rem', borderRadius: '15px', border: '1px solid #E4EBDD', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: '1000' }}>{loc.address || loc.locality}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{loc.location_type} • LAT: {loc.lat?.toFixed(3)}, LNG: {loc.lng?.toFixed(3)}</div>
                     </div>
                   ))}
                </div>
                <div>
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '25px', border: '1px solid #E4EBDD', marginBottom: '1.5rem' }}>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '2rem', fontWeight: '1000' }}>{merchant.validationsCount || 0}</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#B2AC88' }}>Validaciones Reales</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                     <button 
                        onClick={() => onUpdateStatus(merchant.id, 'active')}
                        style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                     >
                        <CheckCircle size={18} /> APROBAR COMERCIO
                     </button>
                     <button 
                        onClick={() => onUpdateStatus(merchant.id, 'rejected')}
                        style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: 'transparent', color: '#EF4444', border: '2px solid #EF4444', fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                     >
                        <X size={18} /> RECHAZAR COMERCIO
                     </button>
                  </div>
                </div>
             </div>
          </td>
        </tr>
      )}
    </>
  );
}

const THStyle = { padding: '1.2rem 1rem', fontSize: '0.75rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' as const };
const BadgeStyle = { padding: '4px 10px', background: '#F0F4ED', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '850', color: '#5F7D4A' };
const LabelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase' as const, marginBottom: '6px', letterSpacing: '0.03em' };
const InputStyle = { width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '700', color: '#2D3A20', fontSize: '0.95rem' };
const FilterSelectStyle = { 
  padding: '0.9rem 1rem', 
  borderRadius: '18px', 
  border: '1.5px solid #F0F4ED', 
  background: 'white', 
  fontWeight: '800', 
  color: '#2D3A20', 
  fontSize: '0.85rem', 
  outline: 'none',
  cursor: 'pointer',
  minWidth: '180px'
};
