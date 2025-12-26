import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import { useState } from "react";
import ErrorAlert from "../../ErrorAlert";
import { Link } from "react-router-dom";
const ResendEmail = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { errorMsg, resendActivation } = useAuthContext();
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState("");
    const onSubmit = async (data) => {
        setLoading(true)
        setSuccessMsg("");
        try {
            const result = await resendActivation(data);
            if (result.success) {
                setSuccessMsg("Activation email sent! Please check your inbox.");
            }
        } catch (error) {
            console.log("Resend Failed", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center items-center px-4 py-12 bg-base-200 min-h-screen">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Alerts */}
                    {errorMsg && <ErrorAlert error={errorMsg} />}
                    {successMsg && (
                        <div className="alert alert-success shadow-sm mb-4">
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <h2 className="font-bold text-2xl card-title">Resend Activation</h2>
                    <p className="text-base-content/70">
                        Enter your registered email to get a new activation link.
                    </p>

                    <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                   
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Activation Link"}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-4">
                        <Link className="link link-primary text-sm" to="/login">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default ResendEmail;
