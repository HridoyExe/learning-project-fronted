import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
   
        const finalData = {
            uid,
            token,
            new_password: data.new_password,
            re_new_password: data.re_new_password
        };

        try {
            const result = await resetPasswordConfirm(finalData);
            if (result.success) {
                setSuccess(true);
            
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            console.error("Reset Confirm Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 py-12 bg-base-200 min-h-screen">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body p-8">
                    
                    <div className="text-center mb-6">
                        <h2 className="font-bold text-3xl text-primary">Set New Password</h2>
                        <p className="text-sm text-base-content/60 mt-2">
                            Please enter your new password below.
                        </p>
                    </div>

                    <div className="min-h-[20px] mb-4">
                        {errorMsg && <ErrorAlert error={errorMsg} />}
                        {success && (
                            <div className="alert alert-success shadow-sm">
                                <span className="text-sm font-medium">Password reset successful! Redirecting to login...</span>
                            </div>
                        )}
                    </div>

                    {!success ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* New Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">New Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`input input-bordered focus:input-primary ${errors.new_password ? "input-error" : ""}`}
                                    {...register("new_password", { 
                                        required: "Required",
                                        minLength: { value: 8, message: "Min 8 characters" }
                                    })}
                                />
                                {errors.new_password && <span className="text-error text-xs mt-1">{errors.new_password.message}</span>}
                            </div>

                            {/* Confirm New Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`input input-bordered focus:input-primary ${errors.re_new_password ? "input-error" : ""}`}
                                    {...register("re_new_password", { 
                                        required: "Required",
                                        validate: (val) => watch('new_password') === val || "Passwords do not match"
                                    })}
                                />
                                {errors.re_new_password && <span className="text-error text-xs mt-1">{errors.re_new_password.message}</span>}
                            </div>

                            <button 
                                type="submit" 
                                className={`btn btn-primary w-full text-white ${loading ? "loading" : ""}`} 
                                disabled={loading}
                            >
                                {loading ? "" : "Reset Password"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <Link to="/login" className="btn btn-ghost text-primary">Go to Login Now</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordConfirm;