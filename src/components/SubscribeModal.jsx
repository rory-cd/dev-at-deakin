import Modal from "@/components/Modal";
import { RiCloseLine, RiRobot2Line, RiStarLine, RiSunLine } from "@remixicon/react";
import ButtonSecondary from "@/components/ButtonSecondary";

export default function SubscribeModal({ show, onSubscribe, onClose }) {

  return (
    <Modal show={show} onClose={onClose}>
      <div className="bg-bg-front rounded-xl shadow-xl/30 p-15 flex relative flex-col justify-center items-center gap-2 min-w-120">
        <button 
          className="absolute top-10 right-10 cursor-pointer text-text-secondary"
          onClick={onClose}
        >
          <RiCloseLine />
        </button>

        {/* Main */}
        <h3 className="font-heading uppercase text-[2.5rem] font-[500]">
          Get Premium
        </h3>
        <p className="text-center">
          Subscribe now and receive<br />the first month <span className="text-(--clr-primary) font-bold">FREE!</span>
        </p>
        
        {/* Features */}
        <div className="flex flex-row gap-5 mid-light-v-gradient px-4 py-1 items-center rounded-2xl my-5">
          <div className="flex flex-col p-4 items-center ">
            <p className="text-5xl font-bold">
              $5
            </p>
            <p>per month</p>
          </div>
          <ul className="space-y-2 p-4">
            <li><RiSunLine className="text-(--clr-primary) float-left mr-3" />Light mode</li>
            <li><RiRobot2Line className="text-(--clr-primary) float-left mr-3" />AI integration</li>
            <li><RiStarLine className="text-(--clr-primary) float-left mr-3" />Priority questions</li>
          </ul>
        </div>

        {/* Button */}
        <ButtonSecondary type={"button"} onClick={onSubscribe}>
          Subscribe
        </ButtonSecondary>
        <a onClick={onClose} className="text-link cursor-pointer mt-2">No thanks</a>

      </div>
    </Modal>
  );
}