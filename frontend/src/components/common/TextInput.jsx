export default function TextInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <label className="block text-sm text-slate-600">
      <span className="mb-2 block font-medium text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </label>
  );
}
