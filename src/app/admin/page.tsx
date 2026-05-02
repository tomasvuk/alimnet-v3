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
  Download,
  Megaphone,
  MessageCircle,
  Copy
} from 'lucide-react';
import Header from '@/components/Header';
import AlimnetLoader from '@/components/AlimnetLoader';
import AdminTabs from './components/AdminTabs';
import IntelligenceTab from './components/IntelligenceTab';
import DataTable from './components/DataTable';
import MessagesTab from './components/MessagesTab';
import ExportModal from './components/ExportModal';
import ImportModal from './components/ImportModal';
import ContactDropdown from './components/ContactDropdown';
import CrmBoard from './components/CrmBoard';
import MerchantCard from '@/components/MerchantCard';
import MerchantReviewModal from './components/MerchantReviewModal';
import CategoriesTab from './components/CategoriesTab';
import { Eye } from 'lucide-react';

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
  country?: string;
}

interface Merchant {
  id: string;
  name: string;
  type: string;
  status: string;
  verified: boolean;
  claimed: boolean;
  contact_status: 'sin_contacto' | 'contactado' | 'en_proceso' | 'oficializado' | 'negado' | 'verificado';
  admin_notes: string | null;
  instagram_url: string;
  website_url: string;
  phone?: string | null;
  whatsapp?: string | null;
  working_hours?: string | null;
  google_maps_url?: string | null;
  order_instructions?: string | null;
  validation_count: number;
  created_at: string;
  locations?: Location[];
  owner_id?: string | null;
  province?: string;
  validationsCount?: number;
  bio_short?: string | null;
  bio_long?: string | null;
  delivery_info?: string | null;
  created_by_type?: string;
  created_by?: string | null;
  gallery_images?: string[];
  email?: string | null;
  bio?: string | null;
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
  const [activeTab, setActiveTab] = useState<'comercios' | 'mensajes' | 'pendientes' | 'usuarios' | 'pagos' | 'analytics' | 'oficializacion' | 'categorias'>('comercios');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  
  const [crmView, setCrmView] = useState<'list' | 'kanban' | 'revision'>('revision');
  const [crmTemplate, setCrmTemplate] = useState('');

  // Review mode state
  const [reviewMerchant, setReviewMerchant] = useState<Merchant | null>(null);
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [crmSortBy, setCrmSortBy] = useState<string>('default');
  const [crmFilterStatus, setCrmFilterStatus] = useState<string>('sin_contacto');
  const [crmFilterReviewed, setCrmFilterReviewed] = useState<string>('all');
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [previewMerchant, setPreviewMerchant] = useState<Merchant | null>(null);
  
  // Analytics State
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [topSearches, setTopSearches] = useState<[string, number][]>([]);
  const [topMerchants, setTopMerchants] = useState<{ id: string, name: string, clicks: number }[]>([]);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Advanced Analytics States
  const [trafficByCountry, setTrafficByCountry] = useState<{ country: string, count: number }[]>([]);
  const [trafficByProvince, setTrafficByProvince] = useState<{ province: string, count: number }[]>([]);
  const [sessionStats, setSessionStats] = useState({ avgDuration: 0, bounceRate: 0, conversionRate: 0 });
  const [peakData, setPeakData] = useState<{ peakDay: string, peakHour: string }>({ peakDay: '-', peakHour: '-' });
  
