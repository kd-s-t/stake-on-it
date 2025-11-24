import withAuth from '../components/withAuth';
import Stakes from '../modules/stakes/components/Stakes';

function StakesPage() {
  return <Stakes />;
}

export default withAuth(StakesPage);