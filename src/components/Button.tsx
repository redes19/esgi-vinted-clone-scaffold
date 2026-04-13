interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "ghost";
}

export default function Button({
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary: "bg-gray-900 text-white hover:bg-gray-700",
    danger: "bg-red-50 text-red-700 hover:bg-red-100",
    ghost:
      "bg-transparent text-gray-500 hover:bg-gray-100 border border-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150 ${styles[variant]}`}
    >
      {text}
    </button>
  );
}
