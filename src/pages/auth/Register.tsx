// C:\Users\Admin\Desktop\The Jitu\Eventor-Frontend\src\pages\auth\Register.tsx

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usersAPI } from '../../reducers/Users/usersAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().max(50).required('First name is required'),
  lastName: yup.string().max(50).required('Last name is required'),
  email: yup.string().email().max(100).required('Email is required'),
  phoneNumber: yup.string().max(20).required('Phone number is required'),
  address: yup.string().max(255).required('Address is required'),
  password: yup.string().min(6).max(255).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation({
    fixedCacheKey: 'createUser',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };

    try {
      const response = await createUser(payload).unwrap();
      console.log('response:', response);

      toast.success('Registration successful! Check your email to verify your account.');
      setTimeout(() => {
        navigate('/register/verify', {
          state: { email: data.email },
        });
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error?.data || error?.message || error);
      toast.error(error?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007173/main-sample.png"
                  alt="Eventor logo"
                  className="w-12 h-12 object-cover rounded-2xl shadow-2xl"
                />
                <div className="text-2xl font-bold text-black">Eventor</div>
              </div>
            </div>
            <div className="mt-3 text-center flex flex-row-2">
              <p className="text-gray-600">Already have an account?</p>
              <p className="ml-1">
                <a href="/login" className="text-blue-600 hover:text-red-700 font-semibold">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center hidden lg:block max-w-[40vw] lg:text-left">
              <h1 className="text-5xl font-bold">Get started with Eventor</h1>
              <p className="py-6">
                Plan and run in-person, virtual, and hybrid events with greater efficiency and impact.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        data-test="signup-firstname"
                        {...register('firstName')}
                        placeholder="First name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        data-test="signup-lastname"
                        {...register('lastName')}
                        placeholder="Last name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        data-test="signup-email"
                        {...register('email')}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        data-test="signup-phone"
                        {...register('phoneNumber')}
                        placeholder="Phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.phoneNumber && (
                        <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        data-test="signup-address"
                        {...register('address')}
                        placeholder="Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          data-test="signup-password"
                          {...register('password')}
                          placeholder="Password"
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          data-test="signup-confirmpassword"
                          {...register('confirmPassword')}
                          placeholder="Confirm password"
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-test="signup-submitbtn"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="loading loading-spinner loading-sm" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <div className="text-center">
                    <a href="/" className="text-sm text-red-600 hover:underline">
                      Back to Home
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;