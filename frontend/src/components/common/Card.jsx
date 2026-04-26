export default function Card({ title, value, helper, onClick, className }) {
  return (
    <div className={`card ${onClick ? "cursor-pointer hover:shadow-2xl hover:scale-103 transition-all" : ""} ${className || ""}`} onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-800">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
          </h3>
        </div>
      </div>
      {helper ? (
        <p className="mt-3 text-sm text-slate-500">{helper}</p>
      ) : null}
    </div>
  );
}
