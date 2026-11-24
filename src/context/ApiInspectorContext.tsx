'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ApiInspectorPreset {
  id: string;
  label: string;
  method: 'GET' | 'POST';
  endpoint: string;
  badgeColor: string;
  textColor?: string;
  description: string;
  defaultBody?: string;
}

interface ApiInspectorContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  activeMethod: 'GET' | 'POST';
  activeEndpoint: string;
  activeBody: string;
  openWithPreset: (preset: {
    method: 'GET' | 'POST';
    endpoint: string;
    body?: string;
  }) => void;
}

const ApiInspectorContext = createContext<ApiInspectorContextType | undefined>(undefined);

export function ApiInspectorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'GET' | 'POST'>('GET');
  const [activeEndpoint, setActiveEndpoint] = useState<string>('/api/chapter');
  const [activeBody, setActiveBody] = useState<string>('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const openWithPreset = useCallback(
    (preset: { method: 'GET' | 'POST'; endpoint: string; body?: string }) => {
      setActiveMethod(preset.method);
      setActiveEndpoint(preset.endpoint);
      setActiveBody(preset.body || '');
      setIsOpen(true);
    },
    []
  );

  return (
    <ApiInspectorContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        activeMethod,
        activeEndpoint,
        activeBody,
        openWithPreset,
      }}
    >
      {children}
    </ApiInspectorContext.Provider>
  );
}

export function useApiInspector(): ApiInspectorContextType {
  const context = useContext(ApiInspectorContext);
  if (!context) {
    throw new Error('useApiInspector must be used within an ApiInspectorProvider');
  }
  return context;
}
