const Header = () => {
  return (
    <header className="w-full flex justify-end items-center bg-zinc-900 text-white px-6 py-4 shadow border-b border-zinc-700">
      <h3 id="loggedInUser" className="text-lg font-medium mr-4">
        Welcome ShorooqSousa
      </h3>
      <button className="bg-red-600 hover:border-2 hover:border-white text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
};

export default Header;
