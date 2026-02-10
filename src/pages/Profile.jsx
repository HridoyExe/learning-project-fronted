import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiEdit2, FiCamera } from "react-icons/fi";

const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach(key => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setSuccessMsg("");
    try {
      const res = await updateUserProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      });
      if (res.success) {
        setSuccessMsg("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"
            }}></div>
          </div>

          <div className="px-8 pb-8">
            {/* Profile Header */}
            <div className="relative flex justify-between items-end -mt-12 mb-8">
              <div className="flex items-end">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl overflow-hidden">
                      {user?.image ? (
                        <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-6 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.first_name} {user?.last_name}</h1>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <FiMail size={14} /> {user?.email}
                  </p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline btn-sm gap-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50"
                >
                  <FiEdit2 size={14} /> Edit Profile
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="mb-6">
              {errorMsg && <ErrorAlert error={errorMsg} />}
              {successMsg && (
                <div className="alert alert-success shadow-sm rounded-lg text-sm py-3">
                  <span>{successMsg}</span>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

                  <div className="form-control">
                    <label className="label text-sm font-medium text-gray-700">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiUser /></div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        className={`input-professional !pl-14 w-full ${!isEditing && "bg-gray-50 text-gray-500 border-transparent"}`}
                        {...register("first_name", { required: "First name is required" })}
                      />
                    </div>
                    {errors.first_name && <span className="text-xs text-red-500 mt-1">{errors.first_name.message}</span>}
                  </div>

                  <div className="form-control">
                    <label className="label text-sm font-medium text-gray-700">Last Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiUser /></div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        className={`input-professional !pl-14 w-full ${!isEditing && "bg-gray-50 text-gray-500 border-transparent"}`}
                        {...register("last_name", { required: "Last name is required" })}
                      />
                    </div>
                    {errors.last_name && <span className="text-xs text-red-500 mt-1">{errors.last_name.message}</span>}
                  </div>

                  <div className="form-control">
                    <label className="label text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiMail /></div>
                      <input
                        type="email"
                        disabled
                        className="input-professional !pl-14 w-full bg-gray-50 text-gray-500 border-transparent cursor-not-allowed"
                        {...register("email")}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 ml-1">Email cannot be changed</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Details</h3>

                  <div className="form-control">
                    <label className="label text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiPhone /></div>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        className={`input-professional !pl-14 w-full ${!isEditing && "bg-gray-50 text-gray-500 border-transparent"}`}
                        {...register("phone_number")}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label text-sm font-medium text-gray-700">Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FiMapPin /></div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        className={`input-professional !pl-14 w-full ${!isEditing && "bg-gray-50 text-gray-500 border-transparent"}`}
                        {...register("address")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form to original values
                      if (user) Object.keys(user).forEach(key => setValue(key, user[key]));
                    }}
                    className="btn btn-ghost"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <FiSave />
                    )}
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
