import { client } from "client";

export function SearchBar({ search, setSearch, setResults }) {
  const getSearchResult = async () => {
    const item = await client.get(`/anime/search/${search}`);
    const result = item.data;
    setResults(result);
  };

  return (
    <>
      <input
        value={search}
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value === "") {
            setResults([]);
          }
        }}
      />
      <button
        onClick={() => {
          getSearchResult(search);
        }}
      >
        Search animes
      </button>
    </>
  );
}
