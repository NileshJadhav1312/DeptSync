export default function SectionCard({ title, description, children }) {
  return (
    <div className="card">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="mt-5 grid gap-4">{children}</div>
    </div>
  );
}
