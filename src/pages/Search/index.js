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
    <div className={styles.search}>
      <h1>List of Animes</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBar
            search={search}
            setSearch={setSearch}
            setResults={setResults}
          />
          {search !== "" && results.length > 0 ? (
            <ListAnime anime={results} />
          ) : (
            <>
              {pageNumber > 1 ? (
                <div>
                  <button onClick={() => setPageNumber(pageNumber - 1)}>
                    Previous page
                  </button>
                  <button onClick={() => setPageNumber(pageNumber + 1)}>
                    Next page
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => setPageNumber(pageNumber + 1)}>
                    Next page
                  </button>
                </div>
              )}
              <ListAnime anime={anime} />
            </>
          )}
        </>
      )}
    </div>
  );
}
