import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import comunicacao from "../Utils/img/comunicacao.png";
import proatividade from "../Utils/img/proatividade.png";
import inteligenciaEmocional from "../Utils/img/inteligenciaEmocional.png";
import flexibilidade from "../Utils/img/flexibilidade.png";
import criatividade from "../Utils/img/criatividade.png";
import observacao from "../Utils/img/observacao.png";
import comment from "../Utils/img/comment.png";

import fogueteCarreiras from "../Utils/img/fogueteCarreiras.png";
import '../Utils/css/profile.css';
import '../Utils/css/avaliacao.css';
import axios from 'axios';
import Header from '../components/header';
import PerfilPainel from '../components/perfilPainel';

const Profile = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const [userAvaliacaoCount, setUserAvaliacaoCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [lastUserAvaliacao, setLastUserAvaliacao] = useState(null);

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
    if (email) {
      const fetchUserDataByEmail = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/usuarios`);
          const users = response.data;
          const user = users.find((user) => user.email === email);
          localStorage.setItem('userId', user.id);
          const avaliacoes = await getUserAvaliacoes(user.id);
          const lastAvaliacao = await getLastUserAvaliacao(user.id);
          setLastUserAvaliacao(lastAvaliacao);
          setUserAvaliacaoCount(avaliacoes.length);
          setUserData(user);
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

      <PerfilPainel userData={userData} userAvaliacaoCount={userAvaliacaoCount} />
      <div id="Segunda-parte">

        <div id="ultimasAvaliacoes">
          <div id="avaliacoesTitulo">
            <h2 id="avaliacoesRecebidas">AVALIAÇÕES RECEBIDAS</h2>
          </div>
          {lastUserAvaliacao && (
            <div id="ultimaAvaliacao">
              <table id="tabelaUltimaAvaliacao">
                <tbody>
                  <tr>
                    <td className='skillTd'>
                      <img className='skillIcon' src={comunicacao} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Comunicação:</td>
                    <td className='skillResult'>{lastUserAvaliacao.comunicacao}</td>
                    <td className='skillTd'>
                      <img className='skillIcon' src={proatividade} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Proatividade:</td>
                    <td className='skillResult'>{lastUserAvaliacao.proatividade}</td>
                  </tr>
                  <tr>
                    <td className='skillTd'>
                      <img className='skillIcon' src={inteligenciaEmocional} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Inteligência Emocional:</td>
                    <td className='skillResult'>{lastUserAvaliacao.inteligenciaEmocional}</td>
                    <td className='skillTd'>
                      <img className='skillIcon' src={flexibilidade} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Flexibilidade:</td>
                    <td className='skillResult'>{lastUserAvaliacao.flexibilidade}</td>
                  </tr>
                  <tr>
                    <td className='skillTd'>
                      <img className='skillIcon' src={criatividade} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Criatividade:</td>
                    <td className='skillResult'>{lastUserAvaliacao.criatividade}</td>
                    <td className='skillTd'>
                      <img className='skillIcon' src={observacao} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Observação:</td>
                    <td className='skillResult'>{lastUserAvaliacao.observacao}</td>
                  </tr>
                  <tr>
                    <td className='skillTd'>
                      <img className='skillIcon' src={comment} alt="Icon" />
                    </td>
                    <td className='skillTitle'>Comentário:</td>
                    <td className='skillResult' id='commentResult' >{lastUserAvaliacao.comentario}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <button id='btnAvaliacoes' onClick={() => navigate('/minhasAvaliacoes')}>Todas avaliações Recebidas</button>
        </div>

        <div id="carreiras">
          <div id="carreirasTituloContainer">
            <h2 id="carreirasTitle">CARREIRAS</h2>
          </div>
          <table id='tableCarreira'>
            <tbody>
              <tr>
                <td>
                  <img className='carreiraIcon' src={fogueteCarreiras} alt="Icon" />
                </td>
                <td className='textoCarreiras'>Aprimore suas habilidades</td>
              </tr>
              <tr>
                <td>
                  <img className='carreiraIcon' src={fogueteCarreiras} alt="Icon" />
                </td>
                <td className='textoCarreiras'>Verifique seu desenvolvimento</td>
              </tr>
              <tr>
                <td>
                  <img className='carreiraIcon' src={fogueteCarreiras} alt="Icon" />
                </td>
                <td className='textoCarreiras'>Estude com conteúdos filtrados para você</td>
              </tr>
              <button type='button' className="btnCarreiras" onClick={() => navigate('/carreiras')}>
                Entrar em Carreiras
              </button>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );


};

export default Profile;