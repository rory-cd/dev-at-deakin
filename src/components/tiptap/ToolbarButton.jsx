export default function ToolbarButton({ isActive, onClick, Icon }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${isActive ? 'is-active' : ''}`}
      type="button"
    >
      <Icon size={18} />
    </button>
  );
}