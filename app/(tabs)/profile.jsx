import CustomButton from "@/components/CustomButton";
import { useAuthContext } from '../../hooks/useAuth';

// app/(tabs)/profile.tsx - User Profile Screen
const ProfileScreen = ({ signOut }) => {
  const { user, role } = useAuthContext();
  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        {/* Placeholder for person icon */}
        <span style={{ fontSize: 100, color: Colors.darkGray }}>👤</span>
        <span style={styles.profileName}>{user?.username}</span>
        <span style={styles.profileRole}>{role?.replace(/_/g, ' ').toUpperCase()}</span>
        <span style={styles.profileInfo}>ID: {user?.id}</span>
        {/* Add more user info here */}
        <CustomButton title="Sign Out" onPress={signOut} style={styles.signOutButton} />
      </div>
    </div>
  );
};

export default ProfileScreen;