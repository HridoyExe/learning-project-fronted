import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";

const Register = () => {
    const { registerUser, errorMsg } = useAuthContext();
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        delete data.confirm_password;
        try {
            const response = await registerUser(data)
            if (response.success) {
                setSuccessMsg(response.message)
            }
        } catch (error) {
            console.log("Registration Failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
           
            <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body p-8">
                    
                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold text-primary">Create Account</h2>
                        <p className="text-sm text-base-content/60 mt-2">Join Phimart to start your journey</p>
                    </div>

                    {/* Alerts */}
                    <div className="space-y-4 mb-4">
                        {errorMsg && <ErrorAlert error={errorMsg} />}
                        {successMsg && (
                            <div role="alert" className="alert alert-success shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{successMsg}</span>
                            </div>
                        )}
                    </div>

                    {/* Form Layout with 2 Columns for larger screens */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* First Name */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">First Name</span></label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className={`input input-bordered focus:input-primary ${errors.first_name ? "input-error" : ""}`}
                                    {...register("first_name", { required: "Required" })}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Last Name</span></label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className={`input input-bordered focus:input-primary ${errors.last_name ? "input-error" : ""}`}
                                    {...register("last_name", { required: "Required" })}
                                />
                            </div>

                            {/* Email - Full Width */}
                            <div className="form-control md:col-span-2">
                                <label className="label"><span className="label-text font-semibold">Email Address</span></label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`input input-bordered focus:input-primary ${errors.email ? "input-error" : ""}`}
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })}
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Phone Number</span></label>
                                <input
                                    type="text"
                                    placeholder="017XXXXXXXX"
                                    className={`input input-bordered focus:input-primary ${errors.phone_number ? "input-error" : ""}`}
                                    {...register("phone_number", { required: "Required" })}
                                />
                            </div>

                             {/* Address */}
                             <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Address</span></label>
                                <input
                                    type="text"
                                    placeholder="City, Country"
                                    className={`input input-bordered focus:input-primary ${errors.address ? "input-error" : ""}`}
                                    {...register("address", { required: "Required" })}
                                />
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Password</span></label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`input input-bordered focus:input-primary ${errors.password ? "input-error" : ""}`}
                                    {...register("password", { 
                                        required: "Required",
                                        minLength: { value: 8, message: "Min 8 chars" }
                                    })}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Confirm Password</span></label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`input input-bordered focus:input-primary ${errors.confirm_password ? "input-error" : ""}`}
                                    {...register("confirm_password", { 
                                        required: "Required",
                                        validate: (val) => watch('password') === val || "Match failed"
                                    })}
                                />
                            </div>
                        </div>

                        {/* Error Reporting for all fields (Short version) */}
                        {Object.keys(errors).length > 0 && (
                            <p className="text-error text-xs text-center">Please fill all fields correctly.</p>
                        )}

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className={`btn btn-primary w-full text-white font-bold ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="divider text-xs text-base-content/40 my-6">OR</div>
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="link link-primary font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;