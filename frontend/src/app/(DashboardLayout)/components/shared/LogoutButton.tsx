
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLogOut } from '@/redux/slices/isLogedInSlice';

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('isLogedIn');
    dispatch(setLogOut());
    router.push('/authentication/login');
  };

  return (
    <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
      Logout
    </Button>
  );
};

export default LogoutButton;
