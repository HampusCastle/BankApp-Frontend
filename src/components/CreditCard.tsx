const CreditCard = () => {
    return (
      <div className="relative w-80 h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl text-white p-4 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-500 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-8 -left-8 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-2xl"></div>
  
        <div className="absolute top-4 left-4 flex items-center">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3"></div>
        </div>
  
        <div className="absolute top-4 right-4 w-12 h-8 bg-yellow-300 rounded-md shadow-inner flex items-center justify-center">
          <div className="w-6 h-6 border border-yellow-700 rounded-sm"></div>
        </div>
  
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xl tracking-widest font-mono">
          4312 9578 4206 9876
        </div>
  
        <div className="absolute bottom-4 left-4 text-sm">
          <div className="text-gray-300">VALID THRU</div>
          <div className="text-white">09/26</div>
        </div>
  
        <div className="absolute bottom-4 right-4 text-lg font-bold text-yellow-400">
          Mastercard
        </div>
      </div>
    );
  };
  
  export default CreditCard;