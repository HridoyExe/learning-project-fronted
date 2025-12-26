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
                setSuccessMsg("A password reset link has been sent to your email!");
                reset();
            }
        } catch (error) {
           
            console.error("Forget Password Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 py-12 bg-base-200 min-h-screen">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body p-8">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="font-bold text-3xl text-primary">Forgot Password?</h2>
                        <p className="text-sm text-base-content/60 mt-2">
                            Enter your email to receive a password reset link.
                        </p>
                    </div>

                    {/* Alerts Section */}
                    <div className="min-h-[20px] mb-4">
                        {errorMsg && <ErrorAlert error={errorMsg} />}
                        
                        {successMsg && (
                            <div className="alert alert-success shadow-sm py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">{successMsg}</span>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                                })}
                            />
                            {errors.email && (
                                <span className="text-error text-xs mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className={`btn btn-primary w-full text-white font-bold text-lg ${loading ? "loading" : ""}`} 
                            disabled={loading}
                        >
                            {loading ? "" : "Send Reset Link"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="divider my-6 text-xs text-base-content/40 uppercase font-bold">Or</div>
                    
                    <div className="text-center">
                        <Link className="link link-hover text-primary font-semibold flex items-center justify-center gap-2" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;