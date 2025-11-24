import { UserStake } from '../types';

interface StakesTableProps {
  stakes: UserStake[];
}

export default function StakesTable({ stakes }: StakesTableProps) {
  return (
    <>
      <h3>My Stakes</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Coin</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Prediction</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Odds</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Potential Win</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {stakes.map((stake) => (
            <tr key={stake.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{stake.market_id}</td>
              <td style={{ padding: '10px', color: stake.prediction === 'up' ? 'green' : 'red' }}>
                {stake.prediction.toUpperCase()}
              </td>
              <td style={{ padding: '10px' }}>
                ₱{parseFloat(stake.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '10px' }}>{stake.odds}x</td>
              <td style={{ padding: '10px' }}>
                ₱{parseFloat(stake.potential_winnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  backgroundColor: stake.status === 'won' ? '#d4edda' : stake.status === 'lost' ? '#f8d7da' : '#fff3cd',
                  color: stake.status === 'won' ? '#155724' : stake.status === 'lost' ? '#721c24' : '#856404'
                }}>
                  {stake.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>{new Date(stake.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}