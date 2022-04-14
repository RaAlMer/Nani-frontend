import { client } from "client";
import { ListAnime, Spinner } from "components";
import { SearchBar } from "components/SearchBar";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

export function Search() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const getAnime = async () => {
    const item = await client.get(`/anime/listAnime/page/${pageNumber}`);
    const result = item.data;
    setAnime(result);
    setLoading(false);
  };

  useEffect(() => {
    getAnime();
  }, [pageNumber]);

  return (
    <div>
      <h1>All Animes</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBar
            search={search}
            setSearch={setSearch}
            results={results}
            setResults={setResults}
          />
          {results.length > 1 ? (
            <ListAnime anime={results} />
          ) : (
            <>
              {pageNumber > 1 ? (
                <>
                  <button onClick={() => setPageNumber(pageNumber + 1)}>
                    next page
                  </button>
                  <button onClick={() => setPageNumber(pageNumber - 1)}>
                    previous page
                  </button>
                </>
              ) : (
                <button onClick={() => setPageNumber(pageNumber + 1)}>
                  next page
                </button>
              )}
              <ListAnime anime={anime} />
            </>
          )}
        </>
      )}
    </div>
  );
}
