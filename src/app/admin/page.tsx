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
  Mail, 
  AlertTriangle, 
  Check,
  X,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  Edit,
  Map as MapIcon,
  Trash,
  Heart,
  Bookmark,
  Star,
  Download
} from 'lucide-react';
import Header from '@/components/Header';
import AlimnetLoader from '@/components/AlimnetLoader';
import AdminTabs from './components/AdminTabs';
import IntelligenceTab from './components/IntelligenceTab';
import DataTable from './components/DataTable';
import MessagesTab from './components/MessagesTab';
import ExportModal from './components/ExportModal';
import ImportModal from './components/ImportModal';

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
  owner_id?: string | null;
  province?: string;
  validationsCount?: number;
  bio_short?: string | null;
  delivery_info?: string | null;
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
  created_at: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  type: 'CHATBOT' | 'CONTACT_FORM';
}

// --- Iconos Consistentes con el Mapa ---
const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
  </svg>
);

import { UtensilsCrossed, ChefHat } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'comercios' | 'mensajes' | 'pendientes' | 'usuarios' | 'pagos' | 'analytics'>('comercios');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  
  // Analytics State
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [topSearches, setTopSearches] = useState<[string, number][]>([]);
  const [topMerchants, setTopMerchants] = useState<{ id: string, name: string, clicks: number }[]>([]);
  
  // Edit Merchant State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
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
    totalUsers: 0,
    totalOwners: 0,
    totalConsumers: 0,
    activityToday: 0,
    usersToday: 0,
    usersThisWeek: 0,
    usersThisMonth: 0,
    usersThisQuarter: 0,
    usersThisYear: 0,
    merchantsVerified: 0,
    merchantsUnverified: 0,
    merchantsValidated: 0,
    merchantsNonValidated: 0,
    merchantsProducers: 0,
    merchantsAbastecedores: 0,
    merchantsRestaurantes: 0,
    merchantsChefs: 0
  });
  
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [topCities, setTopCities] = useState<{ locality: string, count: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, [analyticsTimeRange]);

  useEffect(() => {
    const initAdmin = async () => {
      // --- [SIMULATION MODE] ---
      const isSimulated = typeof window !== 'undefined' && localStorage.getItem('social_simulation_mode') === 'true';
      if (isSimulated) {
        fetchData();
        return;
      }

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
  }, [router]);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
      if (error) throw error;
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (e: any) {
      alert(`Error al actualizar rol: ${e.message}`);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('¿Seguro que querés eliminar este usuario? Esto no borra su cuenta de Auth, solo su perfil.')) return;
    setUsersLoading(true);
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (e: any) {
      alert(`Error al eliminar: ${e.message}`);
    }
    setUsersLoading(false);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      // Simplificamos la query para evitar que falle por relaciones inexistentes en la tabla profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Mapeamos los usuarios con counts reales
      const processedUsers = await Promise.all((data || []).map(async (u) => {
        const { count: mCount } = await supabase.from('merchants').select('id', { count: 'exact', head: true }).eq('created_by', u.id);
        const { count: vCount } = await supabase.from('validations').select('id', { count: 'exact', head: true }).eq('user_id', u.id);
        const { count: fCount } = await supabase.from('favorites').select('id', { count: 'exact', head: true }).eq('profile_id', u.id);
        
        return {
          ...u,
          v_count: vCount || 0,
          f_count: fCount || 0,
          m_count: mCount || 0,
          activity: Math.min(100, (mCount || 0) * 20 + (vCount || 0) * 10 + 10)
        };
      }));
      
      setUsers(processedUsers);
      
      // Calculate Top Cities
      const cityMap: Record<string, number> = {};
      processedUsers.forEach(u => {
        const city = u.locality || 'Sin definir';
        cityMap[city] = (cityMap[city] || 0) + 1;
      });
      const cityList = Object.entries(cityMap)
        .map(([locality, count]) => ({ locality, count }))
        .sort((a, b) => b.count - a.count);
      setTopCities(cityList);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
    setUsersLoading(false);
  };

  const fetchDonations = async () => {
    setDonationsLoading(true);
    try {
      const { data } = await supabase
        .from('user_donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setDonations(data || []);
    } catch (e) {
      console.error("Error fetching donations:", e);
    }
    setDonationsLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. MERCHANTS
      const { data: mData, error: mError } = await supabase
        .from('merchants')
        .select('*, locations(*)')
        .order('created_at', { ascending: false });
      
      if (mError) { console.error("Error fetching merchants:", mError); throw mError; }
      
      const processedMerchants = (mData || []).map(m => ({
        ...m,
        province: m.locations?.[0]?.province || 'Sin Provincia',
        validationsCount: m.validation_count || 0
      }));
      
      setMerchants(processedMerchants);

      // 2. PROVINCES / TYPES
      const uniqueProvinces = Array.from(new Set(processedMerchants.map(m => m.province).filter(Boolean))) as string[];
      const uniqueTypes = Array.from(new Set(processedMerchants.map(m => m.type).filter(Boolean))) as string[];
      setProvinces(uniqueProvinces.sort());
      setTypes(uniqueTypes.sort());

      // 4. STATS & GROWTH
      const now = new Date();
      const todayStart = new Date(now.setHours(0,0,0,0)).toISOString();
      const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
      const monthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
      const quarterAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString();
      const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();

      const { count: mCount } = await supabase.from('merchants').select('id', { count: 'exact', head: true }).eq('status', 'active');
      const { count: lCount } = await supabase.from('locations').select('id', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('merchants').select('id', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: uCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
      
      const { count: uToday } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('created_at', todayStart);
      const { count: uWeek } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('created_at', weekAgo);
      const { count: uMonth } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('created_at', monthAgo);
      const { count: uQuarter } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('created_at', quarterAgo);
      const { count: uYear } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('created_at', yearAgo);

      // New specific stats
      const { count: ownerCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'merchant');
      const { count: consumerCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'consumer');
      const { count: activityCount } = await supabase.from('system_events').select('id', { count: 'exact', head: true }).gt('created_at', todayStart);

      // Categort Stats
      const producers = processedMerchants.filter(m => (m.type || '').toLowerCase().includes('productor')).length;
      const abastecedores = processedMerchants.filter(m => (m.type || '').toLowerCase().includes('abastecedor') || (m.type || '').toLowerCase().includes('almacen')).length;
      const restaurantes = processedMerchants.filter(m => (m.type || '').toLowerCase().includes('restaurante')).length;
      const chefs = processedMerchants.filter(m => (m.type || '').toLowerCase().includes('chef')).length;

      // Verification Stats
      const verified = processedMerchants.filter(m => m.verified || m.owner_id).length;
      const validated = processedMerchants.filter(m => (m.validation_count || 0) > 0).length;

      setStats({
        totalMerchants: mCount || 0,
        totalLocations: lCount || 0,
        pendingApprovals: pCount || 0,
        totalUsers: uCount || 0,
        totalOwners: ownerCount || 0,
        totalConsumers: consumerCount || 0,
        activityToday: activityCount || 0,
        usersToday: uToday || 0,
        usersThisWeek: uWeek || 0,
        usersThisMonth: uMonth || 0,
        // @ts-ignore
        usersThisQuarter: uQuarter || 0,
        // @ts-ignore
        usersThisYear: uYear || 0,
        // @ts-ignore
        merchantsProducers: producers,
        // @ts-ignore
        merchantsAbastecedores: abastecedores,
        // @ts-ignore
        merchantsRestaurantes: restaurantes,
        // @ts-ignore
        merchantsChefs: chefs,
        // @ts-ignore
        merchantsVerified: verified,
        // @ts-ignore
        merchantsUnverified: (mCount || 0) - verified,
        // @ts-ignore
        merchantsValidated: validated,
        // @ts-ignore
        merchantsNonValidated: (mCount || 0) - validated,
      });

      // 5. UNIFIED MESSAGING
      const { data: contactMsgs, error: contactErr } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      const { data: chatNotifs, error: chatErr } = await supabase.from('notifications').select('*').eq('type', 'ADMIN_ALERT').order('created_at', { ascending: false });
      
      const simKey = `sim_read_messages`;
      const localRead = JSON.parse(localStorage.getItem(simKey) || '[]');

      const unifiedMessages = [
        ...(contactMsgs || []).map(m => ({ 
          ...m, 
          status: localRead.includes(m.id) ? 'read' : m.status,
          type: 'CONTACT_FORM' 
        })),
        ...(chatNotifs || []).map(n => {
          const meta = (() => {
            let m = n.metadata || {};
            if (typeof m === 'string') {
              try { m = JSON.parse(m); } catch(e) { m = {}; }
            }
            return m;
          })();
          const isActuallyRead = n.status === 'read' || meta.admin_read === true || localRead.includes(n.id);
          return { 
            id: n.id, 
            sender_name: meta.name || meta.email || 'Visita Anónima', 
            sender_email: meta.email || '-', 
            subject: n.title, 
            message: n.content, 
            status: isActuallyRead ? 'read' : 'unread', 
            created_at: n.created_at,
            type: 'CHATBOT' 
          };
        })
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setMessages(unifiedMessages as any);

      // 6. ANALYTICS ENGINE (Search Hotspots & Merchant Interactions)
      let startDateStr = monthAgo;
      if (analyticsTimeRange === 'day') startDateStr = todayStart;
      if (analyticsTimeRange === 'week') startDateStr = weekAgo;
      if (analyticsTimeRange === 'month') startDateStr = monthAgo;
      if (analyticsTimeRange === 'quarter') startDateStr = quarterAgo;
      if (analyticsTimeRange === 'year') startDateStr = yearAgo;

      const { data: events } = await supabase
        .from('system_events')
        .select('*')
        .gt('created_at', startDateStr)
        .order('created_at', { ascending: false })
        .limit(3000);

      const searchMap: Record<string, number> = {};
      const merchantMap: Record<string, { id: string, name: string, clicks: number }> = {};

      (events || []).forEach(e => {
        // Aggregating Searches
        if (e.event_type === 'SEARCH_QUERY_ENTER' || e.event_type === 'SEARCH_QUERY_SELECTED') {
          const q = (e.payload?.query || '').toLowerCase().trim();
          if (q) searchMap[q] = (searchMap[q] || 0) + 1;
        }
        // Aggregating Merchant interactions
        if (e.event_type.startsWith('CTA_') || e.event_type === 'SELECT_MERCHANT') {
          const mId = e.payload?.id;
          const mName = e.payload?.name || processedMerchants.find(m => m.id === mId)?.name || 'Unknown';
          if (mId) {
            if (!merchantMap[mId]) merchantMap[mId] = { id: mId, name: mName, clicks: 0 };
            merchantMap[mId].clicks++;
          }
        }
      });

      setTopSearches(Object.entries(searchMap).sort((a, b) => b[1] - a[1]).slice(0, 20));
      setTopMerchants(Object.values(merchantMap).sort((a, b) => b.clicks - a.clicks).slice(0, 20));
      
      // Load initial batch
      await fetchUsers();
      
    } catch (err: any) {
      console.error("Global fetch error:", err);
      setError(err.message || "Error al cargar datos");
    }
    setLoading(false);
  };

  const markAsRead = async (id: string, type: 'CONTACT_FORM' | 'CHATBOT') => {
    // Actualización optimista inmediata
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    
    // Guardar en la persistencia del simulador local para que no vuelva a aparecer como unread tras refresh
    const simKey = `sim_read_messages`;
    const localRead = JSON.parse(localStorage.getItem(simKey) || '[]');
    localStorage.setItem(simKey, JSON.stringify([...new Set([...localRead, id])]));

    try {
      if (type === 'CONTACT_FORM') {
        const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id);
        if (error) throw error;
      } else {
        const { data: current } = await supabase.from('notifications').select('metadata').eq('id', id).single();
        let metadata = current?.metadata || {};
        if (typeof metadata === 'string') {
          try { metadata = JSON.parse(metadata); } catch(e) { metadata = {}; }
        }
        const newMetadata = { ...metadata, admin_read: true };
        const { error } = await supabase.from('notifications').update({ metadata: newMetadata, status: 'read' }).eq('id', id);
        if (error) throw error;
      }
    } catch (e: any) {
      console.warn("[ADMIN SIM]: Error al persistir en DB, pero se mantiene en caché local:", e);
      // No reventamos ni forzamos fetchData aquí para no perder el estado UI
    }
  };

  const handleImport = async (importText: string) => {
    if (!importText) return;
    setIsImporting(true);
    const rows = importText.split('\n').filter(r => r.trim());
    if (rows.length < 2) { 
      alert('Se necesita al menos una fila de datos además de la cabecera.'); 
      setIsImporting(false); 
      return; 
    }

    const headers = rows[0].split('\t').map(h => h.trim().toLowerCase());
    const dataRows = rows.slice(1);
    let count = 0;

    for (const r of dataRows) {
      const v = r.split('\t');
      const row: any = {};
      headers.forEach((h, i) => row[h] = v[i]?.trim());

      const name = row['nombre'] || row['nombre del emprendimiento'] || row['name'];
      if (!name) continue;

      try {
        const province = row['provincia'] || row['province'];
        const rubro = row['rubro'] || row['tipo'] || row['type'];
        const instagram = row['instagram'] || row['ig'] || row['instagram_url'];
        const website = row['web'] || row['website'] || row['website_url'];

        const { data: m, error: mErr } = await supabase.from('merchants').insert({ 
          name, 
          status: 'active',
          type: rubro || 'Abastecedor',
          instagram_url: instagram || '',
          website_url: website || ''
        }).select().single();

        if (m && province) {
          await supabase.from('locations').insert({ 
            merchant_id: m.id, 
            province, 
            location_type: 'fixed', 
            lat: -34.6, 
            lng: -58.4 
          });
        }
        count++;
      } catch (e) {
        console.error("Error importando fila:", e);
      }
    }

    alert(`¡Éxito! Se importaron ${count} comerciantes correctamente.`);
    setIsImporting(false);
    setShowImportModal(false);
    fetchData();
  };

  const updateMerchantStatus = async (id: string, status: 'active' | 'rejected') => {
    const { error } = await supabase.from('merchants').update({ status }).eq('id', id);
    if (!error) {
      setMerchants(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      fetchData();
    }
  };

  const updateContactStatus = async (id: string, contact_status: string) => {
    const { error } = await supabase.from('merchants').update({ contact_status }).eq('id', id);
    if (!error) setMerchants(prev => prev.map(m => m.id === id ? { ...m, contact_status } as any : m));
  };

  const toggleVerified = async (id: string, current: boolean) => {
    const { error } = await supabase.from('merchants').update({ verified: !current }).eq('id', id);
    if (!error) setMerchants(prev => prev.map(m => m.id === id ? { ...m, verified: !current } : m));
  };

  const openEditModal = (m: Merchant) => {
    setEditingMerchant(m);
    setShowEditModal(true);
  };

  const handleUpdateMerchant = async () => {
    if (!editingMerchant) return;
    setIsSaving(true);
    const { error } = await supabase.from('merchants').update({
      name: editingMerchant.name,
      type: editingMerchant.type,
      instagram_url: editingMerchant.instagram_url,
      website_url: editingMerchant.website_url,
      admin_notes: editingMerchant.admin_notes,
      bio_short: editingMerchant.bio_short,
      delivery_info: editingMerchant.delivery_info,
      status: editingMerchant.status
    }).eq('id', editingMerchant.id);
    if (!error) { setShowEditModal(false); fetchData(); }
    setIsSaving(false);
  };

  if (loading) return <AlimnetLoader fullScreen />;

  if (loading) return <AlimnetLoader fullScreen />;

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px', fontFamily: 'Manrope, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ background: '#F0F4ED', color: '#5F7D4A', padding: '10px 20px', borderRadius: '15px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E4EBDD' }}>
          <span style={{ fontWeight: 1000, fontSize: '0.8rem' }}>🛡️ CENTRAL DE OPERACIONES</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.85rem', fontWeight: '1000', color: '#2D3A20', margin: 0 }}>Alimnet Control Center</h1>
            <p style={{ color: '#B2AC88', fontWeight: 800, margin: '8px 0 0 0', fontSize: '1.1rem' }}>Gestionando la red soberana v3.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setShowExportModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.9rem 1.8rem', background: 'white', borderRadius: '16px', color: '#2D3A20', fontWeight: '1000', border: '1.5px solid #F0F4ED', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <Download size={20} /> Exportar
            </button>
            <button onClick={() => setShowImportModal(true)} style={{ padding: '0.9rem 1.8rem', background: '#5F7D4A', borderRadius: '16px', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer' }}>+ Importar Excel</button>
          </div>
        </div>

        {error && <div style={{background:'#FEE2E2', color:'#991B1B', padding:20, borderRadius:15, marginBottom:40, fontWeight:800}}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <KPICard label="Comercios en Red" value={stats.totalMerchants} trend="Activos" icon={<Store size={22} color="#5F7D4A" />} />
          <KPICard label="Propietarios (Owners)" value={stats.totalOwners} trend="Comerciantes" icon={<ShieldCheck size={22} color="#A67C00"/>} />
          <KPICard label="Usuarios (Comunidad)" value={stats.totalConsumers} trend="Miembros" icon={<Users size={22} color="#2D3A20" />} />
          <KPICard 
             label="Actividad Hoy (Visitas)" 
             value={stats.activityToday} 
             trend={`+${stats.usersToday} nuevos perfiles`} 
             icon={<BarChart3 size={22} color="#5F7D4A" />} 
          />
        </div>

        {/* Categoty & Validation Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
           <div style={{ background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between' }}>
              <CategoryStat label="Productores" value={(stats as any).merchantsProducers || 0} icon={<ProductorIcon size={14}/>} />
              <CategoryStat label="Abastecedores" value={(stats as any).merchantsAbastecedores || 0} icon={<Store size={14}/>} />
              <CategoryStat label="Restaurantes" value={(stats as any).merchantsRestaurantes || 0} icon={<UtensilsCrossed size={14}/>} />
              <CategoryStat label="Chefs" value={(stats as any).merchantsChefs || 0} icon={<ChefHat size={14}/>} />
           </div>
           <div style={{ background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between' }}>
              <CategoryStat label="Sello Oficial" value={(stats as any).merchantsVerified || 0} color="#A67C00" />
              <CategoryStat label="Comunitarios" value={(stats as any).merchantsUnverified || 0} color="#B2AC88" />
              <CategoryStat label="Validados +1" value={(stats as any).merchantsValidated || 0} color="#5F7D4A" />
              <CategoryStat label="Sin Validar" value={(stats as any).merchantsNonValidated || 0} color="#666" />
           </div>
        </div>

        {/* Growth Stats Strip */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', background: '#F0F4ED', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
           <div style={{ flex: 1, textAlign: 'center' }}>
             <div style={StatLabel}>Hoy</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#2D3A20' }}>+{stats.usersToday}</div>
           </div>
           <div style={{ width: '1px', background: '#E4EBDD' }} />
           <div style={{ flex: 1, textAlign: 'center' }}>
             <div style={StatLabel}>Semana</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#2D3A20' }}>+{stats.usersThisWeek}</div>
           </div>
           <div style={{ width: '1px', background: '#E4EBDD' }} />
           <div style={{ flex: 1, textAlign: 'center' }}>
             <div style={StatLabel}>Mes</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#2D3A20' }}>+{stats.usersThisMonth}</div>
           </div>
           <div style={{ width: '1px', background: '#E4EBDD' }} />
           <div style={{ flex: 1, textAlign: 'center' }}>
             <div style={StatLabel}>Trimestre</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#2D3A20' }}>+{(stats as any).usersThisQuarter || 0}</div>
           </div>
           <div style={{ width: '1px', background: '#E4EBDD' }} />
           <div style={{ flex: 1, textAlign: 'center' }}>
             <div style={StatLabel}>Año</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#2D3A20' }}>+{(stats as any).usersThisYear || 0}</div>
           </div>
           <div style={{ width: '1px', background: '#E4EBDD' }} />
           <div style={{ flex: 1, textAlign: 'center', background: 'rgba(95, 125, 74, 0.1)', borderRadius: '15px' }}>
             <div style={StatLabel}>Histórico</div>
             <div style={{ fontSize: '1.3rem', fontWeight: 1000, color: '#5F7D4A' }}>{stats.totalUsers}</div>
           </div>
        </div>

        <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.04)', border: '1px solid #E4EBDD' }}>
          <AdminTabs 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'usuarios' && users.length === 0) fetchUsers();
            if (tab === 'pagos' && donations.length === 0) fetchDonations();
          }} 
          counts={{
            merchants: merchants.length,
            pending: stats.pendingApprovals,
            users: stats.totalUsers,
            messages: messages.filter(m => m.status === 'unread').length
          }}
        />

          {activeTab === 'comercios' || activeTab === 'pendientes' ? (
             <DataTable 
               merchants={activeTab === 'pendientes' ? merchants.filter(m => m.status === 'pending') : merchants}
               searchTerm={searchTerm}
               setSearchTerm={setSearchTerm}
               onUpdateStatus={updateMerchantStatus}
               onUpdateContactStatus={updateContactStatus}
               onToggleVerified={toggleVerified}
               onOpenEdit={openEditModal}
             />
          ) : activeTab === 'usuarios' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={THStyle}>SOCIO N°</th>
                    <th style={THStyle}>USUARIO</th>
                    <th style={THStyle}>ROL</th>
                    <th style={THStyle}>LOCALIDAD</th>
                    <th style={THStyle}>ACTIVIDAD</th>
                    <th style={THStyle}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? <tr><td colSpan={5} style={{padding:40, textAlign:'center'}}><AlimnetLoader size={60} /></td></tr> : users.map(u => (
                    <tr key={u.id} style={{borderBottom:'1px solid #F0F4ED'}}>
                      <td style={{padding:20}}>
                        <div style={{
                          background: '#F0F4ED', color: '#5F7D4A', padding: '4px 10px', 
                          borderRadius: '8px', fontSize: '0.75rem', fontWeight: '1000',
                          display: 'inline-block', border: '1px solid #E4EBDD'
                        }}>
                          #{u.user_number || '---'}
                        </div>
                      </td>
                      <td style={{padding:20}}>
                        <div style={{fontWeight:1000, color:'#2D3A20'}}>
                          {/* Log para cazar el error si persiste */}
                          {(() => {
                            const name = (u.first_name || u.last_name) 
                              ? `${u.first_name || ''} ${u.last_name || ''}`.trim() 
                              : (u.full_name || 'Sin Nombre');
                            return name;
                          })()}
                        </div>
                        <div style={{fontSize:'0.75rem', color:'#B2AC88', fontWeight:800}}>{u.email || 'No email synced'}</div>
                      </td>
                      <td style={{padding:20}}>
                        <select value={u.role} onChange={(e)=>updateUserRole(u.id, e.target.value)} style={{padding:'8px 12px', borderRadius:10, border:'1.5px solid #F0F4ED', background:'#F8F9F5', fontWeight:950, fontSize:'0.75rem'}}>
                          <option value="user">USUARIO</option>
                          <option value="merchant">COMERCIO</option>
                          <option value="admin">ADMIN</option>
                        </select>
                      </td>
                      <td style={{padding:20}}>
                        <div style={{fontWeight:900, color:'#5F7D4A'}}>{u.locality || 'No def.'}</div>
                        <div style={{fontSize:'0.75rem', color:'#B2AC88'}}>{u.province || 'No def.'}</div>
                      </td>
                      <td style={{padding:20}}>
                         <div style={{display:'flex', gap:10, marginBottom:8}}>
                            <ActivityBadge icon={<Store size={12}/>} count={u.m_count || 0} color="#5F7D4A" title="Comercios creados" />
                            <ActivityBadge icon={<CheckCircle size={12}/>} count={u.v_count || 0} color="#A67C00" title="Validaciones realizadas" />
                            <ActivityBadge icon={<Heart size={12}/>} count={u.f_count || 0} color="#EF4444" title="Favoritos" />
                         </div>
                         <div style={{width:100, height:6, background:'#F0F4ED', borderRadius:10, overflow:'hidden'}}>
                            <div style={{width:`${u.activity || 10}%`, height:'100%', background:'#5F7D4A', transition:'width 0.3s'}}/>
                         </div>
                      </td>
                      <td style={{padding:20}}>
                        <button onClick={()=>deleteUser(u.id)} style={{background:'none', border:'none', color:'#EF4444', cursor:'pointer', padding:10}}><Trash size={18}/></button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !usersLoading && (
                    <tr><td colSpan={5} style={{padding:80, textAlign:'center', color:'#B2AC88'}}>No se encontraron usuarios.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'pagos' ? (
             <div style={{ padding: '2rem' }}>
                <DonationsList donations={donations} loading={donationsLoading} />
             </div>
          ) : activeTab === 'analytics' ? (
             <IntelligenceTab 
               stats={stats}
               topSearches={topSearches}
               topMerchants={topMerchants}
               analyticsTimeRange={analyticsTimeRange}
               setAnalyticsTimeRange={setAnalyticsTimeRange}
               topCities={topCities}
             />
          ) : activeTab === 'mensajes' ? (
             <MessagesTab 
               messages={messages} 
               onMarkAsRead={markAsRead} 
             />
          ) : (
             <div style={{ padding: '40px', textAlign: 'center', color: '#B2AC88', fontWeight: 800 }}>
               Selecciona una pestaña para comenzar.
             </div>
          )}
        </div>
      </main>

      {showEditModal && editingMerchant && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 32, width: '90%', maxWidth: 800 }}>
            <h2 style={{fontWeight:1000, color:'#2D3A20'}}>Editar {editingMerchant.name}</h2>
            <div style={{display:'grid', gap:20, marginTop:20}}>
              <div><label style={LabelStyle}>Nombre</label><input style={InputStyle} value={editingMerchant.name} onChange={(e)=>setEditingMerchant({...editingMerchant, name: e.target.value})} /></div>
              <div><label style={LabelStyle}>Status</label>
                <select style={InputStyle} value={editingMerchant.status} onChange={(e)=>setEditingMerchant({...editingMerchant, status: e.target.value})}>
                  <option value="active">Active</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label style={LabelStyle}>Productos / Bio Corta</label>
                <textarea 
                  style={{...InputStyle, minHeight: '80px', resize: 'vertical'}} 
                  value={editingMerchant.bio_short || ''} 
                  onChange={(e)=>setEditingMerchant({...editingMerchant, bio_short: e.target.value})} 
                />
              </div>
              <div>
                <label style={LabelStyle}>Logística / Entrega</label>
                <input 
                  style={InputStyle} 
                  value={editingMerchant.delivery_info || ''} 
                  onChange={(e)=>setEditingMerchant({...editingMerchant, delivery_info: e.target.value})} 
                />
              </div>
              <div>
                <label style={LabelStyle}>Notas Internas (Admin)</label>
                <textarea 
                  style={{...InputStyle, minHeight: '80px', resize: 'vertical'}} 
                  value={editingMerchant.admin_notes || ''} 
                  onChange={(e)=>setEditingMerchant({...editingMerchant, admin_notes: e.target.value})} 
                />
              </div>
              <div style={{display:'flex', gap:10}}>
                <button onClick={handleUpdateMerchant} style={{flex:1, padding:15, background:'#5F7D4A', color:'white', border:'none', borderRadius:12, fontWeight:900}}>Guardar</button>
                <button onClick={()=>setShowEditModal(false)} style={{flex:1, padding:15, background:'#F0F4ED', border:'none', borderRadius:12, fontWeight:900}}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <ImportModal 
          onClose={() => setShowImportModal(false)} 
          onImport={handleImport} 
          isImporting={isImporting} 
        />
      )}

      {showExportModal && (
        <ExportModal 
          onClose={() => setShowExportModal(false)} 
          data={merchants} 
        />
      )}
    </div>
  );
}

