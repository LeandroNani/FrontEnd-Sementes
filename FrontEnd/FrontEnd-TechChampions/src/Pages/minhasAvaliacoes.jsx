import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import '../Utils/css/minhasAvaliacoes.css';

const MinhasAvaliacoes = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [userAvaliacoes, setUserAvaliacoes] = useState([]);

  const getUserAvaliacoes = async () => {
    try {
      const response = await axios.get(`https://projeto-sementes.onrender.com/avaliacoes`);
      const avaliacoes = response.data;
      const userAvaliacoes = avaliacoes.filter((avaliacao) => avaliacao.usuarioAvaliadoId === userData.id);
      setUserAvaliacoes(userAvaliacoes);
    } catch (error) {
      console.error(error);
    }
  };

  const userData = {
    id: ''
  };

  useEffect(() => {
    if (email) {
      const fetchUserDataByEmail = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/usuarios`);
          const users = response.data;
          const user = users.find((user) => user.email === email);
          userData.id = user.id;
          getUserAvaliacoes();
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserDataByEmail();
    }
  }, [email]);

  return (
    <div id="limiter">
      <Header />

      <div id="avaliacoesRecebidasHeader" style={{ backgroundColor: '#FFA500', padding: '10px', textAlign: 'center' }}>
        <h2 id='header2'>Avaliações Recebidas</h2>
      </div>

      <div id="tabelaAvaliacoesContainer">
        <table id='table'>
          <thead className="sticky-headers">
            <tr className='trMinhasAvaliacoes'>
              <th>Comunicação</th>
              <th>Proatividade</th>
              <th>Inteligência Emocional</th>
              <th>Flexibilidade</th>
              <th>Criatividade</th>
              <th>Observação</th>
              <th>Comentário</th>
            </tr>
          </thead>
          <tbody>
            {userAvaliacoes.map((avaliacao) => (
              <tr className='trMinhasAvaliacoes' key={avaliacao.id}>
                <td>{avaliacao.comunicacao}</td>
                <td>{avaliacao.proatividade}</td>
                <td>{avaliacao.inteligenciaEmocional}</td>
                <td>{avaliacao.flexibilidade}</td>
                <td>{avaliacao.criatividade}</td>
                <td>{avaliacao.observacao}</td>
                <td id='tdComentario'>{avaliacao.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MinhasAvaliacoes;