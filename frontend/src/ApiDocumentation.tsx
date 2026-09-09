import { useState } from 'react';

type ResponseEntry = { status: number; body: unknown; error?: string };

export default function ApiDocumentation() {
  const [responses, setResponses] = useState<Record<string, ResponseEntry>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';

  const endpoints = [
    {
      method: 'GET',
      path: '/api/employees',
      description: 'Ambil semua employee. Opsional: query params search, department, status.',
      fields: [
        { name: 'search', type: 'query', required: false, example: '', desc: 'Nama atau email untuk pencarian' },
        { name: 'department', type: 'query', required: false, example: '', desc: 'Filter berdasarkan department' },
        { name: 'status', type: 'query', required: false, example: '', desc: 'Filter status (Active/Inactive)' },
      ],
      methodColor: 'bg-green-500',
      execute: async () => {
        setLoading('/api/employees');
        const res = await fetch(`${baseUrl}/api/employees`);
        const body = await res.json();
        setResponses(prev => ({ ...prev, '/api/employees': { status: res.status, body } }));
        setLoading(null);
      },
    },
    {
      method: 'GET',
      path: '/api/employees/:id',
      description: 'Ambil detail satu employee berdasarkan ID.',
      fields: [
        { name: 'id', type: 'path', required: true, example: '550e8400-e29b-41d4-a716-446655440000', desc: 'UUID employee' },
      ],
      methodColor: 'bg-green-500',
      execute: async () => {
        const id = prompt('Masukkan employee ID (UUID):') || '';
        if (!id) return;
        setLoading(`/api/employees/${id}`);
        const res = await fetch(`${baseUrl}/api/employees/${id}`);
        const body = await res.json();
        setResponses(prev => ({ ...prev, [`/api/employees/${id}`]: { status: res.status, body } }));
        setLoading(null);
      },
    },
    {
      method: 'POST',
      path: '/api/employees',
      description: 'Buat employee baru. Body JSON dengan field name, email, phone, department, position, status.',
      fields: [
        { name: 'name', type: 'body', required: true, example: 'Budi Santoso', desc: 'Nama lengkap' },
        { name: 'email', type: 'body', required: true, example: 'budi@maspion.co.id', desc: 'Email unik' },
        { name: 'phone', type: 'body', required: false, example: '+62 812 3456 7890', desc: 'Nomor telepon' },
        { name: 'department', type: 'body', required: true, example: 'Engineering', desc: 'Departemen' },
        { name: 'position', type: 'body', required: true, example: 'Software Engineer', desc: 'Jabatan' },
        { name: 'status', type: 'body', required: false, example: 'Active', desc: 'Active atau Inactive' },
      ],
      methodColor: 'bg-blue-500',
      execute: async () => {
        const raw = prompt(
          'Masukkan JSON body (contoh: {"name":"Budi","email":"budi@co.id","department":"IT","position":"Dev"}):'
        ) || '';
        if (!raw) return;
        let body: Record<string, unknown>;
        try {
          body = JSON.parse(raw);
        } catch {
          alert('JSON tidak valid.');
          return;
        }
        setLoading('/api/employees');
        const res = await fetch(`${baseUrl}/api/employees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setResponses(prev => ({ ...prev, '/api/employees': { status: res.status, body: data } }));
        setLoading(null);
      },
    },
    {
      method: 'PUT',
      path: '/api/employees/:id',
      description: 'Update data employee. Kirim field yang diubah dalam body JSON.',
      fields: [
        { name: 'id', type: 'path', required: true, example: '550e8400-e29b-41d4-a716-446655440000', desc: 'UUID employee' },
        { name: 'name', type: 'body', required: false, example: 'Budi Santoso Baru', desc: 'Nama baru' },
        { name: 'email', type: 'body', required: false, example: 'budi@maspion.co.id', desc: 'Email baru' },
        { name: 'phone', type: 'body', required: false, example: '+62 812 3456 7890', desc: 'Telepon baru' },
        { name: 'department', type: 'body', required: false, example: 'Engineering', desc: 'Departemen baru' },
        { name: 'position', type: 'body', required: false, example: 'Senior Dev', desc: 'Jabatan baru' },
        { name: 'status', type: 'body', required: false, example: 'Inactive', desc: 'Status baru' },
      ],
      methodColor: 'bg-amber-500',
      execute: async () => {
        const id = prompt('Masukkan employee ID (UUID):') || '';
        if (!id) return;
        const raw = prompt(`Masukkan JSON body untuk update ID ${id}:`) || '';
        if (!raw) return;
        let body: Record<string, unknown>;
        try {
          body = JSON.parse(raw);
        } catch {
          alert('JSON tidak valid.');
          return;
        }
        setLoading(`/api/employees/${id}`);
        const res = await fetch(`${baseUrl}/api/employees/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setResponses(prev => ({ ...prev, [`/api/employees/${id}`]: { status: res.status, body: data } }));
        setLoading(null);
      },
    },
    {
      method: 'DELETE',
      path: '/api/employees/:id',
      description: 'Hapus employee berdasarkan ID.',
      fields: [
        { name: 'id', type: 'path', required: true, example: '550e8400-e29b-41d4-a716-446655440000', desc: 'UUID employee' },
      ],
      methodColor: 'bg-red-500',
      execute: async () => {
        const id = prompt('Masukkan employee ID (UUID) yang akan dihapus:') || '';
        if (!id) return;
        if (!confirm(`Yakin ingin menghapus employee dengan ID ${id}?`)) return;
        setLoading(`/api/employees/${id}`);
        const res = await fetch(`${baseUrl}/api/employees/${id}`, { method: 'DELETE' });
        const data = await res.json();
        setResponses(prev => ({ ...prev, [`/api/employees/${id}`]: { status: res.status, body: data } }));
        setLoading(null);
      },
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'Health check endpoint. Mengembalikan status server dan timestamp.',
      fields: [],
      methodColor: 'bg-green-500',
      execute: async () => {
        setLoading('/api/health');
        const res = await fetch(`${baseUrl}/api/health`);
        const body = await res.json();
        setResponses(prev => ({ ...prev, '/api/health': { status: res.status, body } }));
        setLoading(null);
      },
    },
  ];

  const renderFields = (fields: (typeof endpoints)[0]['fields']) => (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fields</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase">
              <th className="pb-2 pr-4 font-medium">Name</th>
              <th className="pb-2 pr-4 font-medium">Type</th>
              <th className="pb-2 pr-4 font-medium">Required</th>
              <th className="pb-2 pr-4 font-medium">Example</th>
              <th className="pb-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fields.map(f => (
              <tr key={f.name} className="hover:bg-gray-100">
                <td className="py-2 pr-4 font-mono text-gray-900">{f.name}</td>
                <td className="py-2 pr-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    f.type === 'body'
                      ? 'bg-blue-100 text-blue-700'
                      : f.type === 'path'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {f.type}
                  </span>
                </td>
                <td className="py-2 pr-4">{f.required ? 'Yes' : 'No'}</td>
                <td className="py-2 pr-4 font-mono text-gray-600">{f.example || '—'}</td>
                <td className="py-2 text-gray-600">{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">Tidak memerlukan parameter tambahan.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Mini Postman — langsung jalankan request dari sini dan lihat response live.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Base URL: {baseUrl}
        </div>
      </div>

      {/* Response Panel */}
      {Object.keys(responses).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Response History</h3>
            <button
              onClick={() => setResponses({})}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {Object.entries(responses).map(([path, entry]) => (
              <div key={path} className="px-5 py-3 flex items-center justify-between text-sm">
                <code className="font-mono text-gray-700 truncate max-w-[60%]">{path}</code>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    entry.status < 300
                      ? 'bg-green-50 text-green-700'
                      : entry.status < 500
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Endpoints */}
      <div className="space-y-6">
        {endpoints.map((ep) => (
          <div key={ep.path} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Method & Path */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <span className={`${ep.methodColor} text-white text-xs font-bold px-2.5 py-1 rounded-md font-mono uppercase tracking-wider`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-gray-900">{ep.path}</code>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={ep.execute}
                  disabled={loading === ep.path}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {loading === ep.path ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  Send Request
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm text-gray-600">{ep.description}</p>
            </div>

            {/* Fields */}
            <div className="px-5 py-4">{renderFields(ep.fields)}</div>

            {/* Response for this endpoint */}
            {responses[ep.path] && (
              <div className="border-t border-gray-100">
                <div className="px-5 py-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Response — Status {responses[ep.path].status}</span>
                </div>
                <div className="px-5 pb-5 bg-gray-900 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(responses[ep.path].body, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Penjelasan Singkat</h4>
        <ul className="text-sm text-blue-800 space-y-1.5 list-disc list-inside">
          <li>Klik <strong>Send Request</strong> untuk menjalankan API call langsung ke server.</li>
          <li>Parameter yang dibutuhkan akan muncul di kolom <strong>Fields</strong>.</li>
          <li>Hasil request (status code + JSON body) muncul di bawah endpoint masing-masing.</li>
          <li>Response history juga tercatat di panel atas untuk referensi cepat.</li>
        </ul>
      </div>
    </div>
  );
}
