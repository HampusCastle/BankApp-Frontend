import { ReactNode } from "react";
import BackButton from "./BackButton";

interface CardProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  color: string;
}

const Card = ({ title, icon, onClick, color }: CardProps) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg bg-black text-white cursor-pointer hover:shadow-2xl transition-all ${color}`}
      onClick={onClick}
    >
      <BackButton />
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
};

export default Card;