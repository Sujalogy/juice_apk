import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuth';
import CustomButton from '@/components/CustomButton';
import MessageBox from '@/components/MessageBox';
// app/(tabs)/memberships.tsx - Membership Management/Status Screen
const MembershipsScreen = () => {
  const { role } = useAuthContext();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setLoading(true);
    // Simulate API call to fetch memberships
    // For stall owner/admin: fetch all memberships
    // For user: fetch their own membership status
    return new Promise((resolve) => {
      setTimeout(() => {
        if (role === 'juice_stall_owner' || role === 'super_admin') {
          const mockMemberships = [
            { _id: 'm1', planName: 'Monthly Unlimited', price: 29.99, duration: 'monthly', customerId: 'c1', customerName: 'Alice', startDate: '2025-07-01', endDate: '2025-07-31', status: 'active' },
            { _id: 'm2', planName: 'Weekly 5 Juices', price: 15.00, duration: 'weekly', customerId: 'c2', customerName: 'Bob', startDate: '2025-07-15', endDate: '2025-07-22', status: 'expired' },
          ];
          setMemberships(mockMemberships);
        } else if (role === 'user') {
          const mockUserMembership = [
            { _id: 'm3', planName: 'Monthly Unlimited', price: 29.99, duration: 'monthly', customerId: 'user_current_id', customerName: 'You', startDate: '2025-07-10', endDate: '2025-08-09', status: 'active' },
          ];
          setMemberships(mockUserMembership);
        }
        setLoading(false);
        resolve(true);
      }, 1200);
    });
  };

  const handleAddMembership = () => {
    setMessage('Add Membership functionality would be here!');
    setMessageVisible(true);
  };

  const handleEditMembership = (membership) => {
    setMessage(`Edit Membership functionality for ${membership.planName} would be here!`);
    setMessageVisible(true);
  };

  const handleDeleteMembership = async (membershipId) => {
    setMessage('');
    setMessageVisible(false);
    // Simulate API call to delete membership
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setMemberships(memberships.filter(m => m._id !== membershipId));
        setMessage('Membership deleted successfully!');
        setMessageVisible(true);
        setLoading(false);
        resolve(true);
      }, 500);
    });
  };


  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        <span style={styles.headerTitle}>Memberships</span>

        {(role === 'juice_stall_owner' || role === 'super_admin') && (
          <CustomButton title="Add New Membership Plan" onPress={handleAddMembership} style={styles.addButton} />
        )}

        {loading ? (
          <div style={{ ...styles.activityIndicator, ...styles.loadingIndicator }}>Loading...</div> // Simplified ActivityIndicator
        ) : memberships.length > 0 ? (
          memberships.map((membership) => (
            <div key={membership._id} style={styles.membershipCard}>
              <span style={styles.membershipPlanName}>{membership.planName}</span>
              <span style={styles.membershipPrice}>${membership.price.toFixed(2)} / {membership.duration}</span>
              {role !== 'user' && ( // Only show customer name for owners/admins
                <span style={styles.membershipCustomer}>Customer: {membership.customerName}</span>
              )}
              <span style={styles.membershipDates}>
                {membership.startDate} - {membership.endDate}
              </span>
              <span style={{ ...styles.membershipStatusText, color: membership.status === 'active' ? Colors.secondary : Colors.red }}>
                Status: {membership.status.toUpperCase()}
              </span>
              {(role === 'juice_stall_owner' || role === 'super_admin') && (
                <div style={styles.membershipActions}>
                  <button onClick={() => handleEditMembership(membership)} style={styles.actionButton}>
                    {/* Placeholder for edit icon */}
                    <span style={{ color: Colors.primary }}>✏️</span>
                  </button>
                  <button onClick={() => handleDeleteMembership(membership._id)} style={styles.actionButton}>
                    {/* Placeholder for trash icon */}
                    <span style={{ color: Colors.red }}>🗑️</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <span style={styles.noDataText}>No memberships found.</span>
        )}
      </div>
      <MessageBox message={message} visible={messageVisible} onClose={() => setMessageVisible(false)} />
    </div>
  );
};

export default MembershipsScreen;