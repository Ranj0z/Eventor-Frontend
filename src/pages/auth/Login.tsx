import * as yup from 'yup';
import { toast } from 'sonner';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginAPI } from '../../../src/reducers/login/loginAPI';
import { loginSuccess } from '../../../src/reducers/login/userSlice';

type LoginInputs = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
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
        defaultValues: {
            email: emailFromState,
        }
    });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        console.log('Login data:', data);

        try {
            const response = await loginUser(data).unwrap();
            dispatch(loginSuccess(response));

            console.log("Login response:", response);
            toast.success("Login successful!");

            if (response.user.role === 'admin') {
                navigate('/admin/dashboard/users');
            } else if (response.user.role === 'doctor') {
                navigate('/doctor/dashboard/appointments');
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard/appointments');
            }

        } catch (error) {
            console.log("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div 
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <img
                                    src="https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007173/main-sample.png"
                                    alt="Medical professionals at CareConnect"
                                    className="w-12 h-12 lg:h-[50px] object-cover object-top rounded-2xl shadow-2xl"
                                    />
                                <div className="text-2xl font-bold">
                                <span className="text-Black-600">Eventor</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-center flex flex-row-2">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <a href="/register" className="text-blue-600 hover:text-red-700 font-semibold">
                                            Register here
                                        </a>
                                    </p>
                                   
                                </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">                
                <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center max-w-[50vw] lg:text-left p-10">
                        <h1 className="text-5xl font-bold">Login now</h1>
                        <p className="py-6">
                            Login to fully experience the app!!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            <h1 className="text-2xl font-bold text-red-400">Login to Account</h1>
                                <div>
                                    <label className="block text-sm mt-6 font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email address"
                                        readOnly={!!emailFromState}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                    />
                                    {errors.email && (
                                        <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>
                                    )}
                                </div>
                                <label className="block text-sm font-medium text-gray-700 mt-2">Password</label><div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password')}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 pr-12 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
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
                                    <span className="text-red-600 text-sm mt-1 block">{errors.password.message}</span>
                                )}
                                <div><a href="/"  className="link link-hover text-blue-600">Forgot password?</a></div>
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full border-2 mt-3 bg-blue-300 text-black py-3 px-6 rounded-lg transition-all font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <span><LogIn /></span>
                                        </>
                                    )}
                                </button>
                                
                                 <div className="text-center mt-3">
                                    <a 
                                        href="/" 
                                        className="text-sm text-red-600 "
                                    >
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
        </div>
    );
}

export default Login;