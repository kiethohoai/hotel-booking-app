import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/useAppContext';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      showToast({ type: 'SUCCESS', message: 'Sign in successfully!' });
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ type: 'ERROR', message: error.message });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      {/* Email */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('email', { required: `This field is required` })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      {/* Password */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('password', {
            required: `This field is required`,
            minLength: {
              value: 6,
              message: `Password must be at least 6 charaters`,
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <div className="flex items-center justify-between">
        <span>
          {`Don't have account? `}
          <Link to="/register" className="italic underline">
            Register here!
          </Link>
        </span>
        <span>
          <button
            type="submit"
            className="rounded-sm bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Log in
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
