'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AiPromptPage() {
  const [copied, setCopied] = useState(false);

  const systemPrompt = `You are a professional automotive database compiler. I will provide you with a raw list of car models, categories, and OEM part numbers. 

Please convert the raw list into a single, valid JSON object matching our structured database layout exactly.

### Target JSON Schema Format:
\`\`\`json
{
  "japan": [  // The region group code as a lowercase key (e.g. "japan", "indian")
    {
      "id": "model-slug-id", // Unique ID slug. Lowercase alphanumeric and hyphens only (e.g., "alto800", "wagonr-stingray")
      "name": "Vehicle Model Name", // Clear display name (e.g., "Suzuki Alto 800")
      "year": "Release Year", // e.g. "2015"
      "flag": "Flag Emoji", // e.g. "🇯🇵" for Japan, "🇮🇳" for Indian
      "type": "Display Region Type", // e.g. "Japan", "Indian"
      "parts": [
        {
          "category": "Category Name", // Map to: "Engine", "Brakes", "Suspension", "Body", "Electrical", "Steering", "Cooling", "Transmission", or "Miscellaneous"
          "items": [
            {
              "name": "Part Description / Label", // e.g. "Air filter"
              "pn": "OEM Part Number" // Exact parts catalog number (e.g. "13780-68L00"). Use "—" if not known.
            }
          ]
        }
      ]
    }
  ]
}
\`\`\`

### Data Conversion Rules:
1. **Model Slug IDs**: The "id" field MUST be lowercase, contain only letters, numbers, and hyphens. Replace spaces or special characters with hyphens.
2. **Category Names**: Standardize categories. If a raw item category is "Air Filter" or "Spark Plugs", map it to "Engine". If it is "Front shock" or "Bushes", map to "Suspension".
3. **Region Keys**: Standardize the top-level keys to match the region group, lowercase (e.g. "japan", "indian").
4. **Valid JSON**: Ensure all double quotes, brackets, and colons are properly closed. Output ONLY the raw JSON content so that I can copy-paste it directly into my JSON import panel.

Here is the raw car parts data to parse:
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="border-b border-zinc-800 pb-5">
          <h2 className="text-xl font-semibold text-white">AI Data Import Prompt Builder</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Copy the structured prompt below to instruct Claude, ChatGPT, or any LLM to format raw vehicle parts list data into the exact JSON catalog import structure.
          </p>
        </div>

        {/* Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Prompt Copy Side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Copy-Paste Prompt Template</span>
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4.5 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                {copied ? 'PROMPT COPIED!' : 'COPY PROMPT'}
              </button>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={systemPrompt + "[PASTE RAW DATA DETAILS HERE]"}
                className="w-full h-[360px] bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-[11px] font-mono text-zinc-400 select-all focus:outline-none resize-none leading-relaxed"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 to-transparent h-12 pointer-events-none rounded-b-xl" />
            </div>
            <p className="text-[11px] text-zinc-500 leading-normal">
              💡 **How to use**: Click "Copy Prompt", open Claude or ChatGPT, paste the prompt, and append your raw vehicle data at the bottom. Save the resulting output as a `.json` file and upload it in the Parts Inventory importer.
            </p>
          </div>

          {/* Guidelines / Structural Diagram (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-850 rounded-xl p-5 flex flex-col gap-4 text-xs">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Schema Validation Rules</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Database tags and values must adhere strictly to these types:</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">🏷️ Standard Categories:</span>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Only use: <code className="text-blue-400">Engine</code>, <code className="text-blue-400">Brakes</code>, <code className="text-blue-400">Suspension</code>, <code className="text-blue-400">Electrical</code>, <code className="text-blue-400">Steering</code>, <code className="text-blue-400">Cooling</code>, <code className="text-blue-400">Transmission</code>, <code className="text-blue-400">Body</code>, <code className="text-blue-400">Miscellaneous</code>.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">🌍 Region Group Keys:</span>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  The top-level key maps vehicles to region columns. Use lowercase: <code className="text-blue-400">&quot;japan&quot;</code> or <code className="text-blue-400">&quot;indian&quot;</code>.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">🚗 Model Attribute Keys:</span>
                <div className="text-zinc-500 text-[11px] space-y-1 font-mono">
                  <div>• <code className="text-zinc-300 font-semibold">id</code>: Lowercase slug ID (e.g. axio161)</div>
                  <div>• <code className="text-zinc-300 font-semibold">name</code>: Full title (e.g. Toyota Axio NKE165)</div>
                  <div>• <code className="text-zinc-300 font-semibold">year</code>: Release year string (e.g. 2016)</div>
                  <div>• <code className="text-zinc-300 font-semibold">flag</code>: Country flag emoji (e.g. 🇯🇵)</div>
                  <div>• <code className="text-zinc-300 font-semibold">type</code>: Display label (e.g. Japan, Indian)</div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">🛠️ Part Item format:</span>
                <div className="text-zinc-500 text-[11px] space-y-1 font-mono">
                  <div>• <code className="text-zinc-300 font-semibold">name</code>: Part label description</div>
                  <div>• <code className="text-zinc-300 font-semibold">pn</code>: Part Number (string, e.g. 13780-68L00)</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
