import { client } from "client";
import { useEffect, useState } from "react";

export function SearchBar({search, setSearch, results, setResults}) {

  const getSearchResult = async (e) => {
    const item = await client.get(`/anime/search/${e}`);
    const result = item.data;
    setResults(result);
  };


  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => getSearchResult(e.target.value)}
      />
    </>
  );
}
