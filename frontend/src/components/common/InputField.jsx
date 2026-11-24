export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg border bg-white text-gray-900
          placeholder:text-gray-400 transition
          focus:outline-none focus:ring-4
          ${
            error
              ? "border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-pulse-primary focus:ring-pulse-accent/20"
          }
        `}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}