import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full md:w-80 flex items-center px-3 bg-[#cdd2c8] rounded-3xl">
      <input
        type="text"
        placeholder="Search Notes..."
        className="py-2 pl-2 outline-none bg-transparent text-md text-custom-green w-full placeholder-[#608273]"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="mr-3 text-[#608273] cursor-pointer hover:text-custom-green text-xl"
          size={20}
          onClick={onClearSearch}
        />
      )}
      <FaSearch
        size={20}
        className="text-[#608273] cursor-pointer hover:text-custom-green"
        onClick={handleSearch}
      />
    </div>
  );
};
