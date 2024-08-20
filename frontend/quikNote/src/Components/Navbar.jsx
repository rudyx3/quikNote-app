import React, { useState } from "react";
import MyIcon from "./Icons";
import { ProfileInfo } from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
export const Navbar = ({
  userD,
  handleSearch,
  setIsSearch,
  setSearchResults,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  //logout function
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  //disable searchQuery
  const onClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
    setSearchResults([]);
  };

  const handleSearchQuery = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#F9F7F0] p-5 px-10 flex items-center justify-between drop-shadow-md">
        <div className="flex items-center space-x-2 mr-3">
          <MyIcon width="40px" className="ml-1" />
          <h1 className="text-2xl font-semibold font-playfair text-custom-green">
            QuikNote
          </h1>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClearSearch={onClearSearch}
          handleSearch={handleSearchQuery}
        />
        <div className="items-center space-x-3 hidden lg:flex ml-3">
          <ProfileInfo onLogout={onLogout} userName={userD} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
