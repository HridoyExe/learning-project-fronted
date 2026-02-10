import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCheckCircle } from "react-icons/fi";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const submitData = { ...data };
    delete submitData.confirm_password;
    try {
      const response = await registerUser(submitData);
      if (response.success) setSuccessMsg(response.message);
    } catch (error) {
      console.log(error);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-5/12 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}></div>
        <div className="relative z-10 w-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Join SwiftCart</h1>
          <p className="text-lg text-blue-100 opacity-90">
            Create an account to start shopping, track current orders, and keep a history of your purchases.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400" size={20} />
              <span>Fast & Secure Checkout</span>
            </li>
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400" size={20} />
              <span>Exclusive Offers & Discounts</span>
            </li>
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400" size={20} />
              <span>24/7 Customer Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Fill in your details to register</p>
          </div>

          <div className="mb-6">
            {errorMsg && <ErrorAlert error={errorMsg} />}
            {successMsg && (
              <div className="alert alert-success shadow-sm flex items-start gap-3">
                <FiCheckCircle size={20} />
                <span>{successMsg}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiUser /></div>
                  <input
                    type="text"
                    className={`input-professional !pl-14 w-full ${errors.first_name ? 'border-red-500' : ''}`}
                    placeholder="John"
                    {...register("first_name", { required: "First name is required" })}
                  />
                </div>
                {errors.first_name && <span className="text-xs text-red-500 mt-1">{errors.first_name.message}</span>}
              </div>

              {/* Last Name */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiUser /></div>
                  <input
                    type="text"
                    className={`input-professional !pl-14 w-full ${errors.last_name ? 'border-red-500' : ''}`}
                    placeholder="Doe"
                    {...register("last_name", { required: "Last name is required" })}
                  />
                </div>
                {errors.last_name && <span className="text-xs text-red-500 mt-1">{errors.last_name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-control md:col-span-2">
                <label className="label text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiMail /></div>
                  <input
                    type="email"
                    className={`input-professional !pl-14 w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                  />
                </div>
                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiPhone /></div>
                  <input
                    type="tel"
                    className={`input-professional !pl-14 w-full ${errors.phone_number ? 'border-red-500' : ''}`}
                    placeholder="+1234567890"
                    {...register("phone_number", { required: "Phone number is required" })}
                  />
                </div>
                {errors.phone_number && <span className="text-xs text-red-500 mt-1">{errors.phone_number.message}</span>}
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiMapPin /></div>
                  <input
                    type="text"
                    className={`input-professional !pl-14 w-full ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="St. 12, City"
                    {...register("address", { required: "Address is required" })}
                  />
                </div>
                {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address.message}</span>}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiLock /></div>
                  <input
                    type="password"
                    className={`input-professional !pl-14 w-full ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Must be at least 6 chars" }
                    })}
                  />
                </div>
                {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiLock /></div>
                  <input
                    type="password"
                    className={`input-professional !pl-14 w-full ${errors.confirm_password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register("confirm_password", {
                      required: "Confirm password is required",
                      validate: (val) => watch('password') === val || "Passwords do not match"
                    })}
                  />
                </div>
                {errors.confirm_password && <span className="text-xs text-red-500 mt-1">{errors.confirm_password.message}</span>}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`btn-professional w-full py-3 text-base ${loading ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg hover:shadow-blue-500/30"}`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
