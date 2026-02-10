const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-5">

      {/* First Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">First Name</span>
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="input input-bordered bg-base-200 w-full disabled:opacity-70"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-error text-xs mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Last Name</span>
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="input input-bordered bg-base-200 w-full disabled:opacity-70"
          {...register("last_name")}
        />
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Email Address</span>
        </label>
        <input
          type="email"
          disabled
          className="input input-bordered bg-base-200 w-full opacity-70 cursor-not-allowed"
          {...register("email")}
        />
      </div>

      {/* Address */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Address</span>
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="input input-bordered bg-base-200 w-full disabled:opacity-70"
          {...register("address")}
        />
      </div>

      {/* Phone */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Phone Number</span>
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="input input-bordered bg-base-200 w-full disabled:opacity-70"
          {...register("phone_number")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
