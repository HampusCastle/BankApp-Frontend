/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import BackButton from "./BackButton";

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUser(formData);
      navigate('/login');
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkBg p-6 rounded-lg w-full max-w-md relative">
        <BackButton />
        <h2 className="text-3xl font-bold text-secondary text-center mb-6">Register</h2>
        {error && <p className="text-accentRed text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-primary text-white font-semibold hover:bg-purple-400 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;