import React from "react";
import { FaUser } from "react-icons/fa";

export const ProfileInfo = ({ onLogout, userName }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-custom-green w-12 h-12 flex items-center justify-center">
        <FaUser size={22} color={"white"} />
      </div>
      <div>
        <p className="text-md font-semibold text-custom-green">
          {userName?.name.charAt(0).toUpperCase() + userName?.name.slice(1)}{" "}
        </p>
        <button
          className="underline text-custom-green text-sm "
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
