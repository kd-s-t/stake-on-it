import withAuth from '../components/withAuth';
import MarketPredictions from '../modules/market/components/MarketPredictions';

function MarketPredictionsPage() {
  return <MarketPredictions />;
}

export default withAuth(MarketPredictionsPage);