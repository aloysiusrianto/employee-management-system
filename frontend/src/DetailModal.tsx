export default function DetailModal({ employee, onClose }: { employee: import('./types').Employee; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{employee.name.charAt(0)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-lg">
              {employee.employeeId}
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                employee.status === 'Active'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  employee.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              {employee.status}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{employee.name}</h2>
        </div>

        {/* Details */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Email', value: employee.email, icon: '✉️' },
              { label: 'Phone', value: employee.phone || '—', icon: '📱' },
              { label: 'Department', value: employee.department, icon: '🏢' },
              { label: 'Position', value: employee.position, icon: '💼' },
              { label: 'Created', value: new Date(employee.createdAt).toLocaleString('id-ID'), icon: '📅' },
              { label: 'Last Updated', value: new Date(employee.updatedAt).toLocaleString('id-ID'), icon: '🔄' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-lg">{icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
