import React, { useEffect, useRef, useState } from "react";
import { VscDebugDisconnect } from "react-icons/vsc";

const NetworkDisconnectionModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current || !trigger.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [modalOpen]);

  return (
    <>
      <div
        className={`fixed left-0 top-0 flex generalBG bg-opacity-30 h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${
          modalOpen ? "block" : "hidden"
        }`}>
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          onBlur={() => setModalOpen(false)}
          className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center  md:px-[70px] md:py-[60px]">
          <div className="flex flex-col items-center justify-center">
            <h3 className="pb-[18px] text-xl font-semibold text-dark  sm:text-2xl">
              Network Disconnection
            </h3>
            <span className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-red-600`}></span>
            <div className="mb-6 text-center text-red-600">
              <VscDebugDisconnect
                accentHeight={"green"}
                size={80}
              />
            </div>

            <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
              It seems you have lost connection to the network. Please check your internet
              connection and try again.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-1/2 px-3">
              <button
                onClick={() => setModalOpen(false)}
                className="block w-full text-neutral-600 rounded-md border border-stroke p-3 text-center text-base font-medium  transition hover:border-red-600 hover:bg-red-600 hover:text-white ">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkDisconnectionModal;
