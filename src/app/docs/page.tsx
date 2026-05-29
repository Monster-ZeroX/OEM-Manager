'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function ApiDocsPage() {
  const [mounted, setMounted] = useState(false);
  const [hostAddress, setHostAddress] = useState('oem-manager.vercel.app');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setHostAddress(window.location.host);
    }
  }, []);

  const curlExample = `curl -X GET "https://${hostAddress}/api/v1/parts?search=Alto&limit=5" \\
  -H "Authorization: Bearer oem_pk_your_generated_key_here"`;

  const nodeExample = `// Install node-fetch if using Node < 18: npm install node-fetch
// For Node 18+, fetch is available globally.

const API_KEY = 'oem_pk_your_generated_key_here';
const BASE_URL = 'https://${hostAddress}/api/v1/parts';

async function fetchAltoParts() {
  try {
    const params = new URLSearchParams({
      search: 'Alto',
      limit: '5',
      page: '1'
    });

    const response = await fetch(\`\${BASE_URL}?\${params.toString()}\`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY, // Or 'Authorization': \`Bearer \${API_KEY}\`
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorPayload = await response.json();
      throw new Error(\`API HTTP Error \${response.status}: \${errorPayload.error || response.statusText}\`);
    }

    const result = await response.json();
    console.log(\`Successfully retrieved \${result.data.length} parts:\`, result.data);
  } catch (error) {
    console.error('Fetch execution failed:', error.message);
  }
}

fetchAltoParts();`;

  const pythonExample = `import requests

API_KEY = "oem_pk_your_generated_key_here"
BASE_URL = "https://${hostAddress}/api/v1/parts"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Accept": "application/json"
}

params = {
    "search": "Alto",
    "limit": 5,
    "page": 1
}

try:
    response = requests.get(BASE_URL, headers=headers, params=params)
    
    if response.status_code == 200:
        payload = response.json()
        print(f"Success! Total matches: {payload['pagination']['total']}")
        for part in payload['data']:
            print(f"- {part['part_number']}: {part['name']} (Fits {part['model_name']})")
    elif response.status_code == 401:
        print("Error: Unauthorized session. Verify API key is active.")
    else:
        print(f"Error {response.status_code}: {response.text}")
except requests.exceptions.RequestException as e:
    print(f"Connection failed: {e}")`;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="border-b border-zinc-800 pb-5">
          <h2 className="text-xl font-semibold text-white">API Integration Reference</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Comprehensive developer specs for querying vehicle models and parts specifications via HTTP endpoints.
          </p>
        </div>

        {/* 1. AUTHENTICATION */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">1. Authentication</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The API endpoint requires authentication using a developer client key generated in the <a href="/keys" className="text-blue-400 hover:underline">Keys Control Center</a>.
            Provide this key in your HTTP request using either of the following standard headers:
          </p>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-2">
            <div>
              <span className="text-zinc-500 mr-2">Option A:</span>
              <span className="text-white">Authorization:</span> Bearer <span className="text-blue-400">oem_pk_your_api_key</span>
            </div>
            <div className="border-t border-zinc-800 my-2 pt-2" />
            <div>
              <span className="text-zinc-500 mr-2">Option B:</span>
              <span className="text-white">x-api-key:</span> <span className="text-blue-400">oem_pk_your_api_key</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500">
            ⚠️ Note: Keep your API key secure. Never expose it in client-side applications or public repositories.
          </p>
        </section>

        {/* 2. ENDPOINT REFERENCE */}
        <section className="space-y-4 pt-4 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">2. Endpoint Reference</h3>
            <span className="bg-blue-900/30 text-blue-400 border border-blue-800/40 text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
              GET
            </span>
            <code className="text-xs text-white font-mono bg-zinc-900 px-2 py-1 rounded">/api/v1/parts</code>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Queries the inventory database and returns a paginated list of catalog parts.
          </p>

          {/* Query Parameters Table */}
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-850 bg-zinc-900/40 text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                  <th className="px-4 py-3">Parameter</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Default</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">search</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">string</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">—</td>
                  <td className="px-4 py-3 leading-relaxed">
                    Filter by part numbers, descriptions, or vehicle model compatibility names (e.g. <code className="bg-zinc-900 px-1 py-0.5 rounded text-[10px]">Alto</code>). Matches partially and case-insensitively.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">model</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">string</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">—</td>
                  <td className="px-4 py-3 leading-relaxed">
                    Filter by the unique model slug identifier (e.g. <code className="bg-zinc-900 px-1 py-0.5 rounded text-[10px]">alto800</code>). Matches exactly.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">category</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">string</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">—</td>
                  <td className="px-4 py-3 leading-relaxed">
                    Filter by the exact part category (e.g. <code className="bg-zinc-900 px-1 py-0.5 rounded text-[10px]">Engine</code>).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">page</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">integer</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">1</td>
                  <td className="px-4 py-3 leading-relaxed">
                    Target page offset for pagination.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">limit</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">integer</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">50</td>
                  <td className="px-4 py-3 leading-relaxed">
                    Number of items to retrieve per request. Capped at a maximum value of <code className="bg-zinc-900 px-1 py-0.5 rounded text-[10px]">100</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. RESPONSE SCHEMA */}
        <section className="space-y-3 pt-4 border-t border-zinc-900">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">3. Response Format</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Successful requests return HTTP Status <code className="text-emerald-400 font-mono">200 OK</code> with a JSON response payload:
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 font-mono text-xs overflow-x-auto text-zinc-300">
            <pre>{`{
  "success": true,
  "data": [
    {
      "id": 1615,
      "category": "Engine",
      "name": "Air filter",
      "part_number": "13780-68L00",
      "model_name": "Suzuki Alto 800",
      "model_year": "2015",
      "model_type": "Indian"
    }
  ],
  "pagination": {
    "total": 114,
    "page": 1,
    "limit": 1,
    "totalPages": 114
  }
}`}</pre>
          </div>
        </section>

        {/* 4. CODE SAMPLES */}
        <section className="space-y-4 pt-4 border-t border-zinc-900">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">4. Integration Samples</h3>
          <p className="text-xs text-zinc-400">
            Select your developer stack to quickly interface with the inventory catalog:
          </p>

          <div className="space-y-4">
            {/* cURL */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono block">cURL Terminal Command</span>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs font-mono text-blue-400 overflow-x-auto select-all leading-normal">
                {curlExample}
              </div>
            </div>

            {/* JavaScript Fetch */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono block">JavaScript / Node.js (Fetch)</span>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 text-[11px] font-mono text-zinc-300 overflow-x-auto select-all leading-relaxed whitespace-pre">
                {nodeExample}
              </div>
            </div>

            {/* Python requests */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono block">Python (requests library)</span>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 text-[11px] font-mono text-zinc-300 overflow-x-auto select-all leading-relaxed whitespace-pre">
                {pythonExample}
              </div>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
