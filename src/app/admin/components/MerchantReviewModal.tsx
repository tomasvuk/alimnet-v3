'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Instagram, Mail, Keyboard, Sparkles, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import DeliveryZonesSection from './DeliveryZonesSection';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Merchant {
  id: string;
  name: string;
  type: string;
  status: string;
  verified: boolean;
  claimed: boolean;
  contact_status: string;
  admin_notes?: string | null;
  instagram_url?: string | null;
  website_url?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  google_maps_url?: string | null;
  bio_short?: string | null;
  delivery_info?: string | null;
  tags?: string[];
  delivery_zone_ids?: string[];
  locations?: { locality?: string; province?: string }[];
  email?: string | null;
  admin_reviewed?: boolean;
  review_no_changes?: boolean;
}

interface TagCategory {
  id: string;
  name: string;
  slug: string;
  tags: string[];
  sort_order?: number;
}

interface MerchantReviewModalProps {
  merchant: Merchant | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Merchant>) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
  stats?: {
    revisados: number;
    pendientes: number;
    sinContacto: number;
    contactados: number;
    enProceso: number;
    oficializados: number;
    negados: number;
  };
  onUpdateContactStatus: (id: string, status: string) => void;
  crmTemplate?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTACT_STATUSES = [
  { id: 'sin_contacto', label: 'Sin Contacto', color: '#9CA3AF' },
  { id: 'contactado', label: 'Contactado', color: '#3B82F6' },
  { id: 'en_proceso', label: 'En Proceso', color: '#F59E0B' },
  { id: 'oficializado', label: 'Oficializado', color: '#10B981' },
  { id: 'negado', label: 'Negado', color: '#EF4444' },
];

const CHEATSHEET = [
  ['⌘K', 'Sugerir tags con IA'],
  ['⌘⇧W', 'Copiar WhatsApp/Tel'],
  ['⌘⇧M', 'Copiar mensaje CRM'],
  ['⌘→', 'Siguiente'],
  ['⌘←', 'Anterior'],
  ['⌘↵', 'Guardar y avanzar'],
  ['⌘⇧N', 'Sin cambios y avanzar'],
  ['Esc', 'Cerrar'],
];

// ---------------------------------------------------------------------------
// Helper: field indicator
// ---------------------------------------------------------------------------

