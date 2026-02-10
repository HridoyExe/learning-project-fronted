import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

import useAuthContext from "../../../hooks/useAuthContext";
import ErrorAlert from "../../ErrorAlert";

const ForgetPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { errorMsg, forgetPassword } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const result = await forgetPassword(data);
      if (result.success) {
        setSuccessMsg("A password reset link has been sent to your email.");
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-primary">
                Forgot your password?
              </h2>
              <p className="text-sm text-base-content/60">
                No worries. Enter your email and we’ll send you a reset link.
              </p>
            </div>

            {/* Alerts */}
            {errorMsg && <ErrorAlert error={errorMsg} />}

            {successMsg && (
              <div className="alert alert-success text-sm shadow-sm">
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Email address
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-error text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-lg"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* Footer */}
            <div className="divider text-xs uppercase opacity-60">
              or
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                ← Back to login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
