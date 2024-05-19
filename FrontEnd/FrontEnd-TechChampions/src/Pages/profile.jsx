import React, { useState, useEffect } from 'react';
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
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [userData, setUserData] = React.useState(null);
  const [ultimaAvaliacao, setUltimaAvaliacao] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/usuarios`, config);
          const users = response.data;
          const user = users.find((user) => user.id === localStorage.getItem('userId'));
          if (user) {
            setUserData(user);
          }
        } catch (error) {
          setError(error.message);
        }
      };

      const fetchAvaliacoes = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/avaliacoes`, config);
          const avaliacoes = response.data;
          const ultimaAvaliacao = avaliacoes.find((avaliacao) => avaliacao.usuarioAvaliadoId === localStorage.getItem('userId'));
          setUltimaAvaliacao(ultimaAvaliacao);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchUserData();
      fetchAvaliacoes();
    }
  }, [token]);

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
            <span id="eSemente-Txt2">87</span>
          </div>
        </div>



        <div id="ultimasAvaliacoes">
          <div id="avaliacoesTitulo">
            <h2 id="avaliacoesRecebidas">AVALIAÇÕES RECEBIDAS</h2>
          </div>
          {ultimaAvaliacao && (
            <>
              <h3>Última Avaliação Recebida</h3>
              <p>Média dos atributos: {
                ((ultimaAvaliacao.comunicacao +
                  ultimaAvaliacao.proatividade +
                  ultimaAvaliacao.inteligenciaEmocional +
                  ultimaAvaliacao.flexibilidade +
                  ultimaAvaliacao.criatividade +
                  ultimaAvaliacao.observacao) /
                  6).toFixed(2)
              }</p>
              <p>Comentário: {ultimaAvaliacao.comentario}</p>
            </>
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