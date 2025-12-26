import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert"
import { useState } from "react";

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
    <div className="flex justify-center items-center px-4 py-12 bg-base-200 min-h-screen">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-primary mb-2">Welcome Back</h2>
            <p className="text-sm text-base-content/60">
              Please sign in to your account
            </p>
          </div>

          <div className="min-h-[50px]">
            {errorMsg && <ErrorAlert error={errorMsg} />}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.email ? "input-error border-red-500" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                {/* CONNECTED: Forgot Password Route */}
                <Link to="/forget-password" intrinsic="true" className="text-xs link link-hover text-primary font-medium italic">
                   Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.password ? "input-error border-red-500" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-error text-xs mt-1">{errors.password.message}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary w-full text-white font-bold text-lg mt-2 ${loading ? "loading" : ""}`} 
              disabled={loading}
            >
              {loading ? "" : "Login"}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-6">OR</div>
          
          <div className="space-y-4">
            <p className="text-center text-sm">
              New to Phimart?{" "}
              <Link className="link link-primary font-bold" to="/register">
                Create Account
              </Link>
            </p>

            <div className="bg-base-200/50 p-4 rounded-xl border border-dashed border-base-300 text-center">
              <p className="text-xs text-base-content/70">
                Didn&apos;t receive activation email? <br />
                <Link className="link link-secondary font-bold inline-block mt-1" to="/resend-activation">
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