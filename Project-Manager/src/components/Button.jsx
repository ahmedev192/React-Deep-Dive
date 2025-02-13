export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-md bg-stone-700 text-stone-400 text-xs md:text-base hover:bg-stone-600"
    >
      {children}
    </button>
  );
}
