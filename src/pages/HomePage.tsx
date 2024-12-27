import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownTrayIcon, Bars3Icon, XMarkIcon, UsersIcon, CurrencyDollarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CreditCard from '../components/CreditCard';

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/login'); 
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <nav className="relative flex justify-between items-center p-4 bg-gray-900 shadow-lg">
        <div className="relative text-2xl font-bold text-purple-400">
          <span className="relative z-10">Financepus</span>
          <div className="absolute -z-10 left-0 top-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-50"></div>
        </div>

        <div className="hidden md:flex gap-4">
          <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded text-center transition duration-300">
            Credit Card
          </a>
          <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded text-center transition duration-300">
            Checking & Saving
          </a>
          <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded text-center transition duration-300">
            Customer
          </a>
          <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded text-center transition duration-300">
            Saving
          </a>
        </div>

        <div className="hidden md:flex gap-4">
          <button className="px-5 py-2 rounded font-semibold bg-gray-700 hover:bg-purple-500 transition">
            Sign In
          </button>
          <button
            onClick={handleGetStarted} 
            className="px-5 py-2 rounded font-semibold bg-purple-500 hover:bg-purple-400 transition"
          >
            Get Started
          </button>
        </div>

        <button className="md:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <Bars3Icon className="w-8 h-8 text-white" />
        </button>

        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 shadow-2xl flex flex-col p-6">
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-gray-300 hover:text-white mb-6"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-4">
              <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center transition">
                Credit Card
              </a>
              <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center transition">
                Checking & Saving
              </a>
              <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center transition">
                Customer
              </a>
              <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center transition">
                Saving
              </a>
              <button className="mt-6 px-5 py-2 bg-gray-700 rounded-lg hover:bg-purple-500 font-semibold transition">
                Sign In
              </button>
              <button
                onClick={handleGetStarted} 
                className="px-5 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 font-semibold transition"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </nav>

      <section className="flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-lg space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-purple-400">Your Easy</span> <br />
            <span>&</span> <br />
            <span className="text-purple-400">Flexible Finance</span> <br />
            <span>System</span>
          </h1>
          <p className="text-gray-400">
            Easy to use finance app for your everyday tasks, market trends and
            financial news.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleGetStarted}  
              className="bg-purple-500 px-5 py-3 rounded font-semibold hover:bg-purple-400 transition"
            >
              Get Started
            </button>
            <button className="flex items-center gap-2 bg-gray-700 px-5 py-3 rounded font-semibold text-gray-300 hover:bg-purple-500 transition">
              <ArrowDownTrayIcon className="w-5 h-5 text-purple-300" />
              <span>Download Now</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center mt-12 md:mt-0">
          <div className="absolute w-72 h-72 bg-purple-700 rounded-full opacity-70 blur-3xl"></div>
          <div className="relative transform hover:scale-105 transition duration-500 ease-in-out">
            <CreditCard />
          </div>
        </div>
      </section>

      <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-900 text-gray-400">
        <div className="flex items-center gap-4">
          <UsersIcon className="w-12 h-12 text-purple-400" />
          <div>
            <h3 className="text-white font-semibold">Easy Take Control</h3>
            <p>Manage everything in one place.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CurrencyDollarIcon className="w-12 h-12 text-purple-400" />
          <div>
            <h3 className="text-white font-semibold">Get Cashback</h3>
            <p>Earn cashback in every transaction.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="w-12 h-12 text-purple-400" />
          <div>
            <h3 className="text-white font-semibold">Get Clarity</h3>
            <p>View and analyze all your finances.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;