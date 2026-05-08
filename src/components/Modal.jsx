import { createPortal } from 'react-dom';   // Ensures modal sits on top of every other element

export default function Modal({ show=true, onClose, children }) {
  if (!show) return null;

  return createPortal(
    <div
      className="z-50 fixed inset-0 flex items-center justify-center min-w-100 bg-black/50"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // Render to body
  );
}