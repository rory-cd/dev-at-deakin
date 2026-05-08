import Modal from "@/components/Modal";
import { RiLoader4Line } from "@remixicon/react";

export default function LoadingOverlay({ show = false }) {
  return (
    <Modal show={show}>
      <RiLoader4Line className="animate-spin" size={50} />
    </Modal>
  );
}
