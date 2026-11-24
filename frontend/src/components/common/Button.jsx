const variants = {
  primary:
    "bg-pulse-primary text-white hover:bg-pulse-primary-dark focus:ring-pulse-accent/30",
  outline:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        px-4 py-3 rounded-lg font-medium
        transition focus:outline-none focus:ring-4
        disabled:opacity-60 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
}