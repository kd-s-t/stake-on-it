import { UserStats } from '../types';

interface StatsGridProps {
  balance: number;
  stats: UserStats | null;
  onDepositClick: () => void;
}

export default function StatsGrid({ balance, stats, onDepositClick }: StatsGridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Balance</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
          ₱{(Number(balance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <button 
          onClick={onDepositClick}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Deposit Money
        </button>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Wins</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{stats?.wins || 0}</p>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Losses</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{stats?.losses || 0}</p>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Total Profit</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: (stats?.totalProfit ?? 0) >= 0 ? '#28a745' : '#dc3545' }}>
          ₱{(stats?.totalProfit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}