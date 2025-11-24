import { Snackbar, Alert } from '@mui/material';
import { useProfile } from '../hooks';
import StatsGrid from './StatsGrid';
import StakesTable from './StakesTable';
import DepositModal from './DepositModal';

export default function Profile() {
  const {
    showModal,
    setShowModal,
    amount,
    setAmount,
    stats,
    loading,
    depositLoading,
    snackbar,
    setSnackbar,
    balance,
    handleDeposit
  } = useProfile();

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ marginBottom: '20px' }}>
      <StatsGrid 
        balance={balance}
        stats={stats}
        onDepositClick={() => setShowModal(true)}
      />
      
      <StakesTable stakes={stats?.stakes || []} />
      
      <DepositModal
        open={showModal}
        onClose={() => setShowModal(false)}
        amount={amount}
        setAmount={setAmount}
        onDeposit={handleDeposit}
        loading={depositLoading}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}