function FieldIndicator({ value }: { value: string | null | undefined }) {
  return (
    <span style={{ fontSize: '0.75rem' }} title={value ? 'Con valor' : 'Sin valor'}>
      {value ? '✅' : '❌'}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MerchantReviewModal({
  merchant,
  onClose,
  onSave,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  stats,
  onUpdateContactStatus,
  crmTemplate = '',
}: MerchantReviewModalProps) {
  const [edits, setEdits] = useState<Partial<Merchant>>({});
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [deliveryZoneIds, setDeliveryZoneIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'tags' | 'crm'>('info');
  const [toast, setToast] = useState<string | null>(null);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [adminNotesLocal, setAdminNotesLocal] = useState<string>('');
  const cheatsheetRef = useRef<HTMLDivElement>(null);
  const adminNotesRef = useRef<HTMLTextAreaElement>(null);

  // Reset state when merchant changes
  useEffect(() => {
    if (!merchant) return;
    setEdits({});
    setLocalTags(merchant.tags || []);
    setDeliveryZoneIds(merchant.delivery_zone_ids || []);
    setAiSuggestions([]);
    setSelectedSuggestions([]);
    setActiveTab('info');
    setAdminNotesLocal(merchant.admin_notes || '');
  }, [merchant?.id]);

  // Load tag categories and zones once
  useEffect(() => {
    fetch('/api/admin/tag-categories')
      .then((r) => r.json())
      .then((data: TagCategory[]) => setTagCategories(data))
      .catch(() => {});

    fetch('/api/admin/zones')
      .then((r) => r.json())
      .then((data: any[]) => setZones(data))
      .catch(() => {});
  }, []);

  // Toast auto-clear
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  // Close cheatsheet on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cheatsheetRef.current && !cheatsheetRef.current.contains(e.target as Node)) {
        setShowCheatsheet(false);
      }
    };
    if (showCheatsheet) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCheatsheet]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const showToast = (msg: string) => setToast(msg);

  const merged = merchant ? { ...merchant, ...edits } : null;

  const getContact = () => merged?.whatsapp || merged?.phone || '';

  const copyToClipboard = (text: string, label: string) => {
    if (!text) { showToast(`Sin ${label} registrado`); return; }
    navigator.clipboard.writeText(text);
    showToast(`${label} copiado`);
  };

  const getCrmMessage = () => {
    if (!merchant) return '';
    const link = `https://alimnet.com/explorar?id=${merchant.id}`;
    return crmTemplate ? crmTemplate.replace('{{LINK}}', link) : link;
  };

  const getAuthToken = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch {
      return null;
    }
  };

  const handleAdminNotesChange = useCallback((value: string) => {
    setAdminNotesLocal(value);
    setEdits((p) => ({ ...p, admin_notes: value }));
  }, []);

  // ---------------------------------------------------------------------------
  // AI suggest
  // ---------------------------------------------------------------------------

  const triggerSuggestTags = useCallback(async () => {
    if (!merchant || aiLoading) return;
    setAiLoading(true);
    try {
      const token = await getAuthToken();
      const res = await fetch('/api/admin/suggest-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          merchant_id: merchant.id,
          name: merchant.name,
          bio_short: merchant.bio_short,
          instagram_url: merchant.instagram_url,
          locality: merchant.locations?.[0]?.locality || '',
        }),
      });
      const data = await res.json();
      const suggestions: string[] = data.suggested || [];
      setAiSuggestions(suggestions);
      setSelectedSuggestions(suggestions);
      if (!suggestions.length) showToast('Sin info suficiente para sugerir');
    } catch (err) {
      console.error('Suggest tags error:', err);
      showToast('Error al sugerir tags');
    } finally {
      setAiLoading(false);
    }
  }, [merchant, aiLoading]);

  const applySelectedSuggestions = () => {
    const newTags = Array.from(new Set([...localTags, ...selectedSuggestions]));
    setLocalTags(newTags);
    setAiSuggestions([]);
    setSelectedSuggestions([]);
    showToast('Tags aplicados');
  };

  // ---------------------------------------------------------------------------
  // Save actions
  // ---------------------------------------------------------------------------

  const doSave = async (extra: Partial<Merchant> = {}) => {
    if (!merchant) return;
    setSaving(true);
    try {
      await onSave(merchant.id, {
        ...edits,
        tags: localTags,
        delivery_zone_ids: deliveryZoneIds,
        admin_reviewed: true,
        ...extra,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndNext = async () => {
    await doSave();
    onNext?.();
  };

  const handleNoChanges = async () => {
    await doSave({ review_no_changes: true });
    onNext?.();
  };

  // ---------------------------------------------------------------------------
  // Keyboard shortcuts
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!merchant) return;
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) {
        if (e.key === 'Escape') { onClose(); return; }
        return;
      }
      if (e.key === 'k' || e.key === 'K') { e.preventDefault(); triggerSuggestTags(); return; }
      if (e.shiftKey && (e.key === 'W' || e.key === 'w')) {
        e.preventDefault();
        copyToClipboard(getContact(), 'WZP copiado');
        return;
      }
      if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        copyToClipboard(getCrmMessage(), 'Mensaje copiado');
        return;
      }
      if (e.shiftKey && (e.key === 'N' || e.key === 'n')) {
        e.preventDefault();
        handleNoChanges();
        return;
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext?.(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev?.(); return; }
      if (e.key === 'Enter') { e.preventDefault(); handleSaveAndNext(); return; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [merchant, edits, localTags, triggerSuggestTags]);

  // ---------------------------------------------------------------------------
  // Tag helpers
  // ---------------------------------------------------------------------------

  const removeTag = (tag: string) => setLocalTags((prev) => prev.filter((t) => t !== tag));
  const addTag = (tag: string) => {
    if (!localTags.includes(tag)) setLocalTags((prev) => [...prev, tag]);
  };

  // ---------------------------------------------------------------------------
  // Render guards
  // ---------------------------------------------------------------------------

  if (!merchant) return null;

  const locality = merchant.locations?.[0]?.locality || '';
  const hasProgress = currentIndex !== undefined && totalCount !== undefined;
  const progressPct = hasProgress ? Math.round(((currentIndex! + 1) / totalCount!) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Sections
  // ---------------------------------------------------------------------------

  const InfoSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
      {/* Instagram */}
      <FieldRow
        label="Instagram URL"
        value={merged?.instagram_url}
        onChange={(v) => setEdits((p) => ({ ...p, instagram_url: v }))}
        link={merged?.instagram_url || undefined}
        linkLabel="Abrir"
      />
      {/* Website */}
      <FieldRow
        label="Website"
        value={merged?.website_url}
        onChange={(v) => setEdits((p) => ({ ...p, website_url: v }))}
        link={merged?.website_url || undefined}
        linkLabel="Abrir"
      />
      {/* WhatsApp/Phone */}
      <FieldRow
        label="WhatsApp / Teléfono"
        value={merged?.whatsapp || merged?.phone}
        onChange={(v) => setEdits((p) => ({ ...p, whatsapp: v }))}
      />
      {/* Google Maps */}
      <FieldRow
        label="Google Maps URL"
        value={merged?.google_maps_url}
        onChange={(v) => setEdits((p) => ({ ...p, google_maps_url: v }))}
        link={merged?.google_maps_url || undefined}
        linkLabel="Ver mapa"
      />
      {/* Bio — full width */}
      <div style={{ gridColumn: '1 / -1' }}>
        <FieldRow
          label="Descripción"
          value={merged?.bio_short}
          onChange={(v) => setEdits((p) => ({ ...p, bio_short: v }))}
          multiline
          placeholder="Sin descripción"
        />
      </div>
      {/* Delivery — full width */}
      <div style={{ gridColumn: '1 / -1' }}>
        <DeliveryZonesSection
          merchantId={merchant.id}
          initialText={merged?.delivery_info || ''}
          initialZoneIds={deliveryZoneIds}
          onTextChange={(text) => setEdits((p) => ({ ...p, delivery_info: text }))}
          onZonesChange={(zoneIds) => {
            setDeliveryZoneIds(zoneIds);
            setEdits((p) => ({ ...p, delivery_zone_ids: zoneIds }));
          }}
          availableZones={zones}
        />
      </div>
      {/* Admin notes — Custom large textarea */}
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2D3A20', display: 'block', marginBottom: '6px' }}>
          Notas admin (interno)
          <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#B2AC88' }}>
            {adminNotesLocal ? '✅' : '❌'}
          </span>
        </label>
        <textarea
          ref={adminNotesRef}
          value={adminNotesLocal}
          onChange={(e) => handleAdminNotesChange(e.target.value)}
          placeholder="Notas internas..."
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #E4EBDD',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontFamily: 'system-ui',
            color: '#2D3A20',
            background: '#FFFBEB',
            resize: 'vertical',
            maxHeight: '160px',
            overflowY: 'auto',
            minHeight: '120px'
          }}
          rows={5}
        />
      </div>
    </div>
  );

  const TagsSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {/* AI suggest button */}
      <div>
        <button
          onClick={triggerSuggestTags}
          disabled={aiLoading}
          style={{
            padding: '8px 16px',
            background: aiLoading ? '#E4EBDD' : '#2D3A20',
            color: aiLoading ? '#9CA3AF' : 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: aiLoading ? 'not-allowed' : 'pointer',
            fontSize: '0.82rem',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Sparkles size={14} />
          {aiLoading ? 'Analizando...' : 'Sugerir con IA'}
        </button>

        {aiSuggestions.length > 0 && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', fontWeight: 700, color: '#92400E' }}>Sugerencias IA — selecciona las que quieras aplicar:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
              {aiSuggestions.map((tag) => {
                const selected = selectedSuggestions.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedSuggestions((prev) =>
                        selected ? prev.filter((t) => t !== tag) : [...prev, tag]
                      )
                    }
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: `2px solid ${selected ? '#F59E0B' : '#FDE68A'}`,
                      background: selected ? '#FEF3C7' : 'white',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: '#78350F',
                    }}
                  >
                    {selected && <Check size={11} />}
                    {tag}
                  </button>
                );
              })}
            </div>
            <button
              onClick={applySelectedSuggestions}
              style={{
                padding: '6px 14px',
                background: '#F59E0B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              Aplicar seleccionados ({selectedSuggestions.length})
            </button>
          </div>
        )}
      </div>

      {/* Per-category tags */}
      {tagCategories.map((cat) => {
        const catTags = localTags.filter((t) => cat.tags.includes(t));
        const availableToAdd = cat.tags.filter((t) => !localTags.includes(t));
        return (
          <div key={cat.id}>
            <p style={{ margin: '0 0 6px', fontSize: '0.78rem', fontWeight: 900, color: '#2D3A20', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {cat.name}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: availableToAdd.length ? '8px' : 0 }}>
              {catTags.length === 0 && (
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Sin tags asignados</span>
              )}
              {catTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '3px 10px',
                    background: '#E4EBDD',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#2D3A20',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, color: '#5F7D4A', fontWeight: 900, fontSize: '0.85rem' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {availableToAdd.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {availableToAdd.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    style={{
                      padding: '3px 10px',
                      background: 'white',
                      border: '1px dashed #C7D4BE',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#9CA3AF',
                      cursor: 'pointer',
                    }}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const CrmSection = () => {
    const wzpNumber = merged?.whatsapp || merged?.phone;
    const igUrl = merged?.instagram_url;
    const emailAddr = merged?.email;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {/* Contact status */}
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#666', display: 'block', marginBottom: '4px' }}>Estado de contacto</label>
          <select
            value={merged?.contact_status || 'sin_contacto'}
            onChange={(e) => {
              setEdits((p) => ({ ...p, contact_status: e.target.value }));
              onUpdateContactStatus(merchant.id, e.target.value);
            }}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #E4EBDD', fontSize: '0.82rem', fontWeight: 800, color: '#2D3A20', background: '#F8F9F5', fontFamily: 'system-ui' }}
          >
            {CONTACT_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Contact buttons */}
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#666', display: 'block', marginBottom: '8px' }}>Acciones de contacto</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { if (wzpNumber) window.open(`https://wa.me/${wzpNumber}`, '_blank'); else showToast('Sin WhatsApp/teléfono'); }}
              style={{ padding: '8px 14px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: wzpNumber ? 'pointer' : 'not-allowed', fontSize: '0.78rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, opacity: wzpNumber ? 1 : 0.45 }}
            >
              <MessageCircle size={14} /> WZP
            </button>
            <button
              onClick={() => { if (igUrl) window.open(igUrl, '_blank'); else showToast('Sin Instagram'); }}
              style={{ padding: '8px 14px', background: '#E1306C', color: 'white', border: 'none', borderRadius: '8px', cursor: igUrl ? 'pointer' : 'not-allowed', fontSize: '0.78rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, opacity: igUrl ? 1 : 0.45 }}
            >
              <Instagram size={14} /> IG
            </button>
            <button
              onClick={() => { if (emailAddr) window.open(`mailto:${emailAddr}`, '_blank'); else showToast('Sin email'); }}
              style={{ padding: '8px 14px', background: '#2D3A20', color: 'white', border: 'none', borderRadius: '8px', cursor: emailAddr ? 'pointer' : 'not-allowed', fontSize: '0.78rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, opacity: emailAddr ? 1 : 0.45 }}
            >
              <Mail size={14} /> Email
            </button>
          </div>
        </div>

        {/* CRM message preview */}
        {crmTemplate && (
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#666', display: 'block', marginBottom: '4px' }}>Mensaje CRM</label>
            <div style={{ background: '#F8F9F5', border: '1px solid #E4EBDD', borderRadius: '10px', padding: '10px', fontSize: '0.78rem', color: '#444', whiteSpace: 'pre-wrap', lineHeight: 1.5, maxHeight: '120px', overflowY: 'auto' }}>
              {getCrmMessage()}
            </div>
            <button
              onClick={() => copyToClipboard(getCrmMessage(), 'Mensaje copiado')}
              style={{ marginTop: '6px', padding: '6px 12px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#5F7D4A', cursor: 'pointer' }}
            >
              Copiar mensaje
            </button>
          </div>
        )}
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
      />

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1200,
            background: '#2D3A20',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '90vw',
            maxWidth: '1100px',
            maxHeight: '90vh',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'all',
            fontFamily: 'system-ui',
          }}
          className="merchant-review-modal"
        >
          {/* ---------------------------------------------------------------- */}
          {/* Header                                                           */}
          {/* ---------------------------------------------------------------- */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E4EBDD', background: '#F8F9F5' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.8rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#2D3A20' }}>{merchant.name}</h2>
                  <span style={{ fontSize: '0.75rem', color: '#666', background: '#E4EBDD', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>{merchant.type}</span>
                  {locality && <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{locality}</span>}
                </div>

                {/* Progress bar */}
                {hasProgress && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#5F7D4A' }}>
                        {currentIndex! + 1} / {totalCount}
                      </span>
                      {stats && (
                        <span style={{ fontSize: '0.7rem', color: '#666' }}>
                          · Revisados: {stats.revisados} · Sin contacto: {stats.sinContacto} · Contactados: {stats.contactados} · En proceso: {stats.enProceso} · Oficializados: {stats.oficializados}
                        </span>
                      )}
                    </div>
                    <div style={{ height: '4px', background: '#E4EBDD', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressPct}%`, background: '#5F7D4A', borderRadius: '4px', transition: 'width 0.3s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Header actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {/* Cheatsheet */}
                <div style={{ position: 'relative' }} ref={cheatsheetRef}>
                  <button
                    onClick={() => setShowCheatsheet((v) => !v)}
                    title="Atajos de teclado"
                    style={{ background: '#E4EBDD', border: 'none', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: '#5F7D4A', display: 'flex', alignItems: 'center' }}
                  >
                    <Keyboard size={16} />
                  </button>
                  {showCheatsheet && (
                    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '6px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '0.75rem', zIndex: 10, minWidth: '220px' }}>
                      <p style={{ margin: '0 0 8px', fontSize: '0.72rem', fontWeight: 900, color: '#2D3A20', textTransform: 'uppercase' }}>Atajos</p>
                      {CHEATSHEET.map(([keys, desc]) => (
                        <div key={keys} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '3px 0', fontSize: '0.72rem', color: '#444' }}>
                          <code style={{ background: '#F8F9F5', padding: '1px 5px', borderRadius: '4px', fontWeight: 800, color: '#2D3A20', whiteSpace: 'nowrap' }}>{keys}</code>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {onPrev && (
                  <button onClick={onPrev} style={{ background: '#E4EBDD', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#2D3A20', fontSize: '0.78rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ChevronLeft size={14} /> Ant
                  </button>
                )}
                {onNext && (
                  <button onClick={onNext} style={{ background: '#E4EBDD', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#2D3A20', fontSize: '0.78rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Sig <ChevronRight size={14} />
                  </button>
                )}
                <button onClick={onClose} style={{ background: '#EF4444', border: 'none', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}>
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Mobile tabs                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="mobile-tabs" style={{ display: 'none', borderBottom: '1px solid #E4EBDD' }}>
            {(['info', 'tags', 'crm'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  background: activeTab === tab ? 'white' : '#F8F9F5',
                  borderBottom: activeTab === tab ? '2px solid #5F7D4A' : '2px solid transparent',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  color: activeTab === tab ? '#2D3A20' : '#9CA3AF',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {tab === 'info' ? 'Info' : tab === 'tags' ? 'Tags' : 'CRM'}
              </button>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Body                                                             */}
          {/* ---------------------------------------------------------------- */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }} className="modal-body">
            {/* Desktop: 2 col layout */}
            <div className="desktop-layout" style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%' }}>
              {/* Left column: Info + CRM */}
              <div style={{ flex: '0 0 60%', overflowY: 'auto', padding: '1.5rem', borderRight: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <section>
                  <h3 style={{ margin: '0 0 1rem', fontSize: '0.78rem', fontWeight: 900, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Información del comercio</h3>
                  <InfoSection />
                </section>
                <section>
                  <h3 style={{ margin: '0 0 1rem', fontSize: '0.78rem', fontWeight: 900, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CRM</h3>
                  <CrmSection />
                </section>
              </div>

              {/* Right column: Tags */}
              <div style={{ flex: '0 0 40%', overflowY: 'auto', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem', fontSize: '0.78rem', fontWeight: 900, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tags</h3>
                <TagsSection />
              </div>
            </div>

            {/* Mobile: single tab panel */}
            <div className="mobile-layout" style={{ display: 'none', flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
              {activeTab === 'info' && <InfoSection />}
              {activeTab === 'tags' && <TagsSection />}
              {activeTab === 'crm' && <CrmSection />}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Footer                                                           */}
          {/* ---------------------------------------------------------------- */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E4EBDD', background: '#F8F9F5', display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              onClick={onClose}
              style={{ padding: '8px 16px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800, color: '#666', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button
              onClick={handleNoChanges}
              disabled={saving}
              style={{ padding: '8px 16px', background: '#E4EBDD', border: 'none', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 900, color: '#2D3A20', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Check size={14} /> Sin cambios
            </button>
            <button
              onClick={handleSaveAndNext}
              disabled={saving}
              style={{ padding: '8px 20px', background: '#2D3A20', border: 'none', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 900, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive styles via a style tag — avoids a separate CSS file */}
      <style>{`
        @media (max-width: 767px) {
          .merchant-review-modal .desktop-layout { display: none !important; }
          .merchant-review-modal .mobile-layout { display: block !important; }
          .merchant-review-modal .mobile-tabs { display: flex !important; }
          .merchant-review-modal { width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// FieldRow — generic editable row
// ---------------------------------------------------------------------------

interface FieldRowProps {
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  link?: string;
  linkLabel?: string;
  multiline?: boolean;
  placeholder?: string;
  noteStyle?: boolean;
}

function FieldRow({ label, value, onChange, link, linkLabel, multiline, placeholder, noteStyle }: FieldRowProps) {
  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #E4EBDD',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontFamily: 'system-ui',
    color: '#2D3A20',
    background: noteStyle ? '#FFFBEB' : 'white',
    resize: 'vertical' as const,
    minHeight: multiline ? '100px' : undefined,
    maxHeight: multiline ? '140px' : undefined,
    overflowY: multiline ? 'auto' : undefined,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2D3A20', flex: 1 }}>{label}</label>
        <FieldIndicator value={value} />
        {link && (
          <a href={link} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', color: '#5F7D4A', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
            <ExternalLink size={11} /> {linkLabel}
          </a>
        )}
      </div>
      {multiline ? (
        <textarea
          key={`textarea-${label}`}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, minHeight: noteStyle ? '150px' : '100px' }}
          rows={5}
        />
      ) : (
        <input
          type="text"
          key={`input-${label}`}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  );
}