function DonationsList({ donations, loading }: any) {
    if (loading) return <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}><AlimnetLoader size={60} /></div>;
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={THStyle}>FECHA</th>
                    <th style={THStyle}>MONTO</th>
                    <th style={THStyle}>DONANTE</th>
                    <th style={THStyle}>MÉTODO</th>
                    <th style={THStyle}>ESTADO</th>
                </tr>
            </thead>
            <tbody>
                {donations.map((d: any) => (
                    <tr key={d.id} style={{borderBottom:'1px solid #F0F4ED'}}>
                        <td style={{padding:20, fontSize: '0.85rem', color: '#B2AC88', fontWeight: 700}}>{new Date(d.created_at).toLocaleDateString()}</td>
                        <td style={{padding:20}}>
                            <div style={{fontWeight:1000, color: '#2D3A20'}}>{d.currency} ${d.amount}</div>
                            <div style={{fontSize: '0.7rem', color: '#5F7D4A', fontWeight: 800, textTransform: 'uppercase'}}>{d.metadata?.frequency || 'única'}</div>
                        </td>
                        <td style={{padding:20}}>
                            <div style={{fontWeight:900, fontSize: '0.9rem'}}>{d.metadata?.donor_name || 'Amigo de Alimnet'}</div>
                            <div style={{fontSize:'0.75rem', color:'#888', fontWeight: 600}}>{d.metadata?.donor_email || d.donor_email || '-'}</div>
                        </td>
                        <td style={{padding:20}}>
                            <span style={{...BadgeStyle, background: '#F0F4ED', color: '#2D3A20'}}>
                                {d.payment_method?.toUpperCase()}
                            </span>
                        </td>
                        <td style={{padding:20}}>
                            <span style={{ 
                                ...BadgeStyle, 
                                background: d.status === 'succeeded' ? '#DCFCE7' : (d.status === 'succeeded_test' ? '#F0F4ED' : '#FEF3C7'), 
                                color: d.status === 'succeeded' ? '#166534' : (d.status === 'succeeded_test' ? '#5F7D4A' : '#B45309') 
                            }}>
                                {d.status === 'succeeded_test' ? 'PRUEBA' : d.status?.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                ))}
                {donations.length === 0 && (
                    <tr><td colSpan={5} style={{padding:60, textAlign:'center', color:'#B2AC88'}}>No hay registros de pagos aún.</td></tr>
                )}
            </tbody>
        </table>
    );
}

function KPICard({ label, value, trend, icon }: any) {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B2AC88' }}>{icon} <span style={{fontSize:'0.7rem'}}>{trend}</span></div>
      <div style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', margin: '10px 0' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#B2AC88', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function ActivityBadge({ icon, count, color, title }: any) {
  return (
    <div title={title} style={{display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:1000, color: color, background: `${color}10`, padding:'4px 8px', borderRadius:8}}>
      {icon} {count}
    </div>
  );
}

function CategoryStat({ label, value, icon, color = '#2D3A20' }: any) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#B2AC88', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: '1.2rem', fontWeight: 1000, color: color }}>{value}</div>
    </div>
  );
}

const THStyle = { padding: '1.2rem 1rem', fontSize: '0.75rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' as const, textAlign: 'left' as const };
const BadgeStyle = { padding: '6px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '1000' };
const LabelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase' as const, marginBottom: '6px' };
const InputStyle = { width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '700' };
const StatLabel = { fontSize: '0.7rem', fontWeight: 1000, color: '#B2AC88', textTransform: 'uppercase' as const };
