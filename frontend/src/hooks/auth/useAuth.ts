import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutUser());
    router.push('/auth/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout
  };
};