import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [loading, setLoading] = useState(true);

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };

    const [authToken, setAuthToken] = useState(getToken());

    useEffect(() => {
        if (authToken) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [authToken]);

    const handleApiError = (error, defaultMessage = "Something went wrong! Try again") => {
        if (error.response && error.response.data) {
            const errorMessage = Object.values(error.response.data).flat().join("\n");
            setErrorMsg(errorMessage);
            return { success: false, message: errorMessage };
        }
        setErrorMsg(defaultMessage);
        return { success: false, message: defaultMessage };
    };

    // Fetch user profile
    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/auth/users/me", {
                headers: { Authorization: `JWT ${authToken?.access}` },
            });
            setUser(response.data);
        } catch (error) {
            handleApiError(error, "Failed to fetch user profile");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateUserProfile = async (data) => {
        setErrorMsg("");
        try {
            const response = await apiClient.put("/auth/users/me", data, {
                headers: { Authorization: `JWT ${authToken?.access}` },
            });
            setUser(response.data); // update local user state
            return { success: true, message: "Profile updated successfully" };
        } catch (error) {
            return handleApiError(error);
        }
    };

    // Change password
    const changePassword = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/set_password/", data, {
                headers: { Authorization: `JWT ${authToken?.access}` },
            });
            return { success: true, message: "Password changed successfully" };
        } catch (error) {
            return handleApiError(error);
        }
    };

    // Login user
    const loginUser = async (userData) => {
        setErrorMsg("");
        try {
            const response = await apiClient.post("auth/jwt/create/", userData);
            setAuthToken(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            // fetchUserProfile will be triggered by useEffect
        } catch (error) {
            const message = error.response?.data?.detail || "Login Failed! Try Again";
            setErrorMsg(message);
        }
    };

    // Register user
    const registerUser = async (userData) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/", userData);
            return {
                success: true,
                message: "Registration successful! Check your email to activate your account",
            };
        } catch (error) {
            return handleApiError(error, "Registration failed! Try again");
        }
    };

    // Logout user
    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartId");
    };

    // Resend activation email
    const resendActivation = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/resend_activation/", data);
            return { success: true, message: "Activation email sent! Please check your mail." };
        } catch (error) {
            return handleApiError(error);
        }
    };

    // Forget password
    const forgetPassword = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/reset_password/", data);
            return { success: true, message: "Password reset link has been sent to your email." };
        } catch (error) {
            return handleApiError(error);
        }
    };

    // Reset password confirm
    const resetPasswordConfirm = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/reset_password_confirm/", data);
            return { success: true, message: "Password has been reset successfully!" };
        } catch (error) {
            return handleApiError(error);
        }
    };

    return {
        user,
        loading,
        errorMsg,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        changePassword,
        resendActivation,
        forgetPassword,
        resetPasswordConfirm,
    };
};

export default useAuth;
