const InputField = ({ label, name, register, disabled, error }) => {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...register(name)}
        disabled={disabled}
        className={`w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 
        ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-primary"}
      `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
