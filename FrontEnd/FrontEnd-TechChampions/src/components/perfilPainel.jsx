import React from 'react';
import avatar from "../Utils/img/avatar.png";
import ponto from "../Utils/img/ponto.png";
import eSemente from "../Utils/img/eSemente.png";
import avaliacoes from "../Utils/img/avaliacoes.png";


const PerfilPainel = ({ userData, userAvaliacaoCount }) => {
  return (
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
    </div>
  );
};

export default PerfilPainel;