import { useState } from "react";

const PasswordChangeForm = ({ register, errors, isEditing, watch }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
        className="text-primary font-semibold hover:underline"
      >
        Change Password
      </button>

      {isPasswordSectionOpen && (
        <div className="mt-4 space-y-4 pl-4 border-l-2 border-primary/30">

          {/* Current Password */}
          <div className="form-control">
            <label className="label-text font-medium">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              className="input input-bordered bg-base-200 w-full"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <p className="text-error text-xs mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="form-control">
            <label className="label-text font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              className="input input-bordered bg-base-200 w-full"
              {...register("new_password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
              })}
            />
            {errors.new_password && (
              <p className="text-error text-xs mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label-text font-medium">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              className="input input-bordered bg-base-200 w-full"
              {...register("confirm_new_password", {
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
            />
          </div>

          {/* Show password */}
          {isEditing && (
            <label className="flex items-center gap-3 cursor-pointer text-sm">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show password
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
