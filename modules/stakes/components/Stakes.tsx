import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import { useStakes } from '../hooks';
import StakeDialog from './StakeDialog';
import StakeRow from './StakeRow';

export default function Stakes() {
  const {
    stakes,
    loading,
    stakeDialog,
    setStakeDialog,
    amount,
    setAmount,
    snackbar,
    setSnackbar,
    getTimeRemaining,
    handleStakeOnExisting,
    handleStakeConfirm
  } = useStakes();

  return (
    <>
      <Card sx={{ mb: '20px' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            All Stakes
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Coin</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Prediction</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Time Left</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Bets</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Analysis</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stakes.map((stake) => (
                    <StakeRow
                      key={stake.id}
                      stake={stake}
                      getTimeRemaining={getTimeRemaining}
                      onStakeClick={handleStakeOnExisting}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
      
      <StakeDialog
        stakeDialog={stakeDialog}
        setStakeDialog={setStakeDialog}
        amount={amount}
        setAmount={setAmount}
        onConfirm={handleStakeConfirm}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}