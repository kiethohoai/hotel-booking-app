import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassowrd: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log(`Register Successfully!`);
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  // Form Submit Data
  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>

      {/* firstName & lastName */}
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('firstName', { required: `This field is required` })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('lastName', { required: `This field is required` })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

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

      {/* Confirm Password */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confirm Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('confirmPassowrd', {
            validate: (curPassword) => {
              if (!curPassword) return `This field is required`;
              if (watch('password') !== curPassword)
                return `Your password do not match`;
            },
          })}
        />
        {errors.confirmPassowrd && (
          <span className="text-red-500">{errors.confirmPassowrd.message}</span>
        )}
      </label>

      <div className="flex items-center justify-between">
        <span>
          Already registed?{' '}
          <Link to="/login" className="italic underline">
            Sign in here
          </Link>
        </span>
        <span>
          <button
            type="submit"
            className="rounded-sm bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </span>
      </div>
    </form>
  );
};

export default Register;
