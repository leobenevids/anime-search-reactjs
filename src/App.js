import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

const api = "https://kitsu.io/api/edge/";

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    if (text) {
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <>
      <div className="header-container">
        <h1>AnimeSearch</h1>
        <SearchInput value={text} onChange={(search) => setText(search)} />
        {text && !info.data && (
          <span>Carregando...</span>
        )}
      </div>
      <div className="wrapper">
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small}/>
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
}

export default App;
