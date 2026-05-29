'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Model {
  id: string;
  name: string;
  year: string;
  flag: string;
  type: string;
}

interface Part {
  id: number;
  model_id: string;
  category: string;
  name: string;
  part_number: string;
  created_at: string;
  model_name: string;
  model_flag: string;
  model_type: string;
}

interface ApiKey {
  id: number;
  key_prefix: string;
  name: string;
  created_at: string;
  expires_at: string | null;
  last_used_at: string | null;
}

export default function DashboardPage() {
  const router = useRouter();

  // Data states
  const [parts, setParts] = useState<Part[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  // Search & filter states
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalParts, setTotalParts] = useState(0);
  const [partsLoading, setPartsLoading] = useState(false);

  // Overlay / Panel states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'parts' | 'api' | 'docs'>('parts'); // Mobile tabs

  // API Key creation
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  // Manual Part form states
  const [newPart, setNewPart] = useState({
    model_id: '',
    category: '',
    name: '',
    part_number: '',
    is_new_model: false,
    new_model_id: '',
    new_model_name: '',
    new_model_year: '',
    new_model_flag: '',
    new_model_type: 'Japan',
  });
  const [addPartError, setAddPartError] = useState<string | null>(null);
  const [addPartSuccess, setAddPartSuccess] = useState<boolean>(false);
  const [addingPart, setAddingPart] = useState(false);

  // JSON Import states
  const [importLogs, setImportLogs] = useState<string[]>([]);
  const [importingJson, setImportingJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Interactive console log stream
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // System stats
  const [dbStatus, setDbStatus] = useState<'READY' | 'LOADING' | 'ERROR'>('LOADING');
  const [mounted, setMounted] = useState(false);

  // Debouncing search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Initial loads
  useEffect(() => {
    setMounted(true);
    addLog('System initialization starting...');
    fetchModels();
    fetchCategories();
    fetchApiKeys();
    addLog('Established secure handshake with Neon PostgreSQL cluster.');
    setDbStatus('READY');
  }, []);

  // Fetch parts when filters or pages change
  useEffect(() => {
    fetchParts();
  }, [page, selectedModel, selectedCategory]);

  // Handle debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1); // Reset to page 1 on new search
      fetchParts();
    }, 350);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [search]);

  // API Call: Fetch parts list
  const fetchParts = async () => {
    setPartsLoading(true);
    const start = performance.now();
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        search,
        model: selectedModel,
        category: selectedCategory,
      });

      const res = await fetch(`/api/parts?${params.toString()}`);
      const data = await res.json();
      const end = performance.now();
      const duration = Math.round(end - start);

      if (res.ok && data.success) {
        setParts(data.data);
        setTotalParts(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
        addLog(`Query resolved in ${duration}ms. Retreived ${data.data.length} records. Total matches: ${data.pagination.total}.`);
      } else {
        addLog(`Database error: ${data.error || 'Failed to fetch parts'}`);
      }
    } catch (err) {
      addLog('Network warning: Failed to sync parts inventory.');
    } finally {
      setPartsLoading(false);
    }
  };

  // API Call: Fetch car models
  const fetchModels = async () => {
    try {
      const res = await fetch('/api/models');
      const data = await res.json();
      if (res.ok && data.success) {
        setModels(data.data);
        if (data.data.length > 0) {
          setNewPart(prev => ({ ...prev, model_id: data.data[0].id }));
        }
      }
    } catch (err) {
      addLog('Failed to fetch models dropdown list.');
    }
  };

  // API Call: Fetch unique categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      addLog('Failed to fetch categories list.');
    }
  };

  // API Call: Fetch API Keys list
  const fetchApiKeys = async () => {
    try {
      const res = await fetch('/api/keys');
      const data = await res.json();
      if (res.ok && data.success) {
        setApiKeys(data.data);
      }
    } catch (err) {
      addLog('Failed to fetch developer API keys.');
    }
  };

  // Handler: Logout
  const handleLogout = async () => {
    addLog('Terminating session...');
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        addLog('Session revoked.');
        router.push('/login');
        router.refresh();
      }
    } catch (err) {
      addLog('Failed to execute terminal logout.');
    }
  };

  // Handler: Generate API Key
  const handleGenerateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    addLog(`Initiating API Key generation sequence for client: "${newKeyName}"...`);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName, expires_in_days: newKeyExpiry }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setGeneratedKey(data.data.key);
        fetchApiKeys();
        setNewKeyName('');
        addLog(`API Key generated securely. Hashed and saved SHA-256 footprint: [${data.data.key_prefix}...]`);
      } else {
        addLog(`Generation failure: ${data.error || 'Unknown server response'}`);
      }
    } catch (err) {
      addLog('API request timed out.');
    }
  };

  // Handler: Revoke API Key
  const handleRevokeApiKey = async (id: number) => {
    if (!confirm('Are you sure you want to permanently revoke this API Key? Any application using it will lose access immediately.')) return;

    addLog(`Initiating revocation process for Key ID: ${id}...`);
    try {
      const res = await fetch(`/api/keys?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok && data.success) {
        fetchApiKeys();
        addLog(`Key ID ${id} revoked. Credentials wiped from verification database.`);
      } else {
        addLog(`Revocation failed: ${data.error}`);
      }
    } catch (err) {
      addLog('Revocation Request Error.');
    }
  };

  // Handler: Add Manual Part
  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingPart(true);
    setAddPartError(null);
    setAddPartSuccess(false);

    addLog(`Attempting to manual-insert part: "${newPart.name}"...`);

    try {
      const res = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPart),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAddPartSuccess(true);
        addLog(`Successfully inserted part ${newPart.part_number} (${newPart.name}).`);
        
        // Refresh grids and dropdowns
        fetchParts();
        fetchCategories();
        if (newPart.is_new_model) {
          fetchModels();
        }

        // Reset part form (keeping model select)
        setNewPart((prev) => ({
          ...prev,
          name: '',
          part_number: '',
          is_new_model: false,
          new_model_id: '',
          new_model_name: '',
          new_model_year: '',
          new_model_flag: '',
        }));

        setTimeout(() => setIsAddOpen(false), 1500);
      } else {
        setAddPartError(data.error || 'Failed to insert part record');
        addLog(`Insert failure: ${data.error || 'Constraint violation'}`);
      }
    } catch (err) {
      setAddPartError('Connection lost during submission.');
    } finally {
      setAddingPart(false);
    }
  };

  // Handler: Drag and drop JSON file batch upload
  const handleJsonUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportingJson(true);
    setImportLogs([`Selected file: ${file.name}`, 'Reading content...']);
    addLog(`JSON File upload detected: ${file.name}. Validating format...`);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const parsedData = JSON.parse(text);

        setImportLogs((prev) => [...prev, 'JSON successfully parsed.', 'Sending batch upload payload to database server...']);

        const res = await fetch('/api/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: text,
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setImportLogs((prev) => [...prev, ...data.logs, 'Database transaction committed successfully!']);
          addLog(`Batch JSON Import completed. Imported ${data.summary.partsImported} parts.`);
          
          // Refresh list
          fetchParts();
          fetchModels();
          fetchCategories();
        } else {
          setImportLogs((prev) => [...prev, `Server Error: ${data.error || 'Failed to process import file.'}`]);
          addLog(`Batch import failed: ${data.error}`);
        }
      } catch (err: any) {
        setImportLogs((prev) => [...prev, `Critical Parser Error: ${err.message}`]);
        addLog('Parser abort: Invalid JSON syntax uploaded.');
      } finally {
        setImportingJson(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-black blueprint-grid font-sans text-zinc-300 antialiased selection:bg-cyan-500/30 selection:text-cyan-400">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            <span className="absolute w-6 h-6 rounded-full border border-cyan-500/20 animate-ping opacity-40" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white font-display uppercase text-neon-glow">
              OEM PART TERMINAL
            </h1>
            <p className="text-[10px] font-mono text-zinc-500">
              CLUSTER ADDR: ep-flat-base-ap3eeq0w • STATUS: <span className="text-cyan-400">{dbStatus}</span>
            </p>
          </div>
        </div>

        {/* Desktop Quick Stats summary */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-xs text-zinc-400 border-x border-zinc-900 px-8">
          <div>
            <span className="text-zinc-600 mr-2">PARTS:</span>
            <span className="text-white font-semibold">{totalParts}</span>
          </div>
          <div>
            <span className="text-zinc-600 mr-2">MODELS:</span>
            <span className="text-white font-semibold">{models.length}</span>
          </div>
          <div>
            <span className="text-zinc-600 mr-2">API KEYS:</span>
            <span className="text-cyan-400 font-semibold">{apiKeys.length} ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/20 border border-cyan-900/40 rounded px-2.5 py-1 hidden sm:inline-block">
            AUTHORIZED USER
          </span>
          <button 
            onClick={handleLogout}
            className="text-xs font-mono border border-zinc-800 hover:border-red-800/70 hover:text-red-400 px-3 py-1.5 rounded bg-zinc-950 hover:bg-red-950/20 cursor-pointer transition-all active:scale-[0.98]"
          >
            DISCONNECT
          </button>
        </div>
      </header>

      {/* MOBILE TAB NAVIGATOR */}
      <div className="flex border-b border-zinc-900 md:hidden bg-zinc-950 text-xs font-mono">
        <button 
          onClick={() => setActiveTab('parts')}
          className={`flex-1 text-center py-3.5 border-b-2 font-display uppercase tracking-wider ${activeTab === 'parts' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-500'}`}
        >
          Parts Catalog
        </button>
        <button 
          onClick={() => setActiveTab('api')}
          className={`flex-1 text-center py-3.5 border-b-2 font-display uppercase tracking-wider ${activeTab === 'api' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-500'}`}
        >
          Developer Keys
        </button>
        <button 
          onClick={() => setActiveTab('docs')}
          className={`flex-1 text-center py-3.5 border-b-2 font-display uppercase tracking-wider ${activeTab === 'docs' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-500'}`}
        >
          API Reference
        </button>
      </div>

      {/* 2. MAIN LAYOUT GRID */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        
        {/* LEFT COLUMN: PARTS GRID (7 cols on desktop) */}
        <section className={`md:col-span-7 flex flex-col gap-6 ${activeTab === 'parts' ? 'block' : 'hidden md:flex'}`}>
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[80px] pointer-events-none rounded-full" />
            
            {/* Catalog header controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold font-display uppercase text-zinc-400 tracking-wider">
                  Parts Database Inventory
                </h2>
                <p className="text-[10px] text-zinc-600 font-mono">
                  Live indexing and querying of OEM specifications
                </p>
              </div>

              {/* Action Buttons (FAB on mobile, normal on desktop) */}
              <div className="flex gap-2.5 shrink-0">
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="bg-cyan-950/30 border border-cyan-800/80 hover:border-cyan-400 text-cyan-400 hover:text-white px-3.5 py-1.5 rounded text-xs font-display font-medium tracking-wide transition-all hover:bg-cyan-500/10 cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                >
                  <span>+</span> ADD RECORD
                </button>
                <button
                  onClick={() => setIsImportOpen(true)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white px-3.5 py-1.5 rounded text-xs font-display font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>↓</span> IMPORT JSON
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              {/* Search input */}
              <div className="sm:col-span-5 relative">
                <input
                  type="text"
                  placeholder="Search by part number, name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/50 border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all pl-8 font-mono"
                />
                <div className="absolute left-2.5 top-2.5 text-zinc-700 pointer-events-none">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Model select */}
              <div className="sm:col-span-4">
                <select
                  value={selectedModel}
                  onChange={(e) => { setSelectedModel(e.target.value); setPage(1); }}
                  className="w-full bg-black/50 border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-zinc-400 focus:outline-none transition-all font-mono"
                >
                  <option value="">All Vehicles</option>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.flag} {m.name} ({m.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category select */}
              <div className="sm:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                  className="w-full bg-black/50 border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-zinc-400 focus:outline-none transition-all font-mono"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* MAIN CATALOG TABLE (Responsive: Cards list on mobile, grid table on desktop) */}
            <div className="relative flex-1 overflow-x-auto min-h-[300px] border border-zinc-900 rounded-lg bg-black/30">
              {partsLoading ? (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center font-mono text-xs text-cyan-400">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>EXECUTING SQL INVENTORY RETRIEVAL...</span>
                  </div>
                </div>
              ) : parts.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center font-mono">
                  <svg className="w-10 h-10 text-zinc-800 mb-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2M9 5h6" />
                  </svg>
                  <p className="text-xs text-zinc-500 font-semibold uppercase">Zero Records Resolved</p>
                  <p className="text-[10px] text-zinc-700 mt-1 max-w-[280px]">No matches found for your filter criteria. Add a manual part or check spelling.</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <table className="w-full text-left border-collapse text-xs font-mono hidden sm:table">
                    <thead>
                      <tr className="border-b border-zinc-900 bg-zinc-950/90 text-zinc-500 uppercase tracking-wider text-[10px]">
                        <th className="px-4 py-3 font-semibold">Part Number</th>
                        <th className="px-4 py-3 font-semibold">Part Name</th>
                        <th className="px-4 py-3 font-semibold">Category</th>
                        <th className="px-4 py-3 font-semibold">Compatible Vehicle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60">
                      {parts.map((part) => (
                        <tr key={part.id} className="hover:bg-cyan-950/5 group transition-colors">
                          <td className="px-4 py-3.5 text-cyan-400 group-hover:text-cyan-300 font-bold select-all tracking-wide">
                            {part.part_number}
                          </td>
                          <td className="px-4 py-3.5 text-zinc-300 font-medium">
                            {part.name}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] border border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider">
                              {part.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-zinc-400">
                            <span className="mr-1">{part.model_flag}</span> {part.model_name}
                            <span className="text-[10px] text-zinc-600 block sm:inline sm:ml-2">({part.model_type})</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Cards List View */}
                  <div className="flex flex-col sm:hidden divide-y divide-zinc-900">
                    {parts.map((part) => (
                      <div key={part.id} className="p-4 flex flex-col gap-2.5">
                        <div className="flex items-start justify-between">
                          <span className="text-cyan-400 font-bold text-sm tracking-wide select-all">
                            {part.part_number}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] border border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider">
                            {part.category}
                          </span>
                        </div>
                        <div className="text-zinc-200 text-xs font-semibold">
                          {part.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                          <span>Model Compatibility:</span>
                          <span className="text-zinc-300 font-semibold">{part.model_flag} {part.model_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pagination footer */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 font-mono text-xs">
                <span className="text-zinc-600">
                  Page <span className="text-zinc-400">{page}</span> of <span className="text-zinc-400">{totalPages}</span> ({totalParts} total)
                </span>
                
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    className="border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 bg-zinc-950"
                  >
                    PREV
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    className="border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 bg-zinc-950"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: SIDEBARS (5 cols on desktop) */}
        <section className="md:col-span-5 flex flex-col gap-6">
          
          {/* A. DEVELOPER API KEYS PANEL (Visible if activeTab is api, or on desktop) */}
          <div className={`bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-5 ${activeTab === 'api' ? 'block' : 'hidden md:flex'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
            
            <div>
              <h2 className="text-sm font-bold font-display uppercase text-zinc-400 tracking-wider">
                Developer API Key Access
              </h2>
              <p className="text-[10px] text-zinc-600 font-mono">
                Generate secure external authentication keys for integrations
              </p>
            </div>

            {/* Key generator form */}
            <form onSubmit={handleGenerateApiKey} className="space-y-4 border border-zinc-900 bg-black/40 p-4 rounded-lg">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                  Key Label / Application Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vercel Sync client, Mobile App..."
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                    Expiration Duration
                  </label>
                  <select
                    value={newKeyExpiry}
                    onChange={(e) => setNewKeyExpiry(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-zinc-400 focus:outline-none transition-all font-mono"
                  >
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="365">1 Year</option>
                    <option value="0">Never Expires</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-cyan-950/20 border border-cyan-800 hover:border-cyan-400 text-cyan-400 hover:text-white px-3 py-2 rounded text-xs font-display font-medium tracking-wide transition-all cursor-pointer text-center hover:bg-cyan-500/5"
                  >
                    GENERATE KEY
                  </button>
                </div>
              </div>
            </form>

            {/* Generated Raw Key display frame (Single viewing) */}
            {generatedKey && (
              <div className="border border-cyan-500/30 bg-cyan-950/10 p-4 rounded-lg flex flex-col gap-2.5 relative scanlines">
                <div className="flex items-center justify-between border-b border-cyan-900/60 pb-1.5 font-mono text-[9px] text-cyan-400 font-bold">
                  <span>[ SECURE RAW KEY - COPY NOW ]</span>
                  <button 
                    onClick={() => setGeneratedKey(null)}
                    className="text-zinc-500 hover:text-white font-mono text-[10px] cursor-pointer"
                  >
                    [ DISMISS ]
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-xs font-mono text-cyan-300 break-all select-all font-bold tracking-wider">
                    {generatedKey}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey);
                      addLog('Key copied to clipboard.');
                    }}
                    className="text-[10px] font-mono text-cyan-400 bg-cyan-950 border border-cyan-800 hover:border-cyan-400 px-2 py-1 rounded shrink-0 cursor-pointer active:scale-95 transition-all"
                  >
                    COPY
                  </button>
                </div>
                <p className="text-[9px] text-zinc-500 font-mono mt-1 leading-normal">
                  ⚠️ Note: For security reasons, this key will not be shown again once dismissed. Keep it safe.
                </p>
              </div>
            )}

            {/* Active Keys List */}
            <div className="space-y-2 flex-1 max-h-[160px] overflow-y-auto">
              <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                Active Client Keys
              </label>

              {apiKeys.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-zinc-900 rounded font-mono text-[10px] text-zinc-600">
                  No active developer API keys found.
                </div>
              ) : (
                <div className="space-y-2">
                  {apiKeys.map((k) => (
                    <div key={k.id} className="border border-zinc-900 bg-black/20 p-3 rounded-lg flex items-center justify-between gap-3 text-xs font-mono">
                      <div>
                        <div className="text-zinc-300 font-bold">{k.name}</div>
                        <div className="text-[10px] text-zinc-600 flex flex-col sm:flex-row sm:gap-3.5 mt-1">
                          <span>Prefix: <span className="text-cyan-500/80">{k.key_prefix}</span></span>
                          {k.last_used_at && (
                            <span>Used: <span className="text-zinc-400">{new Date(k.last_used_at).toLocaleDateString()}</span></span>
                          )}
                          {k.expires_at ? (
                            <span>Expires: {new Date(k.expires_at).toLocaleDateString()}</span>
                          ) : (
                            <span>Never expires</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRevokeApiKey(k.id)}
                        className="text-[10px] text-zinc-600 hover:text-red-400 border border-transparent hover:border-red-950 bg-transparent hover:bg-red-950/20 px-2.5 py-1 rounded cursor-pointer transition-colors"
                      >
                        REVOKE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* B. TECHNICAL API DOCUMENTATION PANEL (Visible if activeTab is docs, or on desktop) */}
          <div className={`bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-4 ${activeTab === 'docs' ? 'block' : 'hidden md:flex'}`}>
            <div>
              <h2 className="text-sm font-bold font-display uppercase text-zinc-400 tracking-wider">
                External API Reference
              </h2>
              <p className="text-[10px] text-zinc-600 font-mono">
                Query parts database using standard JSON requests
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  GET
                </span>
                <code className="text-zinc-300 text-[11px] font-semibold font-mono">/api/v1/parts</code>
              </div>

              <div className="text-zinc-500 text-[10px] leading-relaxed">
                Retrieve a JSON list of parts. Must authenticate by providing your key in the header:
              </div>
              <div className="bg-black/50 border border-zinc-900 rounded p-2.5 text-[10px] text-zinc-400 overflow-x-auto">
                <div className="text-zinc-600 border-b border-zinc-950 pb-1 mb-1">HEADERS:</div>
                <div>Authorization: Bearer <span className="text-cyan-500">YOUR_API_KEY</span></div>
                <div>x-api-key: <span className="text-cyan-500">YOUR_API_KEY</span> <span className="text-zinc-700">(Alternative)</span></div>
              </div>

              <div className="text-zinc-500 text-[10px] leading-relaxed">
                Supports optional filters: <code className="text-zinc-400">search</code>, <code className="text-zinc-400">model</code>, <code className="text-zinc-400">category</code>, <code className="text-zinc-400">page</code>, <code className="text-zinc-400">limit</code>.
              </div>

              {/* Code Snippet Box */}
              <div className="space-y-1.5">
                <div className="text-[10px] text-zinc-600 font-bold">CURL QUERY EXAMPLE:</div>
                <div className="bg-black border border-zinc-900 rounded-lg p-3 text-[10px] leading-relaxed text-cyan-400 select-all overflow-x-auto relative scanlines font-mono">
                  curl -X GET &quot;https://{mounted ? window.location.host : 'oem-manager.vercel.app'}/api/v1/parts?search=air&quot; \<br />
                  &nbsp;&nbsp;-H &quot;Authorization: Bearer <span className="text-white">YOUR_API_KEY</span>&quot;
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. INTERACTIVE SYSTEM ACTIVITY CONSOLE (FIXED FOOTER) */}
      <footer className="border-t border-zinc-900 bg-black px-6 py-3 flex flex-col gap-2 z-30 font-mono text-[10px]">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            System Operations Console
          </span>
          <span>SSL_CONNECTED</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-3 h-28 overflow-y-auto text-[10px] leading-relaxed flex flex-col gap-1 text-zinc-400 font-mono">
          {consoleLogs.map((log, idx) => (
            <div key={idx} className="break-all font-mono">
              <span className="text-zinc-600 mr-2 shrink-0">{log.substring(0, 10)}</span>
              <span className={log.includes('resolved') || log.includes('Import completed') || log.includes('successfully') ? 'text-cyan-400' : log.includes('error') || log.includes('failure') ? 'text-red-400' : 'text-zinc-400'}>
                {log.substring(10)}
              </span>
            </div>
          ))}
          <div ref={consoleBottomRef} />
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* OVERLAY PANEL 1: MANUAL ADD PART DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all font-mono">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-5 overflow-hidden">
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div>
                <h3 className="text-sm font-bold font-display uppercase text-white tracking-wider">
                  Create OEM Part Record
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Input manual specs directly into catalog schema
                </p>
              </div>
              <button 
                onClick={() => { setIsAddOpen(false); setAddPartError(null); setAddPartSuccess(false); }}
                className="text-zinc-500 hover:text-white font-mono text-sm cursor-pointer"
              >
                [ CLOSE ]
              </button>
            </div>

            {addPartSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center font-mono gap-3.5">
                <div className="w-10 h-10 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-400 text-lg font-bold animate-bounce">
                  ✓
                </div>
                <p className="text-xs font-semibold text-cyan-400">TRANSACTION COMMITTED</p>
                <p className="text-[10px] text-zinc-500">The part has been successfully indexed in the catalog database.</p>
              </div>
            ) : (
              <form onSubmit={handleAddPart} className="space-y-4">
                
                {/* Car model choice toggles */}
                <div className="grid grid-cols-2 gap-2 border border-zinc-900 bg-black p-1.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setNewPart(prev => ({ ...prev, is_new_model: false }))}
                    className={`py-1.5 rounded font-display uppercase tracking-wider text-center cursor-pointer transition-all ${!newPart.is_new_model ? 'bg-zinc-900 text-cyan-400 border border-zinc-800' : 'text-zinc-500'}`}
                  >
                    Select Model
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPart(prev => ({ ...prev, is_new_model: true }))}
                    className={`py-1.5 rounded font-display uppercase tracking-wider text-center cursor-pointer transition-all ${newPart.is_new_model ? 'bg-zinc-900 text-cyan-400 border border-zinc-800' : 'text-zinc-500'}`}
                  >
                    + Add New Model
                  </button>
                </div>

                {newPart.is_new_model ? (
                  /* New Model Fields */
                  <div className="space-y-3.5 border border-zinc-900 bg-black/40 p-4 rounded-lg">
                    <div className="text-[10px] text-cyan-400 font-bold border-b border-zinc-900 pb-1 mb-2">NEW CAR MODEL SCHEMATICS:</div>
                    
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">Model Code/ID</label>
                        <input
                          type="text"
                          placeholder="e.g. axio161"
                          value={newPart.new_model_id}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_id: e.target.value }))}
                          className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">Model Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Toyota Axio NKE165"
                          value={newPart.new_model_name}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_name: e.target.value }))}
                          className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">Release Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2016"
                          value={newPart.new_model_year}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_year: e.target.value }))}
                          className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">Flag Emoji</label>
                        <input
                          type="text"
                          placeholder="e.g. 🇯🇵"
                          value={newPart.new_model_flag}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_flag: e.target.value }))}
                          className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">Region/Type</label>
                        <select
                          value={newPart.new_model_type}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_type: e.target.value }))}
                          className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-2.5 py-1.5 text-xs text-zinc-400 focus:outline-none transition-all font-mono"
                        >
                          <option value="Japan">Japan</option>
                          <option value="Indian">Indian</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Existing Model select list */
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                      Vehicle Model Association
                    </label>
                    <select
                      value={newPart.model_id}
                      onChange={(e) => setNewPart(prev => ({ ...prev, model_id: e.target.value }))}
                      className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-zinc-400 focus:outline-none transition-all font-mono"
                      required
                    >
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.flag} {m.name} ({m.year})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Core Part Data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                      OEM Part Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 13780-68L00"
                      value={newPart.part_number}
                      onChange={(e) => setNewPart(prev => ({ ...prev, part_number: e.target.value }))}
                      className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                      Part Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Engine, Brakes, Cooling..."
                      value={newPart.category}
                      onChange={(e) => setNewPart(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                      required
                      list="categories-list"
                    />
                    <datalist id="categories-list">
                      {categories.map(cat => <option key={cat} value={cat} />)}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                    OEM Part Description / Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spark plugs NGK BKR5E / Air Filter"
                    value={newPart.name}
                    onChange={(e) => setNewPart(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-zinc-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-800 focus:outline-none transition-all font-mono"
                    required
                  />
                </div>

                {addPartError && (
                  <div className="p-3 bg-red-950/20 border border-red-900/40 rounded text-[10px] text-red-400">
                    ❌ ERROR: {addPartError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={addingPart}
                  className="w-full bg-cyan-950/40 border border-cyan-800 hover:border-cyan-400 text-cyan-400 hover:text-white py-3.5 rounded text-xs font-display font-medium tracking-wider uppercase transition-all cursor-pointer text-center disabled:opacity-50"
                >
                  {addingPart ? 'SAVING DATA...' : 'COMMIT SPECIFICATION RECORD'}
                </button>

              </form>
            )}
          </div>
        </div>
      )}

      {/* OVERLAY PANEL 2: JSON BATCH IMPORT MODAL */}
      {isImportOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all font-mono">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-xl w-full p-6 shadow-2xl relative flex flex-col gap-5 overflow-hidden">
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div>
                <h3 className="text-sm font-bold font-display uppercase text-white tracking-wider">
                  Batch Import Catalog Data
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Upload flat parts arrays or nested model JSON schema files
                </p>
              </div>
              <button 
                onClick={() => { setIsImportOpen(false); setImportLogs([]); }}
                className="text-zinc-500 hover:text-white font-mono text-sm cursor-pointer"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Drag & Drop Frame */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-cyan-500/40 hover:bg-cyan-950/5 p-8 rounded-lg text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3.5 select-none"
            >
              <svg className="w-8 h-8 text-zinc-700 hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-xs text-zinc-300 font-bold uppercase">CLICK TO SELECT JSON FILE</p>
                <p className="text-[9px] text-zinc-600 mt-1">Supports flat arrays or JSX region database exports</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleJsonUpload}
                className="hidden"
                disabled={importingJson}
              />
            </div>

            {/* Import Status Console logs */}
            {importLogs.length > 0 && (
              <div className="space-y-1.5 flex-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                  Import Process Logs
                </label>
                <div className="bg-black border border-zinc-900 rounded p-3 h-44 overflow-y-auto text-[10px] leading-relaxed text-zinc-400 font-mono">
                  {importLogs.map((log, idx) => (
                    <div key={idx} className={log.includes('Error') ? 'text-red-400 font-bold' : log.includes('successfully') || log.includes('completed') ? 'text-cyan-400 font-bold' : 'text-zinc-400'}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}
