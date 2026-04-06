export default function Table({ title, columns, data }) {
  return (
    <div className="card mt-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <button className="btn-secondary">View all</button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-slate-400">
              {columns.map((col) => (
                <th key={col.key} className="py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, index) => (
              <tr key={index} className="text-slate-700">
                {columns.map((col) => (
                  <td key={col.key} className="py-4">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
