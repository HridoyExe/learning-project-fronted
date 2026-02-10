import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import { useState } from "react";
import ErrorAlert from "../../ErrorAlert";
import { Link } from "react-router-dom";

const ResendEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { errorMsg, resendActivation } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const result = await resendActivation(data);
      if (result.success) {
        setSuccessMsg("Activation email sent! Please check your inbox.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8 space-y-5">

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-primary">
                Resend Activation
              </h2>
              <p className="text-sm text-base-content/60">
                Enter your registered email to receive a new activation link.
              </p>
            </div>

            {errorMsg && <ErrorAlert error={errorMsg} />}
            {successMsg && (
              <div className="alert alert-success text-sm">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""
                    }`}
                  {...register("email", { required: "Email is required" })}
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
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Send Activation Link"
                )}
              </button>
            </form>

            <div className="text-center">
              <Link to="/login" className="text-primary font-semibold hover:underline text-sm">
                ← Back to Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendEmail;
