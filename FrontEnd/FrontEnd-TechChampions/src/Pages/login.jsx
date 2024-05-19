import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Utils/css/util.css';
import '../Utils/css/main.css';
import '../Utils/css/login.css';
import imagem from "../Utils/img/logoRoxo.png";
import bordao from "../Utils/img/imagemBordao.png";
import Modal from 'react-modal';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [newNome, setnewNome] = useState('');
  const [newCargo, setnewCargo] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleLogin = async () => {
    try {
      console.log(`Email: ${email}, Password: ${password}`)
      const data = { email, password };
      const response = await axios.post('https://projeto-sementes.onrender.com/usuarios/login', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
      const { token, message } = response.data;
  
      if (token) {
        setSuccess(true);
        localStorage.setItem('token', token);
        navigate('/profile');
        alert('Login feito com Sucesso!')
      } else {
        setError(message || 'Email ou senha incorretos');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleRegister = async () => {
    try {
      const data = { newNome, newEmail, newPassword, newCargo };
      const response = await axios.post('https://projeto-sementes.onrender.com/usuarios/register', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { success, message } = response.data;
  
      if (success) {
        setSuccess(true);
        setIsOpen(false);
      } else {
        setError(message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function abrirModal() {
    setIsOpen(true);
  }
  function fecharModal() {
    setIsOpen(false);
  }

  return (
    <div className="limiter">
      <div id="container">
        <div id="inicio">
        <img id="bordao" src={bordao} alt=""></img>
        </div>

        <div id="fim">
          <div className="logoTitulo">
            <img id="logo" src={imagem} alt=""></img>
          </div>
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form">
                <span id="textoWelcome" className="login100-form-title p-b-26">
                  Seja bem-vindo ao Sementes!
                </span>
                <span className="login100-form-title p-b-30">
                  <p id="textoDescricao">Entre ou faça seu cadastro com a conta da empresa</p>
                </span>

                <div className="wrap-input100 validate-input" >
                  <label className="senhaEmail" htmlFor="">Email</label>
                  <input className="input100" type="text" name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <span className="focus-input100" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <span className="btn-show-pass" onClick={handleShowPassword}>
                    {showPassword ? "Esconder" : "Mostrar"}
                  </span>
                  <label className="senhaEmail" htmlFor="">Senha</label>
                  <input className="input100" type={showPassword ? "text" : "password"} name="pass" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <span className="focus-input100" data-placeholder="Password"></span>
                </div>

                <div className="checkbox-wrapper-29">
                  <label htmlFor="keepConnected" className="checkbox">
                    <input
                      className="checkbox__input"
                      type="checkbox"
                      id="keepConnected"
                      checked={keepConnected}
                      onChange={(e) => setKeepConnected(e.target.checked)}
                    />
                    <span className="checkbox__label"></span>
                    <p>Manter-se conectado</p>
                  </label>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button type='button' className="login100-form-btn" onClick={handleLogin}>
                      Login
                    </button>
                  </div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>Login realizado com sucesso!</div>}
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="cadastro-bgbtn"></div>
                    <button type='button' onClick={abrirModal} className="cadastro-btn">
                      Cadastrar Conta
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
        className="modal-content login100-form validate-form"
        overlayClassName="modal-overlay"
      >
        <div className="wrap-input100 validate-input">
          <label className="senhaEmail" htmlFor="">Insira Seu Nome Completo</label>
          <input placeholder='Nome Completo' className="input100" type="text" name="newNome"
            value={newNome}
            onChange={(e) => setnewNome(e.target.value)} />
          <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 validate-input">
          <label className="senhaEmail" htmlFor="">Insira seu Cargo</label>
          <input placeholder='Insira seu Cargo' className="input100" type="text" name="newCargo"
            value={newCargo}
            onChange={(e) => setnewCargo(e.target.value)} />
          <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
          <label className="senhaEmail" htmlFor="">Cadastre seu E-mail</label>
          <input placeholder='Insira seu e-mail' className="input100" type="text" name="newEmail"
            value={newEmail}
            onChange={(e) => setnewEmail(e.target.value)} />
          <span className="focus-input100" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Enter password">
          <span className="btn-show-pass" onClick={handleShowPassword}>
            {showPassword ? "Esconder" : "Mostrar"}
          </span>
          <label className="senhaEmail" htmlFor="">Crie sua Senha</label>
          <input placeholder='Insira sua Senha' className="input100" type={showPassword ? "text" : "password"} name="newPassword" value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)} />
          <span className="focus-input100" data-placeholder="Password"></span>
        </div>

        <hr id="linha" />

        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
            <div className="login100-form-bgbtn"></div>
            <button className="login100-form-btn" onClick={handleRegister}>
              Criar Conta
            </button>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>cadastro realizado com sucesso!</div>}
        </div>
      </Modal>
    </div>
  );
};

export default Login;