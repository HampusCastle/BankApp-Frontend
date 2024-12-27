import { useState } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ProfileEditFormProps {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
  onSaveChanges: (data: ProfileData) => void;
}

const ProfileEditForm = ({
  initialFirstName,
  initialLastName,
  initialEmail,
  onSaveChanges,
}: ProfileEditFormProps) => {
  const [firstName, setFirstName] = useState<string>(initialFirstName);
  const [lastName, setLastName] = useState<string>(initialLastName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedProfile: ProfileData = { firstName, lastName, email, password };
    onSaveChanges(updatedProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-white">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          className="mt-1 block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-white">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          className="mt-1 block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange(e, 'email')}
          className="mt-1 block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          New Password (Leave blank to keep current)
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(e, 'password')}
          className="mt-1 block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleInputChange(e, 'confirmPassword')}
          className="mt-1 block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
