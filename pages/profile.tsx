import withAuth from '../components/withAuth';
import Profile from '../modules/profile/components/Profile';

function ProfilePage() {
  return <Profile />;
}

export default withAuth(ProfilePage);