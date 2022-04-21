import { client } from "../../client";
import { useState, useEffect } from "react";
import styles from "./SearchFriend.module.css";
import { Link } from "react-router-dom";
import { SearchBar } from "components/SearchBar";

export function SearchFriend() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const getUsers = async () => {
    const item = await client.get("/friend");
    const result = item.data;
    setUsers(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>List of users</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setResults={setResults}
        searchBarInput="friend"
      />
      {search !== "" && results.length > 0 ? (
        <div className={styles.searchResults}>
          {results.map((user) => (
            <div key={user._id}>
              <Link to={`/friendProfile/${user._id}`}>
                <h2>{user.username}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        users.map((user) => {
          return (
            <div key={user._id}>
              <Link to={`/friendProfile/${user._id}`}>
                <h2>{user.username}</h2>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
