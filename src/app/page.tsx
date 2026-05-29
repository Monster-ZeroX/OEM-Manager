'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

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

export default function DashboardPage() {
  // Data states
  const [parts, setParts] = useState<Part[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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

  // Debouncing search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial loads
  useEffect(() => {
    fetchModels();
    fetchCategories();
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

      if (res.ok && data.success) {
        setParts(data.data);
        setTotalParts(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Failed to sync parts inventory:', err);
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
      console.error('Failed to fetch models list:', err);
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
      console.error('Failed to fetch categories list:', err);
    }
  };

  // Handler: Add Manual Part
  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingPart(true);
    setAddPartError(null);
    setAddPartSuccess(false);

    try {
      const res = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPart),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAddPartSuccess(true);
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

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        
        setImportLogs((prev) => [...prev, 'JSON successfully parsed.', 'Sending batch upload payload...']);

        const res = await fetch('/api/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: text,
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setImportLogs((prev) => [...prev, ...data.logs, 'Database transaction committed successfully!']);
          fetchParts();
          fetchModels();
          fetchCategories();
        } else {
          setImportLogs((prev) => [...prev, `Server Error: ${data.error || 'Failed to process import file.'}`]);
        }
      } catch (err: any) {
        setImportLogs((prev) => [...prev, `Critical Parser Error: ${err.message}`]);
      } finally {
        setImportingJson(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* TOP BAR / STATS BANNER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Parts Inventory Catalog</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Search and filter OEM specification numbers and vehicle model compatibilities.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              ADD RECORD
            </button>
            <button
              onClick={() => setIsImportOpen(true)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              IMPORT JSON
            </button>
          </div>
        </div>

        {/* QUICK NUMBERS STATS SUMMARY */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Total Parts Indexed</div>
            <div className="text-xl font-bold text-white mt-1.5 font-mono">{totalParts}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Supported Models</div>
            <div className="text-xl font-bold text-white mt-1.5 font-mono">{models.length}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Unique Categories</div>
            <div className="text-xl font-bold text-white mt-1.5 font-mono">{categories.length}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">API Platform</div>
            <div className="text-xl font-bold text-blue-400 mt-1.5 font-mono">v1 ACTIVE</div>
          </div>
        </div>

        {/* FILTER CONTROLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 bg-zinc-900/20 border border-zinc-850 p-4 rounded-xl">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search by part number, name, or vehicle compatibility..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg pl-9 pr-3.5 py-2.5 text-base md:text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-mono"
            />
            <div className="absolute left-3 top-3.5 text-zinc-600 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Model selection */}
          <div className="md:col-span-4">
            <select
              value={selectedModel}
              onChange={(e) => { setSelectedModel(e.target.value); setPage(1); }}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3.5 py-2.5 text-base md:text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer font-sans"
            >
              <option value="">All Vehicles / Models</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.flag} {m.name} ({m.year})
                </option>
              ))}
            </select>
          </div>

          {/* Category selection */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3.5 py-2.5 text-base md:text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer font-sans"
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

        {/* PARTS TABLE AREA */}
        <div className="bg-zinc-900/20 border border-zinc-850 rounded-xl overflow-hidden shadow-sm relative min-h-[300px] flex flex-col justify-between">
          
          {partsLoading ? (
            <div className="absolute inset-0 bg-zinc-950/80 z-20 flex items-center justify-center text-xs font-mono text-zinc-400">
              <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Retrieving catalog parts...</span>
              </div>
            </div>
          ) : parts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <svg className="w-10 h-10 text-zinc-700 mb-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2M9 5h6" />
              </svg>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">No Records Found</p>
              <p className="text-[11px] text-zinc-600 mt-1 max-w-sm px-6">
                Try loosening your filters, checking spelling, or adding a new manual part specification.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              {/* Desktop View Table */}
              <table className="w-full text-left border-collapse text-xs hidden sm:table">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                    <th className="px-6 py-4">Part Number</th>
                    <th className="px-6 py-4">Part Description</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Compatible Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/80">
                  {parts.map((part) => (
                    <tr key={part.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="px-6 py-4 text-blue-400 font-bold select-all tracking-wide font-mono">
                        {part.part_number}
                      </td>
                      <td className="px-6 py-4 text-zinc-200 font-medium">
                        {part.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] border border-zinc-800 bg-zinc-900 text-zinc-400 font-medium uppercase">
                          {part.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 font-sans">
                        <span className="mr-1.5">{part.model_flag}</span> {part.model_name}
                        <span className="text-[10px] text-zinc-500 ml-2 font-mono uppercase">({part.model_type})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card List View */}
              <div className="flex flex-col sm:hidden divide-y divide-zinc-900">
                {parts.map((part) => (
                  <div key={part.id} className="p-4 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between">
                      <span className="text-blue-400 font-bold text-sm tracking-wide font-mono select-all">
                        {part.part_number}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] border border-zinc-800 bg-zinc-900 text-zinc-400 font-medium uppercase">
                        {part.category}
                      </span>
                    </div>
                    <div className="text-zinc-200 text-xs font-semibold">
                      {part.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 flex items-center justify-between font-sans">
                      <span>Compatibility:</span>
                      <span className="text-zinc-300 font-medium">{part.model_flag} {part.model_name} ({part.model_type})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-zinc-850 p-4 font-sans text-xs">
              <span className="text-zinc-500">
                Showing <span className="text-zinc-400">{page}</span> of <span className="text-zinc-400">{totalPages}</span> pages ({totalParts} total parts)
              </span>
              
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-semibold text-xs active:scale-95 bg-zinc-950"
                >
                  PREV
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-semibold text-xs active:scale-95 bg-zinc-950"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY PANEL 1: MANUAL ADD PART DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all font-sans">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-5 overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase text-white tracking-wider">
                  Create OEM Part Record
                </h3>
                <p className="text-[10px] text-zinc-500">
                  Input manual specs directly into catalog database schema
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
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-emerald-500 text-emerald-400 flex items-center justify-center text-lg font-bold animate-bounce">
                  ✓
                </div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Record Saved Successfully</p>
                <p className="text-[10px] text-zinc-500">The part has been indexed in the catalog database.</p>
              </div>
            ) : (
              <form onSubmit={handleAddPart} className="space-y-4">
                
                {/* Model toggle switcher */}
                <div className="grid grid-cols-2 gap-2 border border-zinc-950 bg-zinc-950/40 p-1.5 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setNewPart(prev => ({ ...prev, is_new_model: false }))}
                    className={`py-1.5 rounded-lg font-medium tracking-wider text-center cursor-pointer transition-all ${!newPart.is_new_model ? 'bg-zinc-850 text-blue-400 border border-zinc-800 shadow-sm' : 'text-zinc-500'}`}
                  >
                    Select Model
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPart(prev => ({ ...prev, is_new_model: true }))}
                    className={`py-1.5 rounded-lg font-medium tracking-wider text-center cursor-pointer transition-all ${newPart.is_new_model ? 'bg-zinc-850 text-blue-400 border border-zinc-800 shadow-sm' : 'text-zinc-500'}`}
                  >
                    + Add New Model
                  </button>
                </div>

                {newPart.is_new_model ? (
                  /* New Model Form Fields */
                  <div className="space-y-3.5 border border-zinc-950 bg-zinc-950/20 p-4 rounded-xl">
                    <div className="text-[10px] text-blue-400 font-bold border-b border-zinc-950 pb-1.5 mb-2 tracking-wider uppercase">NEW MODEL PARAMETERS:</div>
                    
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-medium text-zinc-500 uppercase">Model Code/ID</label>
                        <input
                          type="text"
                          placeholder="e.g. axio161"
                          value={newPart.new_model_id}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_id: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-medium text-zinc-500 uppercase">Model Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Toyota Axio NKE165"
                          value={newPart.new_model_name}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_name: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-medium text-zinc-500 uppercase">Release Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2016"
                          value={newPart.new_model_year}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_year: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-medium text-zinc-500 uppercase">Flag Emoji</label>
                        <input
                          type="text"
                          placeholder="e.g. 🇯🇵"
                          value={newPart.new_model_flag}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_flag: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-medium text-zinc-500 uppercase">Region Type</label>
                        <select
                          value={newPart.new_model_type}
                          onChange={(e) => setNewPart(prev => ({ ...prev, new_model_type: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-zinc-400 focus:outline-none transition-all"
                        >
                          <option value="Japan">Japan</option>
                          <option value="Indian">Indian</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Existing Model Selector list */
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-medium text-zinc-500 uppercase">
                      Vehicle Model Association
                    </label>
                    <select
                      value={newPart.model_id}
                      onChange={(e) => setNewPart(prev => ({ ...prev, model_id: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2.5 text-base md:text-xs text-zinc-400 focus:outline-none transition-all cursor-pointer"
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

                {/* Core Part Data Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-medium text-zinc-500 uppercase">
                      OEM Part Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 13780-68L00"
                      value={newPart.part_number}
                      onChange={(e) => setNewPart(prev => ({ ...prev, part_number: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-medium text-zinc-500 uppercase">
                      Part Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Engine, Brakes, Cooling..."
                      value={newPart.category}
                      onChange={(e) => setNewPart(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all"
                      required
                      list="categories-list"
                    />
                    <datalist id="categories-list">
                      {categories.map(cat => <option key={cat} value={cat} />)}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase">
                    OEM Part Description / Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spark plugs NGK BKR5E / Air Filter"
                    value={newPart.name}
                    onChange={(e) => setNewPart(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-base md:text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all"
                    required
                  />
                </div>

                {addPartError && (
                  <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-[10px] text-red-400">
                    ❌ ERROR: {addPartError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={addingPart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all font-sans">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative flex flex-col gap-5 overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase text-white tracking-wider">
                  Batch Import Catalog Data
                </h3>
                <p className="text-[10px] text-zinc-500">
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

            {/* Drag & Drop Frame Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-blue-500/40 hover:bg-blue-950/5 p-8 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 select-none"
            >
              <svg className="w-8 h-8 text-zinc-600 hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-xs text-zinc-300 font-bold uppercase tracking-wider">SELECT JSON FILE</p>
                <p className="text-[10px] text-zinc-500 mt-1">Supports flat arrays or JSX region database exports</p>
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
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 h-44 overflow-y-auto text-[10px] leading-relaxed text-zinc-400 font-mono">
                  {importLogs.map((log, idx) => (
                    <div key={idx} className={log.includes('Error') ? 'text-red-400 font-bold' : log.includes('successfully') || log.includes('completed') ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
