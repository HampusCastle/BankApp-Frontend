import ScheduledPayments from "../components/ScheduledPayments"; 

const ScheduledPaymentPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Scheduled Payments</h2>
      <ScheduledPayments /> 
    </div>
  );
};

export default ScheduledPaymentPage;