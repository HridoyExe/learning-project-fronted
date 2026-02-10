import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("Account activated successfully!");
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setError("Something went wrong. Please check your activation link.");
        console.log(err);
        setLoading(false);
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Account Activation</h2>

        {loading && (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {message && (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;
