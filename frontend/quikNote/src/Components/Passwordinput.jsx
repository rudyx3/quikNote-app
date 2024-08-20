import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Passwordinput = ({ outline, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center border-2 rounded-md mb-2 border-custom-green">
      <input
        className="w-full p-2 bg-transparent outline-none "
        placeholder={placeholder || "Password"}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      {showPassword ? (
        <FaRegEyeSlash
          size={22}
          className="text-custom-green cursor-pointer mr-3"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEye
          size={22}
          className="text-custom-green cursor-pointer mr-3"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default Passwordinput;
