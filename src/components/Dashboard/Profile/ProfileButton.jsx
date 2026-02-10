const ProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-center pt-6">
      {isEditing ? (
        <div className="flex gap-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
