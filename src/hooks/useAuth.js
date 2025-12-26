import { useEffect, useState } from "react";
import apiClient from "../services/api-client";


const useAuth = () => {
    const [user, setUser] = useState(null);

    const [errorMsg, setErrorMsg] = useState("")


    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };

    const [authToken, setAuthToken] = useState(getToken());

    useEffect(() => {
        if (authToken) fetchUserProfile();
    }, [authToken])

    const handleApiError = (error, defaultMessage = "Something Went Wrong! Try Again") => {
        if (error.response && error.response.data) {
            const errorMessage = Object.values(error.response.data).flat().join("\n")

            setErrorMsg(errorMessage)
            return { success: false, message: errorMessage }
        }
        setErrorMsg(defaultMessage)
        return {
            success: false,
            message: defaultMessage
        }
    }

    //Fetch user Profile 

    const fetchUserProfile = async () => {

        try {
            const response = await apiClient.get("/auth/users/me", {
                headers: { Authorization: `JWT ${authToken?.access}` }
            })
            setUser(response.data)
        }
        catch (error) {
            console.log("Error Fetching User ", error);
        }
    }
    // Update User Profilr 

    const updateUserProfile = async (data) => {
        setErrorMsg("");
        try {
            apiClient.put("/auth/users/me", data, {
                headers: {
                    Authorization: `JWT ${authToken?.access}`
                }
            })
        }
        catch (error) {
            return handleApiError(error)
        }
    }
    // Password Change 


    const changePassword = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/set_password/", data, {
                headers: {
                    Authorization: `JWT ${authToken?.access}`,
                },
            });
        } catch (error) {
            return handleApiError(error);
        }
    };
    // Login User 
    const loginUser = async (userData) => {
        setErrorMsg("");
        try {
            const response = await apiClient.post("auth/jwt/create/", userData);
            setAuthToken(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            // After Login User
            await fetchUserProfile();
        } catch (error) {
            setErrorMsg(error.response.data?.detail)
        }
    };

    // Registration User

    const registerUser = async (userData) => {
        setErrorMsg("")
        try {

            await apiClient.post("/auth/users/", userData)

            return { success: true, message: "Registration Successfull,Check your email to activate your account" }
        }
        catch (error) {
            return handleApiError(error, "Registartion Failed! Try again")
        }
    }

    // Logout User 

    const logoutUser = () => {

        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens")
    }

    // Resend Email Activatetion

    const resendActivation = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/resend_activation/", data);
            return { success: true, message: "Activation Email sent! Please Check Your mail." };
        }
        catch (error) {
            return handleApiError(error);
        }
    }

    // Forget Password

    const forgetPassword = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/reset_password/", data);
            return { success: true, message: "Password reset link has been sent to your email." }
        }
        catch (error) {
            return handleApiError(error)
        }
    };
    //COnfrim FOrget 
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
        errorMsg, loginUser,
        registerUser, logoutUser,
        updateUserProfile, changePassword,
        resendActivation,
        forgetPassword,
        resetPasswordConfirm
    }


};
export default useAuth;

