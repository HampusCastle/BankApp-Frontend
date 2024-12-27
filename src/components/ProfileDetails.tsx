interface ProfileDetailsProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <div>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default ProfileDetails;
