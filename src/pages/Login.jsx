import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image / Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}></div>
        <div className="relative z-10 w-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-xl text-blue-100 max-w-md">
            Sign in to access your personalized shopping experience, track orders, and discover new arrivals.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500">Access your account details</p>
          </div>

          <div className="min-h-[20px] mb-4">
            {errorMsg && <ErrorAlert error={errorMsg} />}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className={`!pl-14 input-professional w-full transition-all duration-200 ${errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-100"}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forget-password" className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`!pl-14 input-professional w-full transition-all duration-200 ${errors.password ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-100"}`}
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className={`btn-professional w-full py-3 text-base flex items-center justify-center gap-2 group ${loading ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                }`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="divider-clean my-8 relative flex items-center justify-center">
            <span className="bg-white px-2 text-sm text-gray-500 z-10 relative">Or continue with</span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors">
                Create Account
              </Link>
            </p>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-800">
                Didnt receive the activation email?{" "}
                <Link to="/resend-activation" className="font-semibold underline hover:text-blue-900">
                  Resend Link
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
