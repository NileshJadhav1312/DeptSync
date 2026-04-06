export default function Card({ title, value, helper, onClick, className }) {
  return (
    <div className={`card ${onClick ? "cursor-pointer hover:shadow-lg transition-all" : ""} ${className || ""}`} onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
          </h3>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          +80%
        </span>
      </div>
      {helper ? (
        <p className="mt-3 text-sm text-slate-500">{helper}</p>
      ) : null}
    </div>
  );
}
