import { useNavigate } from 'react-router-dom'; 


const BackButton = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBackClick} className="back-button">
      &#x2190; Back
    </button>
  );
};

export default BackButton;