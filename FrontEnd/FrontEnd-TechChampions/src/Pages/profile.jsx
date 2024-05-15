import React from "react";
import imagem from "../Utils/img/react.svg";
import '../Utils/css/profile.css';

const Profile = () => {

  return (
    <div className="limiter">
      <nav>
        <ul>
          <li>
            <img id="logo" src={imagem} alt=""></img>
            </li>
          <li>
            <a href="#">Menu</a>
          </li>
          <li>
            <a href="#">Perfil</a>
          </li>
          <li>
            <form>
              <input type="search" placeholder="Pesquise um integrante ou projeto para avaliar" />
              <button type="submit">Buscar</button>
            </form>
          </li>
          <li>
            <img src="avatar" alt="" />
          </li>
          <li>
            <img src="configurações" alt="" />
            </li>
        </ul>
      </nav>


      <div className="painelPerfil">
      
        <div id="profile">
        <img src="avatar" alt="" />
        <h2>Nome</h2>

        <span>Departamento</span>
        <span>•</span>
        <span>Função</span>
        </div>


      </div>
    </div>
  );


};

export default Profile;