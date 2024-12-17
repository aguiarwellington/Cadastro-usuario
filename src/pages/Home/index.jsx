import { useState, useEffect, useRef } from "react";
import "./style.css";
import api from "../../services/api";

function Home() {
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);

  // Refs para os campos do formulário
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função para buscar usuários da API
  async function getUsers() {
    try {
      const response = await api.get("/usuarios");
      setUsers(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  // Função para excluir um usuário
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers();
  }
  
  // Função para criar um novo usuário
  async function createUsers() {
    try {
      // Envia os dados do formulário para a API
      await api.post("/usuarios", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });

      // Atualiza a lista de usuários
      getUsers();

      // Limpa os campos do formulário
      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  // useEffect para chamar getUsers ao carregar o componente
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="form-box">
        <h2>Cadastro de Usuários</h2>
        <form>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            className="input"
            ref={inputName}
          />
          <input
            name="idade"
            type="number"
            placeholder="Idade"
            className="input"
            ref={inputAge}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            className="input"
            ref={inputEmail}
          />
          <button type="button" onClick={createUsers} className="btn">
            Cadastrar
          </button>
        </form>
      </div>

      {/* Renderiza a lista de usuários */}
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Idade:</strong> {user.age}
            </p>
            <p>
              <strong>E-mail:</strong> {user.email}
            </p>
            
            <button
              className="delete-btn"
              onClick={() => deleteUsers(user.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
