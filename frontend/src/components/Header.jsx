const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-9 flex items-center justify-center bg-blue-600 text-white font-bold text-xl rounded-lg w-9">
          CC
        </div>
        {/* Hide text on small screens */}
        <span className="hidden md:inline text-lg font-semibold text-gray-800">
          Candidate Categorization
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5 text-gray-500">
        <p className="hidden sm:block">Hi! Admin</p>
        <button className="border rounded-full text-sm px-4 py-1 hover:bg-gray-50 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
