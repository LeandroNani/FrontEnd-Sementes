import React from 'react';

const InfoProfileComponent = ({ eSemente, avaliacoes, tempoEmpresa, numAvaliacoes }) => {
  return (
    <div id="infoProfile">
      <div id="tempoEmpresa">
        <img id="img-eSemente" src={eSemente} alt="" />
        <span id="eSement-Txt">É SEMENTE HÁ</span>
        <span id="eSemente-Txt2">{tempoEmpresa}</span>
      </div>
      <div id="tempoEmpresa">
        <img id="img-eSemente" src={avaliacoes} alt="" />
        <span id="eSement-Txt">AVALIAÇÕES</span>
        <span id="eSemente-Txt2">{numAvaliacoes}</span>
      </div>
    </div>
  );
};

export default InfoProfileComponent;