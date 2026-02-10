import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import ErrorAlert from "../../ErrorAlert";

const ResetPasswordConfirm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { errorMsg, resetPasswordConfirm } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await resetPasswordConfirm({
        uid,
        token,
        new_password: data.new_password,
        re_new_password: data.re_new_password,
      });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
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
              <h2 className="text-3xl font-bold text-primary">
                Set New Password
              </h2>
              <p className="text-sm text-base-content/60">
                Enter and confirm your new password.
              </p>
            </div>

            {errorMsg && <ErrorAlert error={errorMsg} />}
            {success && (
              <div className="alert alert-success text-sm">
                Password reset successful! Redirecting to login...
              </div>
            )}

            {!success ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label-text font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`input input-bordered w-full ${
                      errors.new_password ? "input-error" : ""
                    }`}
                    {...register("new_password", {
                      required: "Required",
                      minLength: { value: 8, message: "Min 8 characters" },
                    })}
                  />
                  {errors.new_password && (
                    <p className="text-error text-xs mt-1">
                      {errors.new_password.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label-text font-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`input input-bordered w-full ${
                      errors.re_new_password ? "input-error" : ""
                    }`}
                    {...register("re_new_password", {
                      required: "Required",
                      validate: (val) =>
                        watch("new_password") === val ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.re_new_password && (
                    <p className="text-error text-xs mt-1">
                      {errors.re_new_password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <Link to="/login" className="btn btn-ghost text-primary">
                  Go to Login Now
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
