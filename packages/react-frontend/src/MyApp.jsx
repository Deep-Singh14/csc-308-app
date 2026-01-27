// src/MyApp.jsx
import React, { useState, useEffect } from "react";

import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    const id = userToDelete.id;

    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((j, i) => i !== index);
          setCharacters(updated);
        } else if (res.status === 404) {
          console.log("User not found");
        } else {
          console.log("Delete failed.");
        }
      })
      .catch((error) => console.log(error));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Failed to add user");
        }
        return res.json();
      })
      .then((mewUser) => {
        setCharacters([...characters, mewUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
