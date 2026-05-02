'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TagCategory {
  id: string;
  name: string;
  slug: string;
  tags: string[];
  sort_order?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiPatch(id: string, body: Partial<TagCategory>): Promise<TagCategory> {
  const res = await fetch(`/api/admin/tag-categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Error al guardar categoría');
  return res.json();
}

async function apiDelete(id: string): Promise<void> {
  const res = await fetch(`/api/admin/tag-categories/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar categoría');
}

async function apiPost(body: { name: string; slug?: string; tags?: string[]; sort_order?: number }): Promise<TagCategory> {
  const res = await fetch('/api/admin/tag-categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CategoriesTab() {
  const [categories, setCategories] = useState<TagCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New category input
  const [newCatName, setNewCatName] = useState('');
  const [addingCat, setAddingCat] = useState(false);
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const newCatRef = useRef<HTMLInputElement>(null);

  // Per-category: rename
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Per-category: new tag input
  const [newTagInputs, setNewTagInputs] = useState<Record<string, string>>({});

  // ---------------------------------------------------------------------------
  // Load
  // ---------------------------------------------------------------------------

  useEffect(() => {
    fetch('/api/admin/tag-categories')
      .then((r) => r.json())
      .then((data: TagCategory[]) => { setCategories(data); setLoading(false); })
      .catch(() => { setError('Error al cargar categorías'); setLoading(false); });
  }, []);

  useEffect(() => {
    if (showNewCatInput) newCatRef.current?.focus();
  }, [showNewCatInput]);

  // ---------------------------------------------------------------------------
  // Category CRUD
  // ---------------------------------------------------------------------------

  const createCategory = async () => {
    const name = newCatName.trim();
    if (!name) return;
    setAddingCat(true);
    try {
      const created = await apiPost({ name });
      setCategories((prev) => [...prev, created]);
      setNewCatName('');
      setShowNewCatInput(false);
    } catch {
      setError('Error al crear categoría');
    } finally {
      setAddingCat(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría y todos sus tags?')) return;
    try {
      await apiDelete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError('Error al eliminar categoría');
    }
  };

  const startRename = (cat: TagCategory) => {
    setRenamingId(cat.id);
    setRenameValue(cat.name);
  };

  const commitRename = async (cat: TagCategory) => {
    const name = renameValue.trim();
    if (!name || name === cat.name) { setRenamingId(null); return; }
    try {
      const updated = await apiPatch(cat.id, { name });
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? updated : c)));
    } catch {
      setError('Error al renombrar');
    } finally {
      setRenamingId(null);
    }
  };

  // ---------------------------------------------------------------------------
  // Tag CRUD
  // ---------------------------------------------------------------------------

  const removeTag = async (cat: TagCategory, tag: string) => {
    const tags = cat.tags.filter((t) => t !== tag);
    try {
      const updated = await apiPatch(cat.id, { tags });
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? updated : c)));
    } catch {
      setError('Error al eliminar tag');
    }
  };

  const addTag = async (cat: TagCategory) => {
    const tag = (newTagInputs[cat.id] || '').trim();
    if (!tag) return;
    if (cat.tags.includes(tag)) {
      setNewTagInputs((p) => ({ ...p, [cat.id]: '' }));
      return;
    }
    const tags = [...cat.tags, tag];
    try {
      const updated = await apiPatch(cat.id, { tags });
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? updated : c)));
      setNewTagInputs((p) => ({ ...p, [cat.id]: '' }));
    } catch {
      setError('Error al agregar tag');
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontFamily: 'system-ui', fontSize: '0.9rem' }}>
        Cargando categorías...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#2D3A20' }}>Categorías de Tags</h2>
          <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#9CA3AF' }}>
            {categories.length} {categories.length === 1 ? 'categoría' : 'categorías'}
          </p>
        </div>
        <button
          onClick={() => setShowNewCatInput((v) => !v)}
          style={{
            padding: '8px 16px',
            background: '#2D3A20',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Plus size={14} /> Nueva categoría
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ padding: '10px 14px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '10px', color: '#991B1B', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {error}
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991B1B' }}><X size={14} /></button>
        </div>
      )}

      {/* New category input */}
      {showNewCatInput && (
        <div style={{ padding: '1rem', background: '#F8F9F5', border: '1px dashed #C7D4BE', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            ref={newCatRef}
            type="text"
            placeholder="Nombre de la nueva categoría..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') createCategory(); if (e.key === 'Escape') { setShowNewCatInput(false); setNewCatName(''); } }}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #E4EBDD', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'system-ui', color: '#2D3A20', background: 'white' }}
          />
          <button
            onClick={createCategory}
            disabled={addingCat || !newCatName.trim()}
            style={{ padding: '8px 14px', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, opacity: !newCatName.trim() ? 0.5 : 1 }}
          >
            <Check size={14} /> {addingCat ? 'Creando...' : 'Crear'}
          </button>
          <button
            onClick={() => { setShowNewCatInput(false); setNewCatName(''); }}
            style={{ padding: '8px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '8px', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Category list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {categories.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem', border: '1px dashed #E4EBDD', borderRadius: '12px' }}>
            No hay categorías. Crea una con el botón de arriba.
          </div>
        )}

        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            isRenaming={renamingId === cat.id}
            renameValue={renameValue}
            onRenameValueChange={setRenameValue}
            onStartRename={() => startRename(cat)}
            onCommitRename={() => commitRename(cat)}
            onCancelRename={() => setRenamingId(null)}
            onDelete={() => deleteCategory(cat.id)}
            onRemoveTag={(tag) => removeTag(cat, tag)}
            newTagValue={newTagInputs[cat.id] || ''}
            onNewTagChange={(v) => setNewTagInputs((p) => ({ ...p, [cat.id]: v }))}
            onAddTag={() => addTag(cat)}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CategoryCard
// ---------------------------------------------------------------------------

interface CategoryCardProps {
  cat: TagCategory;
  isRenaming: boolean;
  renameValue: string;
  onRenameValueChange: (v: string) => void;
  onStartRename: () => void;
  onCommitRename: () => void;
  onCancelRename: () => void;
  onDelete: () => void;
  onRemoveTag: (tag: string) => void;
  newTagValue: string;
  onNewTagChange: (v: string) => void;
  onAddTag: () => void;
}

function CategoryCard({
  cat,
  isRenaming,
  renameValue,
  onRenameValueChange,
  onStartRename,
  onCommitRename,
  onCancelRename,
  onDelete,
  onRemoveTag,
  newTagValue,
  onNewTagChange,
  onAddTag,
}: CategoryCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) inputRef.current?.focus();
  }, [isRenaming]);

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #E4EBDD',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}
    >
      {/* Category header */}
      <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #F0F4ED', background: '#F8F9F5', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isRenaming ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={renameValue}
              onChange={(e) => onRenameValueChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onCommitRename(); if (e.key === 'Escape') onCancelRename(); }}
              style={{ flex: 1, padding: '5px 10px', border: '1px solid #C7D4BE', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 800, fontFamily: 'system-ui', color: '#2D3A20' }}
            />
            <button onClick={onCommitRename} style={{ background: '#5F7D4A', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}>
              <Check size={13} />
            </button>
            <button onClick={onCancelRename} style={{ background: '#E4EBDD', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center' }}>
              <X size={13} />
            </button>
          </>
        ) : (
          <>
            <span style={{ flex: 1, fontWeight: 900, color: '#2D3A20', fontSize: '0.9rem' }}>{cat.name}</span>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF', background: '#E4EBDD', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>{cat.tags.length} tags</span>
            <button
              onClick={onStartRename}
              title="Renombrar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F7D4A', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={onDelete}
              title="Eliminar categoría"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>

      {/* Tags body */}
      <div style={{ padding: '1rem 1.25rem' }}>
        {/* Existing tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.875rem', minHeight: '28px' }}>
          {cat.tags.length === 0 && (
            <span style={{ fontSize: '0.75rem', color: '#C7D4BE', alignSelf: 'center' }}>Sin tags — agrega el primero abajo</span>
          )}
          {cat.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                background: '#E4EBDD',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#2D3A20',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {tag}
              <button
                onClick={() => onRemoveTag(tag)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, color: '#5F7D4A', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}
                title={`Eliminar "${tag}"`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>

        {/* Add tag input */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="text"
            placeholder="Nuevo tag... (Enter para agregar)"
            value={newTagValue}
            onChange={(e) => onNewTagChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAddTag(); } }}
            style={{
              flex: 1,
              padding: '6px 10px',
              border: '1px solid #E4EBDD',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontFamily: 'system-ui',
              color: '#2D3A20',
              background: '#F8F9F5',
            }}
          />
          <button
            onClick={onAddTag}
            disabled={!newTagValue.trim()}
            style={{
              padding: '6px 12px',
              background: newTagValue.trim() ? '#5F7D4A' : '#E4EBDD',
              color: newTagValue.trim() ? 'white' : '#9CA3AF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: newTagValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Plus size={13} /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
