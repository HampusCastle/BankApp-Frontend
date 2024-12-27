import React from 'react';
import { useNavigate } from 'react-router-dom'; 

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

function Modal({ children, onClose, isOpen }: ModalProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative z-60">
        <button
          onClick={handleBackClick}
          className="absolute top-2 left-2 text-xl text-gray-500"
        >
          &#x2190; Back
        </button>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;