import { Card, CardContent, Typography, Box } from '@mui/material'
import { TrendingUp, TrendingDown, AccountBalance, Assessment } from '@mui/icons-material'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Welcome to Stake On It
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
          Stake On It is a prediction market platform where you can stake on cryptocurrency market movements. 
          Use AI-powered market predictions to make informed decisions and potentially win based on your predictions.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
          How to Use
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ 
              bgcolor: '#424242', 
              color: 'white', 
              borderRadius: '50%', 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Assessment />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                View Market Predictions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Go to <strong>Market Predictions</strong> to see AI-generated predictions for various cryptocurrencies. 
                Each prediction shows UP and DOWN odds based on market analysis.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ 
              bgcolor: '#424242', 
              color: 'white', 
              borderRadius: '50%', 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <TrendingUp />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Place Your Stake
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose whether you think a cryptocurrency will go <strong>UP</strong> or <strong>DOWN</strong> and 
                enter the amount you want to stake. Higher odds mean higher potential winnings but lower probability.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ 
              bgcolor: '#424242', 
              color: 'white', 
              borderRadius: '50%', 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AccountBalance />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Track Your Stakes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visit <strong>Stakes</strong> to see all your active stakes and their current status. 
                Monitor your predictions and see how they perform over time.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ 
              bgcolor: '#10b981', 
              color: 'white', 
              borderRadius: '50%', 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <TrendingDown />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Manage Your Balance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check your <strong>Profile</strong> to view your balance, deposit funds, and see your staking history. 
                Keep track of your wins and losses to improve your strategy.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: '#f9f8f8', borderRadius: '8px' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            <strong>Note:</strong> Staking involves risk. Only stake what you can afford to lose. 
            Market predictions are based on AI analysis and should not be considered financial advice.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
