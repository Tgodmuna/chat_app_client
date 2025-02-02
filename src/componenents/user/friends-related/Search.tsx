import { type FC, useState } from "react";
import type { friendListType, userDataType } from "../../../types";
import React from "react";

const Search: FC<{ data: friendListType }> = React.memo(({ data }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<userDataType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (searchTerm.trim() === "") {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filtered = data?.filter(
      (friend) =>
        friend?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="w-full px-4 py-6 bg-gray-50 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search friends..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
      />
      {isSearching &&
        (results.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {results.map((friend, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-100 transition">
                {friend.name} ({friend.username})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No results found.</p>
        ))}
    </div>
  );
});

export default Search;
