'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  existingImages: string[];
  onExistingChange: (images: string[]) => void;
  onNewFiles: (files: File[]) => void;
  uploading?: boolean;
}

export default function ImageDropZone({ existingImages, onExistingChange, onNewFiles, uploading }: Props) {
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    const newPreviews = files.map(file => ({ url: URL.createObjectURL(file), file }));
    setPreviews(prev => [...prev, ...newPreviews]);
    onNewFiles(files);
  }, [onNewFiles]);

  const removeExisting = (url: string) => {
    onExistingChange(existingImages.filter(u => u !== url));
  };

  const removePreview = (previewUrl: string) => {
    setPreviews(prev => {
      const target = prev.find(p => p.url === previewUrl);
      if (target) URL.revokeObjectURL(target.url);
      const next = prev.filter(p => p.url !== previewUrl);
      onNewFiles(next.map(p => p.file));
      return next;
    });
  };

  const hasImages = existingImages.length > 0 || previews.length > 0;

  return (
    <div>
      {hasImages && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
          {existingImages.map(url => (
            <div key={url} style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
              />
              <button
                type="button"
                onClick={() => removeExisting(url)}
                aria-label="Remove image"
                style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '20px', height: '20px',
                  background: '#dc2626', color: '#fff',
                  border: '2px solid #fff', borderRadius: '50%',
                  cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {previews.map(({ url }) => (
            <div key={url} style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
              <img
                src={url}
                alt="New upload preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', border: '2px solid #2563EB' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(37,99,235,0.8)', borderRadius: '0 0 6px 6px',
                padding: '2px',
                fontSize: '9px', fontWeight: 700, color: '#fff',
                textAlign: 'center', letterSpacing: '0.04em',
              }}>
                {uploading ? '…' : 'NEW'}
              </div>
              <button
                type="button"
                onClick={() => removePreview(url)}
                aria-label="Remove new image"
                style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '20px', height: '20px',
                  background: '#dc2626', color: '#fff',
                  border: '2px solid #fff', borderRadius: '50%',
                  cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images — drag and drop or click"
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        style={{
          border: `2px dashed ${dragging ? '#2563EB' : '#CBD5E1'}`,
          borderRadius: '0.625rem',
          padding: '1.5rem 1rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? '#eff6ff' : '#FAFAFA',
          transition: 'border-color 0.15s, background 0.15s',
          outline: 'none',
        }}
      >
        <Upload size={20} style={{ color: dragging ? '#2563EB' : '#94a3b8', margin: '0 auto 0.5rem', display: 'block' }} />
        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: dragging ? '#2563EB' : '#475569', margin: 0 }}>
          {dragging ? 'Drop to upload' : 'Drag & drop images here'}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0' }}>
          or click to browse · JPG, PNG, WebP
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}
