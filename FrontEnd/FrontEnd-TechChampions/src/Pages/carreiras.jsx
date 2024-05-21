import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import MediaAvaliacoes from '../components/mediaAvaliacoes';
import '../Utils/css/carreiras.css';
import carreirasRocket from "../Utils/img/carreirasRocket.png";

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


  return (
    <div id='limiter'>
      <Header />
      <div id="carreirasHeader" style={{ backgroundColor: '#43C9E2', padding: '10px', textAlign: 'center' }}>
        <img id="imgCarreiras" src={carreirasRocket} alt=""></img>
        <h2 id="headerCarreiras">Carreiras</h2>
      </div>
      <div id="media-avaliacoes-container">
        <MediaAvaliacoes avaliacoes={avaliacoes} />
      </div>
      <div id="feedbacks-container">
        {feedbacks.length > 0 ? (
          (feedbackUser && feedbackUser.message) || (
            <div>Nenhum feedback encontrado.</div>
          )
        ) : (
          <div>Nenhum feedback encontrado.</div>
        )}

        {feedbackUser && <div id="feedback-message">{feedbackUser.message}</div>}
      </div>
    </div>
  );
};

export default Carreiras;