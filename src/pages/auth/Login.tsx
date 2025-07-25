import * as yup from 'yup';
import { toast } from 'sonner';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginAPI } from '../../reducers/Login/loginAPI';
import { loginSuccess } from '../../reducers/Login/userSlice';

type LoginInputs = {
  email: string;
  password: string;
};



const schema = yup.object({
  email: yup.string().email('Invalid email').max(100).required('Email is required'),
  password: yup.string().min(6).max(255).required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const emailFromState = location.state?.email || '';
  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: emailFromState },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
    
          // Dispatch to Redux — this is the missing part!
    dispatch(loginSuccess({
      token: response.token,
      user: response.user,
    }));
    
    console.log(response);
      toast.success("Login successful!");
      if (response.user.role === 'admin') navigate('/admin/dashboard');
      else if (response.user.role === 'host') navigate('/host/dashboard');
      else navigate('/user/dashboard');
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
<header className="bg-white shadow-sm w-full">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-center space-x-3 cursor-pointer">
      <img
        src="https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007173/main-sample.png"
        alt="Logo"
        className="w-12 h-12 object-cover rounded-2xl shadow-2xl"
      />
      <h1 className="text-2xl font-bold text-black">Eventor</h1>
    </div>

    {/* Register Link */}
    <div className=" mx-auto"> 
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end w-full sm:w-auto text-center sm:text-right gap-y-1 sm:gap-x-2 break-words">
      <p className="text-gray-600 text-sm md:text-base leading-snug">
        Don't have an account?
      </p>
      <a
        href="/register"
        className="text-blue-600 hover:text-red-700 font-semibold text-sm md:text-base"
      >
        Register here
      </a>
    </div>
    </div>
  </div>
</header>

      {/* Main content */}
      <main className="flex-grow flex justify-center items-start pt-[10vh] sm:pt-[12vh] lg:pt-[15vh]">
        <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Left Side */}
          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Login now</h1>
            <p className="py-6 text-gray-600">Login to fully experience the app!</p>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-2xl font-bold text-red-400 text-center mb-2">Login to Account</h2>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  readOnly={!!emailFromState}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <a href="/" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-300 text-black py-3 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <LogIn />
                  </>
                )}
              </button>

              {/* Back link */}
              <div className="text-center">
                <a href="/" className="text-sm text-red-600">
                  Back to Home
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
