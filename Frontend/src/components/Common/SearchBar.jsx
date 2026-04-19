import React, { useState, useEffect, useRef } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFilters,
  fetchProductsByFilters,
} from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  // Auto focus
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // ESC + outside click close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);

    const handleClickOutside = (e) => {
      if (overlayRef.current === e.target) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));

    navigate(`/collection/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const suggestions = ["T-Shirts", "Shoes", "Jeans", "Hoodies", "Jackets"];

  return (
    <>
      {/* SEARCH ICON */}
      <button
        onClick={() => setIsOpen(true)}
        className="hover:scale-110 transition"
      >
        <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
      </button>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 flex items-start justify-center pt-28 px-4 transition-all duration-300 ${
          isOpen
            ? "bg-black/40 backdrop-blur-sm opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {/* SEARCH BOX */}
        <div
          className={`w-full max-w-2xl transform transition-all duration-300 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-5"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full shadow-xl px-5 py-3"
          >
            {/* ICON */}
            <HiMagnifyingGlass className="h-5 w-5 text-gray-500" />

            {/* INPUT */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 outline-none text-sm"
            />

            {/* CLEAR */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-black"
              >
                <HiMiniXMark className="h-5 w-5" />
              </button>
            )}

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 text-gray-600 hover:text-black"
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>
          </form>

          {/* SUGGESTIONS */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-4">
            <p className="text-xs text-gray-500 mb-3">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(item);
                    dispatch(setFilters({ search: item }));
                    navigate(`/collection/all?search=${item}`);
                    setIsOpen(false);
                  }}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;