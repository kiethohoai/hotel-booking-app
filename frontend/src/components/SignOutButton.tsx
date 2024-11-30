import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/useAppContext';

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ type: 'SUCCESS', message: `Signed Out Successfully.` });
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
    },
    onError: (error: Error) => {
      showToast({ type: 'ERROR', message: error.message });
    },
  });

  function handleSignOut() {
    mutation.mutate();
  }

  return (
    <button
      className="flex items-center rounded-sm bg-white px-3 font-bold text-blue-700 shadow-sm hover:bg-gray-100 hover:text-blue-800"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
