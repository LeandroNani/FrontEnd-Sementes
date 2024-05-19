import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../Utils/img/avatar.png";
import ponto from "../Utils/img/ponto.png";
import eSemente from "../Utils/img/eSemente.png";
import avaliacoes from "../Utils/img/avaliacoes.png";
import fogueteCarreiras from "../Utils/img/fogueteCarreiras.png";
import '../Utils/css/profile.css';
import axios from 'axios';
import Header from '../components/header';

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

      <div className="painelPerfil">
        <div id="profile">
          <img id="avatar-painel" src={avatar} alt="" />
          <div id="perfil-infos">
            {userData && (
              <>
                <h2 id="nome">{userData.nome}</h2>
                <br />
                <img id="ponto" src={ponto} alt="" />
                <span id="funcao">{userData.cargo}</span>
              </>
            )}
          </div>
        </div>

        <div id="infoProfile">
          <div id="tempoEmpresa">
            <img id="img-eSemente" src={eSemente} alt="" />
            <span id="eSement-Txt">É SEMENTE HÁ</span>
            <span id="eSemente-Txt2">1 ANO</span>
          </div>
          <div id="tempoEmpresa">
            <img id="img-eSemente" src={avaliacoes} alt="" />
            <span id="eSement-Txt">AVALIAÇÕES</span>
            <span id="eSemente-Txt2">{userAvaliacaoCount}</span>
          </div>
        </div>



        <div id="ultimasAvaliacoes">
          <div id="avaliacoesTitulo">
            <h2 id="avaliacoesRecebidas">AVALIAÇÕES RECEBIDAS</h2>
          </div>
          {lastUserAvaliacao && (
            <div id="ultimaAvaliacao">
              <table id="tabelaUltimaAvaliacao">
                <tbody>
                  <tr>
                    <td>Comunicação:</td>
                    <td>{lastUserAvaliacao.comunicacao}</td>
                  </tr>
                  <tr>
                    <td>Proatividade:</td>
                    <td>{lastUserAvaliacao.proatividade}</td>
                  </tr>
                  <tr>
                    <td>Inteligência Emocional:</td>
                    <td>{lastUserAvaliacao.inteligenciaEmocional}</td>
                  </tr>
                  <tr>
                    <td>Flexibilidade:</td>
                    <td>{lastUserAvaliacao.flexibilidade}</td>
                  </tr>
                  <tr>
                    <td>Criatividade:</td>
                    <td>{lastUserAvaliacao.criatividade}</td>
                  </tr>
                  <tr>
                    <td>Observação:</td>
                    <td>{lastUserAvaliacao.observacao}</td>
                  </tr>
                  <tr>
                    <td>Comentário:</td>
                    <td>{lastUserAvaliacao.comentario}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

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