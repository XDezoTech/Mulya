import React from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Modal = ({ onClose, children, onPrev, onNext }) => {
  return ReactDOM.createPortal(
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative h-full max-h-[80%] w-[70%] rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 cursor-pointer text-4xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex h-full flex-col items-center justify-between p-4">
          <div className="flex flex-grow items-center justify-center">
            <div className="flex h-96 w-96 items-center justify-center">
              {children}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onPrev}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaArrowLeft size={24} />
            </button>
            <div className="mx-4 flex">
              {/* Thumbnails go here */}
              {children}
            </div>
            <button
              onClick={onNext}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
