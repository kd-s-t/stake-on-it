import { TableRow, TableCell, Typography, Button, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { getCryptoIconUrl } from '../../../lib/s3';
import { Prediction, AnalysisModalState } from '../types';
import { BUTTON_COLORS } from '../consts';

interface PredictionRowProps {
  prediction: Prediction;
  index: number;
  onAnalysisClick: (modal: AnalysisModalState) => void;
  onStakeClick: (coin: string, direction: string, odds: number, analysis: string) => void;
}

export default function PredictionRow({ prediction, index, onAnalysisClick, onStakeClick }: PredictionRowProps) {
  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src={getCryptoIconUrl(prediction.coin.toLowerCase())}
            alt={prediction.coin}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <Typography sx={{ fontWeight: 600 }}>{prediction.coin}</Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ maxWidth: 300 }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {`${prediction.analysis.substring(0, 100)}...`}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => onAnalysisClick({ open: true, coin: prediction.coin, analysis: prediction.analysis })}
            sx={{ textTransform: 'none', fontSize: '0.75rem', p: 0, minWidth: 'auto' }}
          >
            Show more
          </Button>
        </Box>
      </TableCell>
      <TableCell sx={{ color: '#10b981', fontWeight: 600 }}>{prediction.upOdds}x</TableCell>
      <TableCell sx={{ color: '#dc3545', fontWeight: 600 }}>{prediction.downOdds}x</TableCell>
      <TableCell>
        <Button
          variant="contained"
          startIcon={<TrendingUp />}
          onClick={() => onStakeClick(prediction.coin, 'up', prediction.upOdds, prediction.analysis)}
          sx={{
            mr: 1,
            bgcolor: BUTTON_COLORS.UP.bgcolor,
            '&:hover': { bgcolor: BUTTON_COLORS.UP.hover },
            fontSize: '0.875rem'
          }}
        >
          UP {prediction.upOdds}x
        </Button>
        <Button
          variant="contained"
          startIcon={<TrendingDown />}
          onClick={() => onStakeClick(prediction.coin, 'down', prediction.downOdds, prediction.analysis)}
          sx={{
            bgcolor: BUTTON_COLORS.DOWN.bgcolor,
            '&:hover': { bgcolor: BUTTON_COLORS.DOWN.hover },
            fontSize: '0.875rem'
          }}
        >
          DOWN {prediction.downOdds}x
        </Button>
      </TableCell>
    </TableRow>
  );
}