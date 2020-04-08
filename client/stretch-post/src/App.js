import React, { useState, useEffect } from "react";
import axios from "axios";
import CharsDisplay from "./charsDisplay";
import "./App.css";

function App() {
  const [chars, setChars] = useState([]);
  console.log(chars, "chars");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        console.log(res, "res from get");
        setChars(res.data);
      })
      .catch((err) => {
        console.log(err, "error from get");
      });
  }, []);
  return (
    <div className="App">
      <CharsDisplay data={chars} />
    </div>
  );
}

export default App;