  // Filtros Avanzados
  const [filterProvince, setFilterProvince] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterOrigin, setFilterOrigin] = useState<string>('all');
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
  const [topCitiesReal, setTopCitiesReal] = useState<{ city: string, count: number }[]>([]);
  const [userRoles, setUserRoles] = useState<{ role: string, count: number }[]>([]);
  const [topPages, setTopPages] = useState<{ path: string, count: number }[]>([]);
  const [topReferrers, setTopReferrers] = useState<{ referrer: string, count: number }[]>([]);

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

  // CRM Template Init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTemplate = localStorage.getItem('crm_wzp_template');
      if (savedTemplate) {
        setCrmTemplate(savedTemplate);
      } else {
        setCrmTemplate(`¡Hola! 👋 Les escribo desde Alimnet, el mapa de alimentos cuidados (agroecológicos, orgánicos, etc).%0A%0AYa los tenemos sumados en nuestra plataforma porque nos encanta lo que hacen 🌿, pero queremos invitarlos a oficializar su perfil.%0A%0ALa idea es que miles de consumidores afines puedan encontrarlos fácil cuando busquen productos como los suyos. No tiene ningún costo. Pueden cargar sus datos completos y fotos acá: {{LINK}}%0A%0AMi nombre es Tomás Vukojicic, encantado de que sean parte y quedo a disposición para ayudarlos en el proceso. ¡Un abrazo!`);
      }
    }
  }, []);

  const handleSaveTemplate = (text: string) => {
    setCrmTemplate(text);
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_wzp_template', text);
    }
    setShowTemplateEditor(false);
  };

  // Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewMerchant(null);
        setShowTemplateEditor(false);
        setShowEditModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      
      const cityMap: Record<string, number> = {};
      const roleMap: Record<string, number> = {};
      processedUsers.forEach(u => {
        const city = u.locality || 'Sin definir';
        cityMap[city] = (cityMap[city] || 0) + 1;
        
        const role = u.role || 'user';
        roleMap[role] = (roleMap[role] || 0) + 1;
      });
      setTopCities(Object.entries(cityMap).map(([locality, count]) => ({ locality, count })).sort((a,b) => b.count - a.count));
      setUserRoles(Object.entries(roleMap).map(([role, count]) => ({ role, count })).sort((a,b) => b.count - a.count));
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

      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/admin/analytics?startDate=${startDateStr}`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      const events = await res.json();
      
      if (events.error) {
        console.error("Analytics fetch error:", events.error);
      }

      const searchMap: Record<string, number> = {};
      const merchantMap: Record<string, { id: string, name: string, clicks: number }> = {};
      
      const countryMap: Record<string, number> = {};
      const provinceMap: Record<string, number> = {};
      const cityRealMap: Record<string, number> = {};
      const pageMap: Record<string, number> = {};
      const referrerMap: Record<string, number> = {};
      const sessionMap: Record<string, { start: number, end: number, count: number }> = {};
      const dayMap: Record<number, number> = {};
      const hourMap: Record<number, number> = {};

      (events || []).forEach((e: any) => {
        let payload = e.payload || {};
        if (typeof payload === 'string') {
          try { payload = JSON.parse(payload); } catch(err) { payload = {}; }
        }
        
        // 1. Searches
        if (e.event_type === 'SEARCH_QUERY_ENTER' || e.event_type === 'SEARCH_QUERY_SELECTED' || e.event_type === 'SEARCH_QUERY_AUTO') {
          const q = (payload.query || '').toLowerCase().trim();
          if (q) searchMap[q] = (searchMap[q] || 0) + 1;
        }

        // 2. Merchant interactions
        if (e.event_type.startsWith('CTA_') || e.event_type === 'SELECT_MERCHANT') {
          const mId = payload.id;
          const mName = payload.name || processedMerchants.find(m => m.id === mId)?.name || 'Unknown';
          if (mId) {
            if (!merchantMap[mId]) merchantMap[mId] = { id: mId, name: mName, clicks: 0 };
            merchantMap[mId].clicks++;
          }
        }

        // 3. Page Views & Geography
        if (e.event_type === 'PAGE_VIEW') {
          const c = payload.country || 'Unknown';
          const p = payload.province || 'Unknown';
          const ct = payload.city || 'Unknown';
          const path = payload.path || '/';
          let ref = 'Directo';
          if (payload.referrer) {
            try {
              ref = new URL(payload.referrer).hostname || payload.referrer;
            } catch (e) {
              ref = payload.referrer;
            }
          }
          
          countryMap[c] = (countryMap[c] || 0) + 1;
          provinceMap[p] = (provinceMap[p] || 0) + 1;
          cityRealMap[ct] = (cityRealMap[ct] || 0) + 1;
          pageMap[path] = (pageMap[path] || 0) + 1;
          referrerMap[ref] = (referrerMap[ref] || 0) + 1;

          // Sessions
          const sid = payload.sessionId;
          if (sid) {
            const time = new Date(e.created_at).getTime();
            if (!sessionMap[sid]) {
              sessionMap[sid] = { start: time, end: time, count: 1 };
            } else {
              sessionMap[sid].start = Math.min(sessionMap[sid].start, time);
              sessionMap[sid].end = Math.max(sessionMap[sid].end, time);
              sessionMap[sid].count++;
            }
          }

          // Peak Hours/Days
          const date = new Date(e.created_at);
          const day = date.getDay();
          const hour = date.getHours();
          dayMap[day] = (dayMap[day] || 0) + 1;
          hourMap[hour] = (hourMap[hour] || 0) + 1;
        }
      });

      // Calculate Session Stats
      const sessions = Object.values(sessionMap);
      const totalSessions = sessions.length;
      const totalDuration = sessions.reduce((acc, s) => acc + (s.end - s.start), 0);
      const avgDurationSec = totalSessions > 0 ? (totalDuration / totalSessions / 1000) : 0;
      const bounceCount = sessions.filter(s => s.count === 1).length;
      const bounceRate = totalSessions > 0 ? Math.round((bounceCount / totalSessions) * 100) : 0;
      
      // Conversion Rate (Signups / Sessions)
      // Usamos el incremento de usuarios en el periodo (stats.usersToday/Month/etc)
      let currentPeriodSignups = 0;
      if (analyticsTimeRange === 'day') currentPeriodSignups = stats.usersToday;
      else if (analyticsTimeRange === 'week') currentPeriodSignups = stats.usersThisWeek;
      else if (analyticsTimeRange === 'month') currentPeriodSignups = stats.usersThisMonth;
      else if (analyticsTimeRange === 'quarter') currentPeriodSignups = (stats as any).usersThisQuarter || 0;
      else if (analyticsTimeRange === 'year') currentPeriodSignups = (stats as any).usersThisYear || 0;

      const convRate = totalSessions > 0 ? parseFloat(((currentPeriodSignups / totalSessions) * 100).toFixed(1)) : 0;

      // Peak Data
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const peakDayIdx = Object.entries(dayMap).sort((a,b) => b[1] - a[1])[0]?.[0];
      const peakHourIdx = Object.entries(hourMap).sort((a,b) => b[1] - a[1])[0]?.[0];

      setSessionStats({
        avgDuration: Math.round(avgDurationSec / 60),
        bounceRate,
        conversionRate: convRate
      });

      setPeakData({
        peakDay: peakDayIdx !== undefined ? days[parseInt(peakDayIdx)] : '-',
        peakHour: peakHourIdx !== undefined ? `${peakHourIdx}:00 hs` : '-'
      });

      setTrafficByCountry(Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a,b) => b.count - a.count));
      setTrafficByProvince(Object.entries(provinceMap).map(([province, count]) => ({ province, count })).sort((a,b) => b.count - a.count));
      setTopCitiesReal(Object.entries(cityRealMap).map(([city, count]) => ({ city, count })).sort((a,b) => b.count - a.count));
      setTopPages(Object.entries(pageMap).map(([path, count]) => ({ path, count })).sort((a,b) => b.count - a.count).slice(0, 10));
      setTopReferrers(Object.entries(referrerMap).map(([referrer, count]) => ({ referrer, count })).sort((a,b) => b.count - a.count).slice(0, 10));
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
    if (!error) {
      setMerchants(prev => prev.map(m => m.id === id ? { ...m, contact_status } as any : m));
      // No llamamos a fetchData() aquí para no perder la posición del scroll, 
      // pero el cambio ya impactó en la DB y en el estado local.
    } else {
      alert('Error al actualizar estado: ' + error.message);
    }
  };

  const handleReviewSave = async (id: string, updates: Partial<Merchant>) => {
    const { error } = await supabase.from('merchants').update(updates).eq('id', id);
    if (!error) {
      setMerchants(prev => prev.map(m => m.id === id ? { ...m, ...updates } as Merchant : m));
    } else {
      alert('Error al guardar: ' + error.message);
    }
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
      phone: editingMerchant.phone,
      whatsapp: editingMerchant.whatsapp,
      working_hours: editingMerchant.working_hours,
      google_maps_url: editingMerchant.google_maps_url,
      order_instructions: editingMerchant.order_instructions,
      admin_notes: editingMerchant.admin_notes,
      bio_short: editingMerchant.bio_short,
      delivery_info: editingMerchant.delivery_info,
      status: editingMerchant.status
    }).eq('id', editingMerchant.id);

    // Si se editó la ubicación (provincia o país)
    if (editingMerchant.locations && editingMerchant.locations[0]) {
       const loc = editingMerchant.locations[0];
       await supabase.from('locations').update({
          province: loc.province,
          country: loc.country
       }).eq('id', loc.id);
    }
    if (!error) { setShowEditModal(false); fetchData(); }
    setIsSaving(false);
  };

  const handleDeleteMerchant = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que querés borrar este comercio? Esta acción no se puede deshacer.')) return;
    
    // Primero borrar locaciones para evitar error de FK (si no es cascada en Supabase)
    await supabase.from('locations').delete().eq('merchant_id', id);
    const { error } = await supabase.from('merchants').delete().eq('id', id);
    
    if (!error) {
      setMerchants(prev => prev.filter(m => m.id !== id));
    } else {
      alert('Error al borrar: ' + error.message);
    }
  };

  // --- LÓGICA DE FILTRADO CENTRALIZADA ---
  const filteredMerchants = merchants.filter(m => {
    const s = searchTerm.toLowerCase();
    const matchSearch = (m.name || '').toLowerCase().includes(s) || (m.type || '').toLowerCase().includes(s);
    const matchProv = filterProvince === 'all' || m.province === filterProvince;
    const matchType = filterType === 'all' || m.type === filterType;
    const matchCountry = filterCountry === 'all' || (m.locations?.[0]?.country || 'Argentina') === filterCountry;
    const matchVer = filterVerification === 'all' || 
                    (filterVerification === 'verified' && (m.verified || m.owner_id)) ||
                    (filterVerification === 'community' && !m.verified && !m.owner_id) ||
                    (filterVerification === 'validated' && (m.validation_count || 0) > 0);
    const matchOrigin = filterOrigin === 'all' || m.created_by_type === filterOrigin;
    
    return matchSearch && matchProv && matchType && matchCountry && matchVer && matchOrigin;
  });

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
              <Download size={20} /> Exportar ({filteredMerchants.length})
            </button>
            <button onClick={() => setShowImportModal(true)} style={{ padding: '0.9rem 1.8rem', background: '#5F7D4A', borderRadius: '16px', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer' }}>+ Importar Excel</button>
          </div>
        </div>

        {error && <div style={{background:'#FEE2E2', color:'#991B1B', padding:20, borderRadius:15, marginBottom:40, fontWeight:800}}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
          <KPICard label="Comercios en Red" value={stats.totalMerchants} trend="Activos" icon={<Store size={18} color="#5F7D4A" />}>
             <MiniStat label="PROD" value={(stats as any).merchantsProducers || 0} />
             <MiniStat label="ABAST" value={(stats as any).merchantsAbastecedores || 0} />
             <MiniStat label="REST" value={(stats as any).merchantsRestaurantes || 0} />
             <MiniStat label="CHEFS" value={(stats as any).merchantsChefs || 0} />
          </KPICard>

          <KPICard label="Propietarios" value={stats.totalOwners} trend="Owners" icon={<ShieldCheck size={18} color="#A67C00"/>}>
             <MiniStat label="OFICIAL" value={(stats as any).merchantsVerified || 0} color="#A67C00" />
             <MiniStat label="COMUN" value={(stats as any).merchantsUnverified || 0} color="#B2AC88" />
          </KPICard>

          <KPICard label="Usuarios" value={stats.totalConsumers} trend="Comunidad" icon={<Users size={18} color="#2D3A20" />}>
             <MiniStat label="VAL +1" value={(stats as any).merchantsValidated || 0} color="#5F7D4A" />
             <MiniStat label="S. VAL" value={(stats as any).merchantsNonValidated || 0} color="#666" />
          </KPICard>

          <KPICard 
             label="Actividad Hoy" 
             value={stats.activityToday} 
             trend={`+${stats.usersToday} hoy`} 
             icon={<BarChart3 size={18} color="#5F7D4A" />} 
          >
             <MiniStat label="SEMANA" value={`+${stats.usersThisWeek}`} />
             <MiniStat label="MES" value={`+${stats.usersThisMonth}`} />
             <MiniStat label="HIST." value={stats.totalUsers} color="#5F7D4A" />
          </KPICard>
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
            unclaimed: merchants.filter(m => !m.claimed).length,
            messages: messages.filter(m => m.status === 'unread').length
          }}
        />

          {activeTab === 'comercios' || activeTab === 'pendientes' ? (
             <DataTable 
               merchants={activeTab === 'pendientes' ? filteredMerchants.filter(m => m.status === 'pending') : filteredMerchants}
               users={users}
               searchTerm={searchTerm}
               setSearchTerm={setSearchTerm}
               // Pasamos los estados de filtros para que DataTable pueda mostrarlos/cambiarlos
               filterProvince={filterProvince}
               setFilterProvince={setFilterProvince}
               filterType={filterType}
               setFilterType={setFilterType}
               filterVerification={filterVerification}
               setFilterVerification={setFilterVerification}
               filterCountry={filterCountry}
               setFilterCountry={setFilterCountry}
               filterOrigin={filterOrigin}
               setFilterOrigin={setFilterOrigin}
               onUpdateStatus={updateMerchantStatus}
               onUpdateContactStatus={updateContactStatus}
               onToggleVerified={toggleVerified}
               onOpenEdit={openEditModal}
               onDelete={handleDeleteMerchant}
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
               topCitiesReal={topCitiesReal}
               topPages={topPages}
               topReferrers={topReferrers}
               trafficByCountry={trafficByCountry}
               trafficByProvince={trafficByProvince}
               sessionStats={sessionStats}
               peakData={peakData}
             />
          ) : activeTab === 'oficializacion' ? (
            <div style={{ padding: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                 <div>
                   <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Campaña de Oficialización</h2>
                   <p style={{ color: '#B2AC88', fontWeight: 800 }}>Gestioná el contacto con los comercios pendientes de reclamo.</p>
                 </div>
                 <div style={{ display: 'flex', gap: '10px' }}>
                   <button onClick={() => setShowTemplateEditor(true)} style={{ padding: '10px 16px', background: '#F0F4ED', color: '#5F7D4A', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center' }}>
                     <Edit size={16} /> Editar Mensaje
                   </button>
                   <div style={{ display: 'flex', background: '#F0F4ED', borderRadius: '12px', overflow: 'hidden' }}>
                     <button onClick={() => setCrmView('list')} style={{ padding: '10px 16px', background: crmView === 'list' ? '#5F7D4A' : 'transparent', color: crmView === 'list' ? 'white' : '#5F7D4A', border: 'none', fontWeight: 900, cursor: 'pointer' }}>Lista</button>
                     <button onClick={() => setCrmView('kanban')} style={{ padding: '10px 16px', background: crmView === 'kanban' ? '#5F7D4A' : 'transparent', color: crmView === 'kanban' ? 'white' : '#5F7D4A', border: 'none', fontWeight: 900, cursor: 'pointer' }}>Kanban</button>
                     <button onClick={() => setCrmView('revision')} style={{ padding: '10px 16px', background: crmView === 'revision' ? '#5F7D4A' : 'transparent', color: crmView === 'revision' ? 'white' : '#5F7D4A', border: 'none', fontWeight: 900, cursor: 'pointer' }}>Revisión</button>
                   </div>
                 </div>
               </div>

               {/* CRM Filters Bar */}
               <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                 <input type="text" placeholder="Buscar comercio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD', minWidth: '250px' }} />
                 <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
                   <option value="all">Todas las provincias</option>
                   {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
                 <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
                   <option value="all">Todos los rubros</option>
                   {types.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
               </div>

               {crmView === 'list' ? (
                 <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', overflow: 'hidden' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                     <thead>
                       <tr style={{ background: '#F8F9F5', borderBottom: '2px solid #E4EBDD' }}>
                         <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '1000', color: '#2D3A20' }}>COMERCIO</th>
                         <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '1000', color: '#2D3A20' }}>TIPO</th>
                         <th style={{ padding: '1.2rem', textAlign: 'center', fontWeight: '1000', color: '#2D3A20' }}>CONTACTO RÁPIDO</th>
                         <th style={{ padding: '1.2rem', textAlign: 'center', fontWeight: '1000', color: '#2D3A20' }}>ESTADO</th>
                       </tr>
                     </thead>
                     <tbody>
                       {filteredMerchants.filter(m => !m.claimed).map(m => {
                         const baseUrl = 'https://alimnet.com';
                         const claimLink = `${baseUrl}/explorar?id=${m.id}`;
                         const message = crmTemplate.replace('{{LINK}}', claimLink);

                         return (
                           <tr key={m.id} style={{ borderBottom: '1px solid #F0F4ED' }}>
                             <td style={{ padding: '1.2rem' }}>
                               <div style={{ fontWeight: 1000, color: '#2D3A20', display: 'flex', alignItems: 'center', gap: 6 }}>
                                 {m.name}
                                 <button onClick={() => setPreviewMerchant(m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F7D4A', padding: '0 4px' }} title="Ver Card">
                                   <Eye size={16} />
                                 </button>
                               </div>
                               <div style={{ fontSize: '0.75rem', color: '#B2AC88' }}>{m.locations?.[0]?.locality || 'Sin localidad'}</div>
                             </td>
                             <td style={{ padding: '1.2rem' }}>
                               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5F7D4A' }}>{m.type}</span>
                             </td>
                             <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                               <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                 <ContactDropdown merchant={m} platform="wzp" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                                 <ContactDropdown merchant={m} platform="ig" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                                 <ContactDropdown merchant={m} platform="email" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                               </div>
                             </td>
                             <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                                <select 
                                  value={m.contact_status || 'sin_contacto'} 
                                  onChange={(e) => updateContactStatus(m.id, e.target.value)}
                                  style={{ padding: '8px', borderRadius: '10px', border: '1.5px solid #F0F4ED', fontSize: '0.75rem', fontWeight: 900, color: '#5F7D4A' }}
                                >
                                  <option value="sin_contacto">SIN CONTACTO</option>
                                  <option value="contactado">CONTACTADO</option>
                                  <option value="en_proceso">EN PROCESO</option>
                                  <option value="oficializado">OFICIALIZADO</option>
                                  <option value="negado">NEGADO</option>
                                </select>
                             </td>
                           </tr>
                         );
                       })}
                       {filteredMerchants.filter(m => !m.claimed).length === 0 && (
                         <tr><td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: '#B2AC88', fontWeight: 800 }}>No hay comercios pendientes de oficialización.</td></tr>
                       )}
                     </tbody>
                   </table>
                 </div>
               ) : crmView === 'kanban' ? (
                  <>
                    <CrmBoard
                      merchants={filteredMerchants.filter(m => !m.claimed)}
                      crmTemplate={crmTemplate}
                      updateContactStatus={updateContactStatus}
                      onPreviewCard={setPreviewMerchant}
                      onEditCard={(m) => { setReviewMerchant(m); setReviewIndex(0); }}
                    />
                    {reviewMerchant && (
                      <MerchantReviewModal
                        merchant={reviewMerchant}
                        onClose={() => setReviewMerchant(null)}
                        onSave={handleReviewSave as any}
                        onUpdateContactStatus={updateContactStatus}
                        crmTemplate={crmTemplate}
                      />
                    )}
                  </>
               ) : (() => {
                  const PROVINCE_ORDER: Record<string, number> = { 'Buenos Aires': 0, 'CABA': 1, 'Ciudad Autónoma de Buenos Aires': 1 };
                  const reviewMerchants = [...filteredMerchants]
                    .filter(m => {
                      if (crmFilterStatus !== 'all' && (m.contact_status || 'sin_contacto') !== crmFilterStatus) return false;
                      if (crmFilterReviewed === 'pending' && (m as any).admin_reviewed) return false;
                      if (crmFilterReviewed === 'reviewed' && !(m as any).admin_reviewed) return false;
                      return true;
                    })
                    .sort((a, b) => {
                      if (crmSortBy === 'sin_tags') return ((a as any).tags?.length || 0) - ((b as any).tags?.length || 0);
                      if (crmSortBy === 'nombre') return a.name.localeCompare(b.name);
                      const aProv = a.province || 'ZZZ';
                      const bProv = b.province || 'ZZZ';
                      const aOrder = PROVINCE_ORDER[aProv] ?? 99;
                      const bOrder = PROVINCE_ORDER[bProv] ?? 99;
                      if (aOrder !== bOrder) return aOrder - bOrder;
                      if (aProv !== bProv) return aProv.localeCompare(bProv);
                      return (a.locations?.[0]?.locality || '').localeCompare(b.locations?.[0]?.locality || '');
                    });
                  const reviewStats = {
                    revisados: merchants.filter(m => (m as any).admin_reviewed).length,
                    pendientes: merchants.filter(m => !(m as any).admin_reviewed).length,
                    sinContacto: merchants.filter(m => (m.contact_status || 'sin_contacto') === 'sin_contacto').length,
                    contactados: merchants.filter(m => m.contact_status === 'contactado').length,
                    enProceso: merchants.filter(m => m.contact_status === 'en_proceso').length,
                    oficializados: merchants.filter(m => m.contact_status === 'oficializado').length,
                    negados: merchants.filter(m => m.contact_status === 'negado').length,
                  };
                  return (
                    <div>
                      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E4EBDD', padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#5F7D4A' }}>{reviewStats.revisados} / {merchants.length} revisados</span>
                            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{Math.round((reviewStats.revisados / Math.max(merchants.length, 1)) * 100)}%</span>
                          </div>
                          <div style={{ height: '6px', background: '#E4EBDD', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.round((reviewStats.revisados / Math.max(merchants.length, 1)) * 100)}%`, background: '#5F7D4A', borderRadius: '4px' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {[
                            { label: 'Sin contacto', value: reviewStats.sinContacto, color: '#9CA3AF' },
                            { label: 'Contactados', value: reviewStats.contactados, color: '#3B82F6' },
                            { label: 'En proceso', value: reviewStats.enProceso, color: '#F59E0B' },
                            { label: 'Oficializados', value: reviewStats.oficializados, color: '#10B981' },
                            { label: 'Negados', value: reviewStats.negados, color: '#EF4444' },
                          ].map(s => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '1rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                              <div style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 700 }}>{s.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <select value={crmFilterStatus} onChange={e => setCrmFilterStatus(e.target.value)} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #E4EBDD', fontSize: '0.82rem', fontWeight: 800, color: '#2D3A20' }}>
                          <option value="all">Todos los estados</option>
                          <option value="sin_contacto">Sin contacto</option>
                          <option value="contactado">Contactado</option>
                          <option value="en_proceso">En proceso</option>
                          <option value="oficializado">Oficializado</option>
                          <option value="negado">Negado</option>
                        </select>
                        <select value={crmFilterReviewed} onChange={e => setCrmFilterReviewed(e.target.value)} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #E4EBDD', fontSize: '0.82rem', fontWeight: 800, color: '#2D3A20' }}>
                          <option value="all">Revisados y pendientes</option>
                          <option value="pending">Solo pendientes de revisión</option>
                          <option value="reviewed">Solo ya revisados</option>
                        </select>
                        <select value={crmSortBy} onChange={e => setCrmSortBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #E4EBDD', fontSize: '0.82rem', fontWeight: 800, color: '#2D3A20' }}>
                          <option value="default">Ordenar: Buenos Aires primero</option>
                          <option value="sin_tags">Sin tags primero</option>
                          <option value="nombre">Nombre A-Z</option>
                        </select>
                      </div>
                      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E4EBDD', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: '#F8F9F5', borderBottom: '2px solid #E4EBDD' }}>
                              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20' }}>COMERCIO</th>
                              <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20' }}>INFO</th>
                              <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20' }}>TAGS</th>
                              <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20' }}>ESTADO</th>
                              <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20' }}>REVISADO</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reviewMerchants.map((m, idx) => {
                              const hasIg = !!m.instagram_url;
                              const hasWeb = !!m.website_url;
                              const hasWzp = !!(m.whatsapp || m.phone);
                              const hasDesc = !!m.bio_short;
                              const tagCount = (m as any).tags?.length || 0;
                              const tagColor = tagCount === 0 ? '#EF4444' : tagCount <= 2 ? '#F59E0B' : '#10B981';
                              const isReviewed = !!(m as any).admin_reviewed;
                              const statusColors: Record<string, string> = { sin_contacto: '#9CA3AF', contactado: '#3B82F6', en_proceso: '#F59E0B', oficializado: '#10B981', negado: '#EF4444' };
                              const cs = m.contact_status || 'sin_contacto';
                              return (
                                <tr
                                  key={m.id}
                                  onClick={() => { setReviewMerchant(m); setReviewIndex(idx); }}
                                  style={{ borderBottom: '1px solid #F0F4ED', cursor: 'pointer', transition: 'background 0.15s' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = '#F8F9F5')}
                                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                  <td style={{ padding: '0.75rem 1rem' }}>
                                    <div style={{ fontWeight: 800, color: '#2D3A20', fontSize: '0.85rem' }}>{m.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{m.type} · {m.locations?.[0]?.locality || m.province || ''}</div>
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <span title="IG · Web · WZP · Desc" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                                      {hasIg ? '✅' : '❌'}{hasWeb ? '✅' : '❌'}{hasWzp ? '✅' : '❌'}{hasDesc ? '✅' : '❌'}
                                    </span>
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <span style={{ background: tagColor + '22', color: tagColor, fontWeight: 900, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px' }}>{tagCount}</span>
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <span style={{ background: (statusColors[cs] || '#9CA3AF') + '22', color: statusColors[cs] || '#9CA3AF', fontWeight: 800, fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', whiteSpace: 'nowrap' }}>{cs.replace('_', ' ')}</span>
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    {isReviewed ? <span style={{ color: '#10B981', fontSize: '0.85rem' }}>✓</span> : <span style={{ color: '#E4EBDD', fontSize: '0.85rem' }}>○</span>}
                                  </td>
                                </tr>
                              );
                            })}
                            {reviewMerchants.length === 0 && (
                              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#B2AC88', fontWeight: 800 }}>No hay comercios con estos filtros.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {reviewMerchant && (
                        <MerchantReviewModal
                          merchant={reviewMerchant}
                          onClose={() => setReviewMerchant(null)}
                          onSave={handleReviewSave as any}
                          onNext={() => {
                            const nextIdx = reviewIndex + 1;
                            if (nextIdx < reviewMerchants.length) { setReviewMerchant(reviewMerchants[nextIdx]); setReviewIndex(nextIdx); }
                            else setReviewMerchant(null);
                          }}
                          onPrev={() => {
                            const prevIdx = reviewIndex - 1;
                            if (prevIdx >= 0) { setReviewMerchant(reviewMerchants[prevIdx]); setReviewIndex(prevIdx); }
                          }}
                          currentIndex={reviewIndex}
                          totalCount={reviewMerchants.length}
                          stats={reviewStats}
                          onUpdateContactStatus={updateContactStatus}
                          crmTemplate={crmTemplate}
                        />
                      )}
                    </div>
                  );
               })()}

               {showTemplateEditor && (
                 <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '90%', maxWidth: '600px' }}>
                     <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem' }}>Editar Plantilla de Mensaje</h3>
                     <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Usa <strong>{'{LINK}'}</strong> para insertar automáticamente el enlace personalizado del comercio. Usa <strong>%0A</strong> para saltos de línea en WhatsApp.</p>
                     <textarea 
                       value={crmTemplate} 
                       onChange={(e) => setCrmTemplate(e.target.value)}
                       style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '12px', border: '1px solid #E4EBDD', marginBottom: '1rem', fontFamily: 'inherit' }}
                     />
                     <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                       <button onClick={() => setShowTemplateEditor(false)} style={{ padding: '10px 20px', border: 'none', background: '#eee', borderRadius: '12px', cursor: 'pointer', fontWeight: 900 }}>Cancelar</button>
                       <button onClick={() => handleSaveTemplate(crmTemplate)} style={{ padding: '10px 20px', border: 'none', background: '#5F7D4A', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 900 }}>Guardar Cambios</button>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          ) : activeTab === 'mensajes' ? (
             <MessagesTab
               messages={messages}
               onMarkAsRead={markAsRead}
             />
          ) : activeTab === 'categorias' ? (
            <div style={{ padding: '2rem' }}>
              <CategoriesTab />
            </div>
          ) : (
             <div style={{ padding: '40px', textAlign: 'center', color: '#B2AC88', fontWeight: 800 }}>
               Selecciona una pestaña para comenzar.
             </div>
          )}
        </div>
      </main>

      {previewMerchant && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 1000, padding: '20px' }}>
           <div style={{ position: 'relative', width: '100%', maxWidth: '500px', background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #F0F4ED', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 1000, color: '#2D3A20', margin: 0 }}>{previewMerchant.name}</h2>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#5F7D4A', background: '#F0F4ED', padding: '2px 8px', borderRadius: '12px' }}>{previewMerchant.type}</span>
                </div>
                <button onClick={() => setPreviewMerchant(null)} style={{ background: '#F8F9F5', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: '#666' }}>
                  <X size={20} />
                </button>
              </div>

              {previewMerchant.bio && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '4px' }}>Bio</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>{previewMerchant.bio}</p>
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '8px' }}>Contacto Disponible (Haz clic para editar)</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: previewMerchant.whatsapp || previewMerchant.phone ? '#E8F5E9' : '#F8F9F5', padding: '10px', borderRadius: '12px' }}>
                    <MessageCircle size={18} color={previewMerchant.whatsapp || previewMerchant.phone ? '#25D366' : '#CCC'} />
                    <input 
                      type="text"
                      defaultValue={previewMerchant.whatsapp || previewMerchant.phone || ''}
                      placeholder="Agregar Teléfono/WhatsApp"
                      onBlur={async (e) => {
                        const val = e.target.value;
                        if (val !== (previewMerchant.whatsapp || previewMerchant.phone || '')) {
                          const { error } = await supabase.from('merchants').update({ whatsapp: val, phone: val }).eq('id', previewMerchant.id);
                          if (!error) {
                            setPreviewMerchant({ ...previewMerchant, whatsapp: val, phone: val });
                            setMerchants(prev => prev.map(m => m.id === previewMerchant.id ? { ...m, whatsapp: val, phone: val } : m));
                          } else {
                            alert('Error al guardar Teléfono/WhatsApp: ' + error.message);
                          }
                        }
                      }}
                      style={{ fontSize: '0.9rem', fontWeight: 800, color: previewMerchant.whatsapp || previewMerchant.phone ? '#2D3A20' : '#888', background: 'transparent', border: 'none', outline: 'none', width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: previewMerchant.instagram_url ? '#FCE4EC' : '#F8F9F5', padding: '10px', borderRadius: '12px' }}>
                    <Instagram size={18} color={previewMerchant.instagram_url ? '#E1306C' : '#CCC'} />
                    <input 
                      type="text"
                      defaultValue={previewMerchant.instagram_url || ''}
                      placeholder="Agregar Instagram URL"
                      onBlur={async (e) => {
                        const val = e.target.value;
                        if (val !== (previewMerchant.instagram_url || '')) {
                          const { error } = await supabase.from('merchants').update({ instagram_url: val }).eq('id', previewMerchant.id);
                          if (!error) {
                            setPreviewMerchant({ ...previewMerchant, instagram_url: val });
                            setMerchants(prev => prev.map(m => m.id === previewMerchant.id ? { ...m, instagram_url: val } : m));
                          } else {
                            alert('Error al guardar Instagram: ' + error.message);
                          }
                        }
                      }}
                      style={{ fontSize: '0.9rem', fontWeight: 800, color: previewMerchant.instagram_url ? '#2D3A20' : '#888', background: 'transparent', border: 'none', outline: 'none', width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: previewMerchant.email ? '#F0F4ED' : '#F8F9F5', padding: '10px', borderRadius: '12px' }}>
                    <Mail size={18} color={previewMerchant.email ? '#5F7D4A' : '#CCC'} />
                    <input 
                      type="email"
                      defaultValue={previewMerchant.email || ''}
                      placeholder="Agregar Email"
                      onBlur={async (e) => {
                        const val = e.target.value;
                        if (val !== (previewMerchant.email || '')) {
                          const { error } = await supabase.from('merchants').update({ email: val }).eq('id', previewMerchant.id);
                          if (!error) {
                            setPreviewMerchant({ ...previewMerchant, email: val });
                            setMerchants(prev => prev.map(m => m.id === previewMerchant.id ? { ...m, email: val } : m));
                          } else {
                            alert('Error al guardar Email: ' + error.message);
                          }
                        }
                      }}
                      style={{ fontSize: '0.9rem', fontWeight: 800, color: previewMerchant.email ? '#2D3A20' : '#888', background: 'transparent', border: 'none', outline: 'none', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '8px' }}>Ubicación</h4>
                {previewMerchant.locations && previewMerchant.locations.length > 0 ? (
                  <div style={{ background: '#F8F9F5', padding: '10px', borderRadius: '12px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#666' }}>{previewMerchant.locations[0].address || previewMerchant.locations[0].locality}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#999' }}>{previewMerchant.locations[0].province}, {previewMerchant.locations[0].country}</p>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.9rem', color: '#CCC', fontWeight: 800, margin: 0 }}>Sin ubicación registrada</p>
                )}
              </div>
           </div>
        </div>
      )}

      {showEditModal && editingMerchant && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 32, width: '90%', maxWidth: 800, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{fontWeight:1000, color:'#2D3A20'}}>Editar {editingMerchant.name}</h2>
            <div style={{display:'grid', gap:20, marginTop:20}}>
              <div><label style={LabelStyle}>Nombre</label><input style={InputStyle} value={editingMerchant.name} onChange={(e)=>setEditingMerchant({...editingMerchant, name: e.target.value})} /></div>
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Status</label>
                  <select style={InputStyle} value={editingMerchant.status} onChange={(e)=>setEditingMerchant({...editingMerchant, status: e.target.value})}>
                    <option value="active">Active</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
                  </select>
                </div>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Rubro</label>
                  <input style={InputStyle} value={editingMerchant.type || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, type: e.target.value})} />
                </div>
              </div>
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>País</label>
                  <input 
                    style={InputStyle} 
                    value={editingMerchant.locations?.[0]?.country || ''} 
                    onChange={(e)=>{
                      const locs = [...(editingMerchant.locations || [{ id: '', country: '', province: '' } as any])];
                      locs[0] = { ...locs[0], country: e.target.value };
                      setEditingMerchant({...editingMerchant, locations: locs as any});
                    }} 
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Provincia</label>
                  <input 
                    style={InputStyle} 
                    value={editingMerchant.locations?.[0]?.province || ''} 
                    onChange={(e)=>{
                      const locs = [...(editingMerchant.locations || [{ id: '', country: '', province: '' } as any])];
                      locs[0] = { ...locs[0], province: e.target.value };
                      setEditingMerchant({...editingMerchant, locations: locs as any});
                    }} 
                  />
                </div>
              </div>
              <div>
                <label style={LabelStyle}>Ubicación Google Maps (URL)</label>
                <input style={InputStyle} value={editingMerchant.google_maps_url || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, google_maps_url: e.target.value})} />
              </div>
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Teléfono (Llamadas)</label>
                  <input style={InputStyle} value={editingMerchant.phone || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, phone: e.target.value})} />
                </div>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>WhatsApp</label>
                  <input style={InputStyle} value={editingMerchant.whatsapp || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, whatsapp: e.target.value})} />
                </div>
              </div>
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Horarios de Atención</label>
                  <input style={InputStyle} value={editingMerchant.working_hours || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, working_hours: e.target.value})} placeholder="Ej: Lun a Vie 9 a 18hs" />
                </div>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>¿Cómo hacer el pedido?</label>
                  <input style={InputStyle} value={editingMerchant.order_instructions || ''} onChange={(e)=>setEditingMerchant({...editingMerchant, order_instructions: e.target.value})} placeholder="Ej: Link a Forms o 'Escribir por IG'" />
                </div>
              </div>
              <div>
                <label style={LabelStyle}>Productos / Bio Corta</label>
                <textarea 
                  style={{...InputStyle, minHeight: '60px', resize: 'vertical'}} 
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
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Instagram URL</label>
                  <input 
                    style={InputStyle} 
                    value={editingMerchant.instagram_url || ''} 
                    onChange={(e)=>setEditingMerchant({...editingMerchant, instagram_url: e.target.value})} 
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={LabelStyle}>Página Web URL</label>
                  <input 
                    style={InputStyle} 
                    value={editingMerchant.website_url || ''} 
                    onChange={(e)=>setEditingMerchant({...editingMerchant, website_url: e.target.value})} 
                  />
                </div>
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
          data={filteredMerchants} 
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

function KPICard({ label, value, trend, icon, children }: any) {
  return (
    <div style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ background: '#F0F4ED', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <span style={{ fontSize: '0.65rem', fontWeight: 1000, color: '#5F7D4A', background: '#F0F4ED', padding: '4px 8px', borderRadius: '8px' }}>{trend}</span>
      </div>
      <div>
        <div style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.65rem', fontWeight: '900', color: '#B2AC88', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
      </div>
      {children && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F0F4ED', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, color = '#5F7D4A' }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
       <span style={{ fontSize: '0.55rem', fontWeight: 1000, color: '#B2AC88', textTransform: 'uppercase' }}>{label}</span>
       <span style={{ fontSize: '0.8rem', fontWeight: 1000, color: color }}>{value}</span>
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
