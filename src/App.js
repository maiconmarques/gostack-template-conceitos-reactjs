import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response);
      setRepositories(response.data);
    }

    )
  })
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "md",
      url: "https://github.com/maiconmarques/Desafio-Conceitos-do-Node",
      techs: [
        "dino",
        "7"
      ]
    });
      const repository = response.data;
      setRepositories([...repositories,repository]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/'+id);
      //const repository = response.data;
      //setRepositories([...repositories,repository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button></li>)}
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
