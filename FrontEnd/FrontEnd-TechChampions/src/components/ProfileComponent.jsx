import React from 'react';

const ProfileComponent = ({ userData, avatar }) => {
  return (
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
  );
};

export default ProfileComponent;