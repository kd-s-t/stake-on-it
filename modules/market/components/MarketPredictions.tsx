import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useMarketPredictions } from '../hooks';
import PredictionRow from './PredictionRow';
import StakeDialog from './StakeDialog';
import AnalysisModal from './AnalysisModal';

export default function MarketPredictions() {
  const {
    predictions,
    loading,
    stakeDialog,
    setStakeDialog,
    amount,
    setAmount,
    snackbar,
    setSnackbar,
    isRefreshing,
    lastFetchTime,
    analysisModal,
    setAnalysisModal,
    formatLastFetchTime,
    handleRefresh,
    isRefreshCooldown,
    getCooldownRemaining,
    handleStakeClick,
    handleStakeConfirm
  } = useMarketPredictions();

  return (
    <>
      <Card sx={{ mb: '20px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Market Predictions
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {lastFetchTime && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  Last updated: {formatLastFetchTime(lastFetchTime)}
                  {(() => {
                    const cooldownMinutes = getCooldownRemaining();
                    if (cooldownMinutes !== null) {
                      return ` (${cooldownMinutes}m cooldown)`;
                    }
                    return '';
                  })()}
                </Typography>
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={isRefreshing ? <CircularProgress size={16} /> : <Refresh />}
                onClick={handleRefresh}
                disabled={isRefreshing || loading || isRefreshCooldown()}
                sx={{
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  },
                  '&:disabled': {
                    borderColor: 'divider',
                    color: 'text.disabled'
                  }
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Coin</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Analysis</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>UP Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DOWN Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {predictions.map((pred, i) => (
                    <PredictionRow
                      key={i}
                      prediction={pred}
                      index={i}
                      onAnalysisClick={setAnalysisModal}
                      onStakeClick={handleStakeClick}
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
      
      <AnalysisModal
        analysisModal={analysisModal}
        setAnalysisModal={setAnalysisModal}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}