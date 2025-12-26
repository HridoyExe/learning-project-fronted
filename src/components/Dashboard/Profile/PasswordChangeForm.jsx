import { useState } from "react";

const PasswordChangeForm = ({ register, errors, isEditing, watch }) => {
    const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    return (

        <div className="mt-4">
            <button
                type="button"
                onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                className="btn btn-link p-0 text-primary font-semibold h-auto min-h-0 justify-start">
                Change Password
            </button>
            {isPasswordSectionOpen && <div className="mt-3 space-y-3 pl-2 border-l-2 border-base-300">

                {/* CurrentPassword */}
                <div className="form-control">
                    <label htmlFor="label"> Current Password </label>
                    <div className="relative">
                        <input
                            className="input input-borderd bg-base-200 w-full pr-10 "
                            type= {showPassword ? "text" : "password"}
                            disabled={!isEditing}

                            {...register("current_password", {
                                required: "Current Password Is Required"
                            })}

                        />
                        {errors.current_password && (
                            <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>
                        )}

                    </div>

                    {/* New Password */}

                    <div className="form-control">
                        <label htmlFor="label"> New Password</label>
                        <div className="relative">
                            <input
                               type= {showPassword ? "text" : "password"}
                                disabled={!isEditing}
                                className="input input-borderd bg-base-200 w-full pr-10"

                                {...register("new_password", {
                                    required: "New Password Is Required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 character"
                                    }
                                })}
                            />
                            {errors.new_password && (
                                <p className="text-red-500 text-sm mt-1" >{errors.new_password.message}</p>
                            )}

                        </div>
                    </div>


                    {/* confrim password  */}

                    <div className="form-control">
                        <label htmlFor="label">Confrim New Password</label>
                        <div className="relative">
                            <input
                                type= {showPassword ? "text" : "password"}
                                className="input input-borderd w-full pr-10"
                                disabled={!isEditing}
                                {...register("confirm_new_password", {
                                    validate: (value) =>
                                        value === watch("new_password") || "Password do not match",
                                })}
                            />

                        </div>
                        {errors.confrim_new_password && (
                            <p className="text-red-500 text-sm mt-1" >{errors.confrim_new_password.message}</p>
                        )}

                    </div>

                </div>
                {/* ShowPasswordSEction */}
                {isEditing && (
                    <div className="form-control" >
                        <label className="label cursor-pointer">
                            <span className="label-text">Show Passwprd </span>
                            <input
                             type="checkbox" className="toggle"
                             checked={showPassword}
                             onClick={()=> setShowPassword(!showPassword)}
                              />
                        </label>

                    </div>
                )}


            </div>}



        </div>
    );
};

export default PasswordChangeForm;