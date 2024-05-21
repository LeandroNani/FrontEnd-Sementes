import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Header from '../components/header';
import PerfilPainel from '../components/perfilPainel';

const Avaliar = () => {
  const navigate = useNavigate();
  const usuarioAvaliado = localStorage.getItem('usuarioAvaliado');

  const [userAvaliacaoCount, setUserAvaliacaoCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [lastUserAvaliacao, setLastUserAvaliacao] = useState(null);
  const labels = {
    1: "Discordo totalmente",
    2: "Discordo parcialmente",
    3: "Não sei dizer",
    4: "Concordo parcialmente",
    5: "Concordo totalmente"
  };

  const getUserAvaliacoes = async (userId) => {
    try {
      const response = await axios.get(`https://projeto-sementes.onrender.com/avaliacoes`);
      const avaliacoes = response.data;
      return avaliacoes.filter((avaliacao) => avaliacao.usuarioAvaliadoId === userId);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getLastUserAvaliacao = async (userId) => {
    try {
      const avaliacoes = await getUserAvaliacoes(userId);
      return avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1] : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (usuarioAvaliado) {
      const fetchUserDataByid = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/usuarios`);
          const users = response.data;
          const user = users.find((user) => user.id === usuarioAvaliado);
          const avaliacoes = await getUserAvaliacoes(user.id);
          const lastAvaliacao = await getLastUserAvaliacao(user.id);
          setLastUserAvaliacao(lastAvaliacao);
          setUserAvaliacaoCount(avaliacoes.length);
          setUserData(user);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserDataByid();
    }
  }, [usuarioAvaliado]);

  const [ratings, setRatings] = useState({
    comunicacao: 0,
    proatividade: 0,
    inteligenciaEmocional: 0,
    flexibilidade: 0,
    criatividade: 0,
    observacao: 0,
  });

  const [comment, setComment] = useState("");
  const handleRadioChange = (event) => {
    setRatings((prevRatings) => ({ ...prevRatings, [event.target.name]: parseInt(event.target.value) }));
  };
  const handleTextareaChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const usuarioAvaliadoIdNumber = localStorage.getItem("usuarioAvaliado");
      const data = {usuarioAvaliadoId: usuarioAvaliadoIdNumber,
        comunicacao: ratings.comunicacao,
        proatividade: ratings.proatividade,
        inteligenciaEmocional: ratings.inteligenciaEmocional,
        flexibilidade: ratings.flexibilidade,
        criatividade: ratings.criatividade,
        observacao: ratings.observacao,
        comentario: comment
      }
      console.log(data)
      const response = await axios.post("https://projeto-sementes.onrender.com/avaliacoes/criar", data, {
  headers: {
    'Content-Type': 'application/json'
  }
});

      console.log(response.data);
      alert("Avaliação enviada com sucesso!");

    } catch (error) {
      console.error(error.response.data);
      alert("Ocorreu um erro ao enviar a avaliação.");
    }
  };

  return (
    <div id="limiter">
      <Header />
      <PerfilPainel userData={userData} userAvaliacaoCount={userAvaliacaoCount} />

      <div className="container-login100">
        <div className="wrap-avaliacao">
          <form className="avaliacao-form validate-form">
            <fieldset>
              <legend>Avaliação de Flexibilidade</legend>
              <p>Quão flexível você considera que o integrante seja quando se trata de lidar com mudanças e imprevistos?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="flexibilidade"
                      id={`flexibilidade${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`flexibilidade${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Avaliação de Proatividade</legend>
              <p>Quão proativo é o integrante em relação à busca por soluções e tomada de iniciativas sem a necessidade de supervisão?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="proatividade"
                      id={`proatividade${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`proatividade${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Avaliação de Inteligência Emocional</legend>
              <p>Quão bem o integrante consegue identificar e gerenciar suas próprias emoções e as emoções dos outros?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="inteligenciaEmocional"
                      id={`inteligenciaEmocional${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`inteligenciaEmocional${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Avaliação de Criatividade</legend>
              <p>Quão criativo o integrante é ao propor soluções e abordar problemas?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="criatividade"
                      id={`criatividade${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`criatividade${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Avaliação de Comunicação</legend>
              <p>Quão claro e eficaz é a comunicação do integrante com os outros membros da equipe?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="comunicacao"
                      id={`comunicacao${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`comunicacao${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Avaliação de Observação</legend>
              <p>Quão atento o integrante está aos detalhes e às tarefas a serem realizadas?</p>
              <div className="flex-container wrap-input100 validate-input">
                {Object.entries(labels).map(([value, labelText]) => (
                  <React.Fragment key={value}>
                    <input
                      className="inputAvaliacao"
                      type="radio"
                      name="observacao"
                      id={`observacao${value}`}
                      value={value}
                      onChange={handleRadioChange}
                    />
                    <label className="label-radio" htmlFor={`observacao${value}`}>
                      {labelText}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>

            <div className="wrap-input100 validate-input">
              <textarea className="input100" name="comentario" id="comentario" placeholder="Comentário" value={comment} onChange={handleTextareaChange}></textarea>
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <button type='button' className="avaliacao-form-btn" onClick={handleSubmit}>Enviar Avaliação</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Avaliar;