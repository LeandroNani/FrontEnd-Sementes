import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import MediaAvaliacoes from '../components/mediaAvaliacoes';
import '../Utils/css/carreiras.css';
import carreirasRocket from "../Utils/img/carreirasRocket.png";
import video from "../Utils/img/video.png";
import artigo from "../Utils/img/artigo.png";
import livro from "../Utils/img/livro.png";
import podcast from "../Utils/img/podcast.png";

const Carreiras = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (email) {
      const fetchUserAvaliacoes = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/avaliacoes`);
          const avaliacoes = response.data;
          const userAvaliacoes = avaliacoes.filter((avaliacao) => avaliacao.usuarioAvaliadoId === userId);
          setAvaliacoes(userAvaliacoes);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserAvaliacoes();
    }
  }, [email, userId]);

  useEffect(() => {
    if (userId) {
      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get(`https://projeto-sementes.onrender.com/feedbacks/`);
          const feedbacksUser = response.data.filter((feedback) => feedback.userId === userId);
          setFeedbacks(feedbacksUser);
        } catch (error) {
          console.error(error);
        }
      };

      fetchFeedbacks();
    }
  }, [userId]);

  const feedbackUser = feedbacks.find((feedback) => feedback.userId === userId);
  const atributos = ['Comunicação', 'Proatividade', 'Criatividade', 'Inteligência Emocional', 'Flexibilidade'];

  return (
    <div id='limiter'>
      <Header />
      <div id="carreirasHeader" style={{ backgroundColor: '#43C9E2', padding: '10px', textAlign: 'center' }}>
        <img id="imgCarreiras" src={carreirasRocket} alt=""></img>
        <h2 id="headerCarreiras">Carreiras</h2>
      </div>

      <div id="painelCarreiras">
        <div id="media-avaliacoes-container">
          <MediaAvaliacoes avaliacoes={avaliacoes} />
        </div>
        <div id="feedbacks-container">
          <h3>Feedback</h3>
          <h4>Relatório</h4>
          {feedbacks.length > 0 ? (
            (feedbackUser && feedbackUser.message) || (
              <div className="feedback-message">Nenhum feedback encontrado.</div>
            )
          ) : (
            <div className="feedback-message">Nenhum feedback encontrado.</div>
          )}

          {feedbackUser && <div className="feedback-message">{feedbackUser.message}</div>}
        </div>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div id='sugestoes'>
          <span>SUGESTÕES DE TRILHAS PRA VOCÊ</span>
        </div>
      </div>


      <div id='trilhas'>
        {atributos.map((atributo, index) => (
          <div key={index} className='trilha'>
            <h4>{atributo}</h4>
            <div className='material'>
              <img className="iconesTrilha" src={video} alt="" />
              <span>Vídeos</span>
            </div>
            <div className='material'>
              <img className="iconesTrilha" src={artigo} alt="" />
              <span>artigos</span>
            </div>
            <div className='material'>
              <img className="iconesTrilha" src={podcast} alt="" />
              <span>podcast</span>
            </div>
            <div className='material'>
              <img className="iconesTrilha" src={livro} alt="" />
              <span>livros</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carreiras;