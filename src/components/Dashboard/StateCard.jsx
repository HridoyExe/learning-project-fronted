const StateCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-base-100 border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-base-content/60">{title}</p>
          <h3 className="text-3xl font-bold mt-1">
            {value !== undefined ? value.toLocaleString() : "N/A"}
          </h3>
        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCard;
