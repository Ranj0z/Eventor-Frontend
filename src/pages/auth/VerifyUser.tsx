import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usersAPI } from '../../../src/reducers/users/usersAPI';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

type VerifyInputs = {
    email: string;
    code: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    code: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be a 6 digit number')
        .required('Verification code is required'),
});

const VerifyUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [verifyUser, { isLoading }] = usersAPI.useVerifyUserMutation();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        },
    });

    const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
        try {
            const response = await verifyUser(data).unwrap();
            console.log("Verification response:", response);

            toast.success("Account verified successfully!");
            setTimeout(() => {
                navigate('/login', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please check your code and try again");
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
                        <div className="text-center">
                                <a 
                                    href="/" 
                                    className="text-sm text-blue-600 hover:underline hover:text-red-600"
                                >
                                    Back to Home
                                </a>
                            </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center max-w-[40vw] lg:text-left">
                        <h1 className="flex items-center text-5xl font-bold ">Verify Your Account</h1>
                        <h3 className="text-1xl pt-5">You need to verify your account to get started with Eventor</h3>
                        <p className="py-6">
                            All-in-one event management software to plan and run in-person, virtual, 
                            and hybrid events with greater efficiency and impact
                        </p>
                    </div>
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-red-900 mb-4">Verify Your Account</h1>
                            <p className="text-gray-600 mb-8">
                                We've sent a 6-digit verification code to your email address. 
                                Please enter it below to verify your account.
                            </p>
                            
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email address"
                                        readOnly={!!emailFromState}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg bg-gray-50"
                                    />
                                    {errors.email && (
                                        <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        {...register('code')}
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg text-center tracking-widest font-mono"
                                    />
                                    {errors.code && (
                                        <span className="text-red-600 text-sm mt-1 block">{errors.code.message}</span>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                                className="w-full border-2 bg-blue-300 text-black py-3 px-6 rounded-lg transition-all font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Verify Account</span>
                                            <span><LogIn /></span>
                                        </>
                                    )}
                                </button>

                                
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 text-sm">
                                    Didn't receive the code?{' '}
                                    <button className="text-red-600 hover:underline">
                                        Resend Code
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyUser;