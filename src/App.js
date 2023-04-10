import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  function jokeGenrate() {
    let url = "https://official-joke-api.appspot.com/jokes/random";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setJokes(data);
      });
  }
  function addBookmark(newBookmark) {
    setBookmarks([...bookmarks, newBookmark]);
    localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, newBookmark]));
  }
  function removeBookmark(index) {
    const newBookmarks = bookmarks.filter((bookmark, i) => i !== index);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  }
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (storedBookmarks) {
      setBookmarks(storedBookmarks);
    }
  }, []);
  
  return (
    <div className="App">
      <div className="bookmark_display">
        {bookmarks.map((j, i) => {
          return (
            <div key={j.id} className="bm-dis">
              <p>{j.setup}</p>
              <p>{j.punchline}</p>
              <button onClick={()=>removeBookmark(i)}>delete bookmark</button>
            </div>
          );
        })}
      </div>
      <div className="joke_display">
        <h2>Jokes Application</h2>
        <div className="joke">
          <p>{jokes.setup}</p>
          <p>{jokes.punchline}</p>
        </div>
        <div className="btns">
          <button onClick={() => jokeGenrate()}>New Joke</button>
          <button onClick={() => addBookmark(jokes)}>Bookmarks</button>
        </div>
      </div>
      <div className="footer">
         <a href=""/>
      </div>
    </div>
  );
}

export default App;
