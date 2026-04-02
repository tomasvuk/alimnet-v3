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
  Star
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
  owner_id?: string | null;
  province?: string;
  validationsCount?: number;
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

      // Mapeamos los usuarios con valores por defecto para actividad ya que quitamos los counts complejos
      const processedUsers = (data || []).map(u => {
        return {
          ...u,
          v_count: 0, f_count: 0, s_count: 0, m_count: 0,
          activity: 10 // Valor base de actividad
        };
      });
      
      setUsers(processedUsers);
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

      // 3. MESSAGES
      const { data: msgData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages(msgData || []);

      // 4. STATS
      const { count: mCount } = await supabase.from('merchants').select('id', { count: 'exact', head: true }).eq('status', 'active');
      const { count: lCount } = await supabase.from('locations').select('id', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('merchants').select('id', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: uCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true });

      setStats({
        totalMerchants: mCount || 0,
        totalLocations: lCount || 0,
        pendingApprovals: pCount || 0,
        totalUsers: uCount || 0
      });
      
      // Load initial batch
      await fetchUsers();
      
    } catch (err: any) {
      console.error("Global fetch error:", err);
      setError(err.message || "Error al cargar datos");
    }
    setLoading(false);
  };

  const handleImport = async () => {
    if (!importText) return;
    setIsImporting(true);
    const rows = importText.split('\n').filter(r => r.trim());
    if (rows.length < 2) { alert('Mínimo 2 filas.'); setIsImporting(false); return; }
    const headers = rows[0].split('\t').map(h => h.trim().toLowerCase());
    const dataRows = rows.slice(1);
    let count = 0;
    for (const r of dataRows) {
      const v = r.split('\t');
      const row: any = {};
      headers.forEach((h, i) => row[h] = v[i]?.trim());
      const name = row['nombre'] || row['nombre del emprendimiento'];
      if (!name) continue;
      try {
        const { data: m } = await supabase.from('merchants').insert({ name, status: 'active' }).select().single();
        if (m && row['provincia']) await supabase.from('locations').insert({ merchant_id: m.id, province: row['provincia'], location_type: 'fixed', lat: -34.6, lng: -58.4 });
        count++;
      } catch (e) {}
    }
    alert(`${count} cargados.`);
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
      status: editingMerchant.status
    }).eq('id', editingMerchant.id);
    if (!error) { setShowEditModal(false); fetchData(); }
    setIsSaving(false);
  };

  const filteredMerchants = merchants.filter(m => {
    const s = searchTerm.toLowerCase();
    const matchSearch = (m.name || '').toLowerCase().includes(s) || (m.type || '').toLowerCase().includes(s);
    const matchProv = filterProvince === 'all' || m.province === filterProvince;
    const matchType = filterType === 'all' || m.type === filterType;
    const matchVer = filterVerification === 'all' || 
                    (filterVerification === 'verified' && (m.verified || m.owner_id)) ||
                    (filterVerification === 'unverified' && !m.verified && !m.owner_id);
    return matchSearch && matchProv && matchType && matchVer;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px', fontFamily: 'Manrope, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}><ShieldCheck size={18} /> Central Admin</div>
            <h1 style={{ fontSize: '2.85rem', fontWeight: '1000', color: '#2D3A20', margin: 0 }}>Alimnet Central Report</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setShowImportModal(true)} style={{ padding: '0.9rem 1.8rem', background: '#5F7D4A', borderRadius: '16px', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer' }}>+ Importar Excel</button>
          </div>
        </div>

        {error && <div style={{background:'#FEE2E2', color:'#991B1B', padding:20, borderRadius:15, marginBottom:40, fontWeight:800}}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          <KPICard label="Comercios" value={stats.totalMerchants} trend="Activos" icon={<Store size={22} />} />
          <KPICard label="Puntos" value={stats.totalLocations} trend="En Mapa" icon={<MapPin size={22} />} />
          <KPICard label="Por Aprobar" value={stats.pendingApprovals} trend="Nuevos" icon={<Clock size={22} />} />
          <KPICard label="Usuarios" value={stats.totalUsers} trend="Registrados" icon={<Users size={22} />} />
        </div>

        <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.04)', border: '1px solid #E4EBDD' }}>
          <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #F0F4ED', marginBottom: '2.5rem', overflowX: 'auto' }}>
            <TabItem active={activeTab === 'comercios'} label="Comercios" onClick={() => setActiveTab('comercios')} count={merchants.length} />
            <TabItem active={activeTab === 'pendientes'} label="Por Aprobar" onClick={() => setActiveTab('pendientes')} count={stats.pendingApprovals} />
            <TabItem active={activeTab === 'usuarios'} label="Usuarios" onClick={() => { setActiveTab('usuarios'); fetchUsers(); }} count={stats.totalUsers} />
            <TabItem active={activeTab === 'mensajes'} label="Mensajes" onClick={() => setActiveTab('mensajes')} count={messages.filter(m => m.status === 'unread').length} />
            <TabItem active={activeTab === 'pagos'} label="Pagos" onClick={() => { setActiveTab('pagos'); fetchDonations(); }} />
          </div>

          {activeTab === 'usuarios' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={THStyle}>USUARIO</th>
                    <th style={THStyle}>ROL</th>
                    <th style={THStyle}>LOCALIDAD</th>
                    <th style={THStyle}>ACTIVIDAD</th>
                    <th style={THStyle}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? <tr><td colSpan={5} style={{padding:40, textAlign:'center'}}>Cargando...</td></tr> : users.map(u => (
                    <tr key={u.id} style={{borderBottom:'1px solid #F0F4ED'}}>
                      <td style={{padding:20}}>
                        <div style={{fontWeight:1000, color:'#2D3A20'}}>{u.full_name || 'Sin Nombre'}</div>
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
          ) : activeTab === 'mensajes' ? (
            <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead><tr><th style={THStyle}>FECHA</th><th style={THStyle}>REMITENTE</th><th style={THStyle}>ASUNTO</th><th style={THStyle}>ESTADO</th></tr></thead>
                 <tbody>
                   {messages.map(m => (
                     <tr key={m.id} style={{ borderBottom: '1px solid #F0F4ED' }}>
                       <td style={{ padding: 20, fontSize: '0.75rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                       <td style={{ padding: 20 }}>
                          <div style={{fontWeight:900}}>{m.sender_name}</div>
                          <div style={{fontSize:'0.7rem', color:'#888'}}>{m.sender_email}</div>
                       </td>
                       <td style={{ padding: 20, fontWeight:700 }}>{m.subject}</td>
                       <td style={{ padding: 20 }}><span style={{...BadgeStyle, background:'#F0F4ED'}}>{m.status.toUpperCase()}</span></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '1 1 300px' }}>
                  <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} size={18} />
                  <input type="text" placeholder="Buscar comercio o rubro..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} style={{ width: '100%', padding: '1rem 3.5rem', borderRadius: 20, border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: 800 }} />
                </div>
                <select value={filterProvince} onChange={(e)=>setFilterProvince(e.target.value)} style={FilterSelectStyle}>
                  <option value="all">Todas las Provincias</option>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={filterVerification} onChange={(e)=>setFilterVerification(e.target.value)} style={FilterSelectStyle}>
                  <option value="all">Filtro Sello</option>
                  <option value="verified">✅ Verificados Oficiales</option>
                  <option value="unverified">🔸 Comunitarios</option>
                </select>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={THStyle}>COMERCIO</th>
                      <th style={THStyle}>PROVINCIA</th>
                      <th style={THStyle}>ESTADO</th>
                      <th style={THStyle}>CONTACTO</th>
                      <th style={THStyle}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === 'pendientes' ? merchants.filter(m => m.status === 'pending') : filteredMerchants).map(m => (
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
                    ))}
                    {merchants.length === 0 && !loading && (
                       <tr><td colSpan={5} style={{padding:80, textAlign:'center', color:'#B2AC88'}}>No se encontraron comercios.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
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
              <div style={{display:'flex', gap:10}}>
                <button onClick={handleUpdateMerchant} style={{flex:1, padding:15, background:'#5F7D4A', color:'white', border:'none', borderRadius:12, fontWeight:900}}>Guardar</button>
                <button onClick={()=>setShowEditModal(false)} style={{flex:1, padding:15, background:'#F0F4ED', border:'none', borderRadius:12, fontWeight:900}}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 32, width: '80%', maxWidth: 600 }}>
            <h3>Importar Excel</h3>
            <textarea value={importText} onChange={(e)=>setImportText(e.target.value)} style={{width:'100%', height:200, marginTop:20, borderRadius:15, padding:15}} placeholder="Pega columnas aquí..."/>
            <div style={{display:'flex', gap:10, marginTop:20}}>
              <button onClick={handleImport} disabled={isImporting} style={{flex:1, padding:15, background:'#5F7D4A', color:'white', border:'none', borderRadius:12, fontWeight:900}}>Importar</button>
              <button onClick={()=>setShowImportModal(false)} style={{flex:1, padding:15, background:'#F0F4ED', border:'none', borderRadius:12, fontWeight:900}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
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

function TabItem({ active, label, onClick, count }: any) {
  return (
    <div onClick={onClick} style={{ padding: '1rem 0', cursor: 'pointer', borderBottom: active ? '3px solid #5F7D4A' : '3px solid transparent', color: active ? '#2D3A20' : '#B2AC88', fontWeight: 950, display: 'flex', gap: 8 }}>
      {label} {count !== undefined && <span style={{fontSize:10, background:'#F0F4ED', padding:'2px 6px', borderRadius:6}}>{count}</span>}
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

function MerchantRow({ merchant, expanded, toggle, onUpdateStatus, onUpdateContactStatus, onToggleVerified, onOpenEdit }: any) {
  const missing = [];
  if (!merchant.instagram_url) missing.push('Insta');
  if (!merchant.type) missing.push('Tipo');

  return (
    <>
      <tr onClick={toggle} style={{ borderBottom: '1px solid #F0F4ED', cursor: 'pointer', background: merchant.verified ? '#FDFAF0' : 'white' }}>
        <td style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 1000 }}>{merchant.name}</span>
            {(merchant.verified || merchant.owner_id) ? (
              <ShieldCheck size={16} color="#A67C00" style={{transform:'rotate(-5deg)'}} />
            ) : (
              <span style={{fontSize:10, color:'#B45309', background:'#FEF3C7', padding:'2px 6px', borderRadius:4}}>COMUNITARIO</span>
            )}
          </div>
          {missing.length > 0 && <div style={{fontSize:10, color:'#EF4444', fontWeight:900, marginTop:4}}>FALTA: {missing.join(', ')}</div>}
        </td>
        <td style={{ padding: 20, color:'#888', fontWeight:800 }}>{merchant.province || 'No def.'}</td>
        <td style={{ padding: 20 }}>
          <span style={{ ...BadgeStyle, background: merchant.status === 'active' ? '#DCFCE7' : '#FEE2E2', color: merchant.status === 'active' ? '#166534' : '#991B1B' }}>{merchant.status.toUpperCase()}</span>
        </td>
        <td style={{ padding: 20 }}>
          <select value={merchant.contact_status || 'sin_contacto'} onChange={(e)=>{ e.stopPropagation(); onUpdateContactStatus(merchant.id, e.target.value); }} style={{padding:6, borderRadius:8, border:'1px solid #E4EBDD', fontSize:11, fontWeight:900}}>
            <option value="sin_contacto">SIN CONTACTO</option>
            <option value="contactado">CONTACTADO</option>
            <option value="verificado">VERIFICADO</option>
          </select>
        </td>
        <td style={{ padding: 20 }}>
          <div style={{display:'flex', gap:10}}>
            <button onClick={(e)=>{ e.stopPropagation(); onOpenEdit(merchant); }} style={{background:'none', border:'none', color:'#5F7D4A'}}><Edit size={18}/></button>
            {expanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} style={{ padding: 40, background: '#F8F9F5' }}>
            <div style={{ display: 'flex', gap: 40 }}>
               <div style={{flex: 1}}>
                 <h4 style={{fontWeight:1000, marginBottom:15}}>Análisis de Comercio</h4>
                 <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                    <div>
                        <div style={StatLabel}>Validaciones</div>
                        <div style={{fontSize:'1.8rem', fontWeight:1000, color:'#A67C00'}}>{merchant.validation_count || 0}</div>
                    </div>
                 </div>
               </div>
               <div style={{width:200, display:'flex', flexDirection:'column', gap:10}}>
                  <button onClick={()=>onUpdateStatus(merchant.id, 'active')} style={{padding:12, background:'#5F7D4A', color:'white', border:'none', borderRadius:10, fontWeight:1000, cursor:'pointer'}}>APROBAR</button>
                  <button onClick={()=>onUpdateStatus(merchant.id, 'rejected')} style={{padding:12, background:'white', color:'#EF4444', border:'1px solid #EF4444', borderRadius:10, fontWeight:1000, cursor:'pointer'}}>RECHAZAR</button>
                  <button onClick={()=>onToggleVerified(merchant.id, merchant.verified)} style={{padding:12, background:'#A67C00', color:'white', border:'none', borderRadius:10, fontWeight:1000, cursor:'pointer'}}>{merchant.verified ? 'QUITAR SELLO' : 'DAR SELLO OFICIAL'}</button>
               </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function DonationsList({ donations, loading }: any) {
    if (loading) return <div>Cargando donaciones...</div>;
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={THStyle}>FECHA</th><th style={THStyle}>MONTO</th><th style={THStyle}>ESTADO</th></tr></thead>
            <tbody>
                {donations.map((d: any) => (
                    <tr key={d.id} style={{borderBottom:'1px solid #F0F4ED'}}>
                        <td style={{padding:20}}>{new Date(d.created_at).toLocaleDateString()}</td>
                        <td style={{padding:20, fontWeight:1000}}>{d.currency} ${d.amount}</td>
                        <td style={{padding:20}}>{d.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const THStyle = { padding: '1.2rem 1rem', fontSize: '0.75rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' as const, textAlign: 'left' as const };
const BadgeStyle = { padding: '6px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '1000' };
const LabelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase' as const, marginBottom: '6px' };
const InputStyle = { width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '700' };
const FilterSelectStyle = { padding: '0.9rem 1.2rem', borderRadius: '20px', border: '1.5px solid #F0F4ED', background: 'white', fontWeight: '1000', outline: 'none', cursor: 'pointer', color:'#2D3A20' };
const StatLabel = { fontSize: '0.7rem', fontWeight: 1000, color: '#B2AC88', textTransform: 'uppercase' as const };
