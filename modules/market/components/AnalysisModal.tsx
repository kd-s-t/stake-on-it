import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { AnalysisModalState } from '../types';

interface AnalysisModalProps {
  analysisModal: AnalysisModalState;
  setAnalysisModal: (modal: AnalysisModalState) => void;
}

export default function AnalysisModal({ analysisModal, setAnalysisModal }: AnalysisModalProps) {
  const handleClose = () => setAnalysisModal({ open: false, coin: '', analysis: '' });

  return (
    <Dialog
      open={analysisModal.open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {analysisModal.coin} News
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {analysisModal.analysis}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}