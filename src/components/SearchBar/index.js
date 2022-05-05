import { client } from "client";
import styles from "./Search.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";

export function SearchBar({ search, setSearch, setResults, searchBarInput, followBtnToggle }) {
  const [isEmpty, setIsEmpty] = useState(false);

  const getSearchResult = async () => {
    const item = await client.get(`/${searchBarInput}/search/${search}`);
    const result = item.data;
    if (result.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setResults(result);
    }
  };
  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      getSearchResult();
    }
  };
  useEffect(() => {
    getSearchResult();
  }, [followBtnToggle]);

  return (
    <div>
      <input
        className={styles.searchBar}
        value={search}
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value === "") {
            setResults([]);
          }
        }}
        onKeyPress={handleKeypress}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          getSearchResult();
        }}
      >
        <BiSearchAlt2 />
      </button>
      {isEmpty && <p>No results found</p>}
    </div>
  );
}
