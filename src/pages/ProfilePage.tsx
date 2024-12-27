import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/profileApi';
import ProfileDetails from '../components/ProfileDetails';
import ProfileEditForm from '../components/ProfileEditForm';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async (data: ProfileData) => {
    await updateUserProfile(data.firstName, data.lastName, data.email, data.password);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      {userProfile && (
        <>
          {isEditing ? (
            <ProfileEditForm
              initialFirstName={userProfile.firstName}
              initialLastName={userProfile.lastName}
              initialEmail={userProfile.email}
              onSaveChanges={handleSaveChanges}
            />
          ) : (
            <ProfileDetails profile={userProfile} />
          )}
          <button onClick={handleEditToggle} className="mt-4 bg-blue-500 text-white p-2 rounded">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
