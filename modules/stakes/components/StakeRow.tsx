import { TableRow, TableCell, Chip, Typography, Button } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { Stake } from '../types';
import { STATUS_COLORS, STATUS_TEXT_COLORS } from '../consts';

interface StakeRowProps {
  stake: Stake;
  getTimeRemaining: (createdAt: string) => string;
  onStakeClick: (stake: Stake, prediction: string) => void;
}

export default function StakeRow({ stake, getTimeRemaining, onStakeClick }: StakeRowProps) {
  const status = stake.display_status || stake.status;
  const isActive = status === 'active';

  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 600 }}>{stake.market_id}</TableCell>
      <TableCell>
        <Chip
          label={stake.prediction.toUpperCase()}
          icon={stake.prediction === 'up' ? <TrendingUp /> : <TrendingDown />}
          color={stake.prediction === 'up' ? 'success' : 'error'}
          size="small"
        />
      </TableCell>
      <TableCell>
        ₱{parseFloat(stake.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </TableCell>
      <TableCell>{stake.odds}x</TableCell>
      <TableCell>
        <Chip
          label={status}
          size="small"
          sx={{
            bgcolor: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default,
            color: STATUS_TEXT_COLORS[status as keyof typeof STATUS_TEXT_COLORS] || STATUS_TEXT_COLORS.default
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
          {getTimeRemaining(stake.created_at)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
          ↗️ {stake.up_bet_count || 0} UP | ↘️ {stake.down_bet_count || 0} DOWN
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', maxWidth: '200px' }}>
          {stake.analysis || 'No analysis provided'}
        </Typography>
      </TableCell>
      <TableCell>
        {isActive ? (
          <>
            <Button
              size="small"
              variant="contained"
              startIcon={<TrendingUp />}
              onClick={() => onStakeClick(stake, 'up')}
              sx={{
                mr: 1,
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                fontSize: '0.75rem'
              }}
            >
              UP
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<TrendingDown />}
              onClick={() => onStakeClick(stake, 'down')}
              sx={{
                bgcolor: '#dc3545',
                '&:hover': { bgcolor: '#c82333' },
                fontSize: '0.75rem'
              }}
            >
              DOWN
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            Betting closed
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
}