import { useState } from 'react';
import './util.css';
import './main.css';
import './login.css';
import imagem from "./react.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);

  return (
    <div className="limiter">
    <div id = "container">
      <div id="inicio">
        <img src={imagem} alt=""></img>
        <p id="texto1">Fortalecendo laços, cultivando talentos, crescendo juntos!</p>
      </div>

      <div id="fim">
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form">
                <span id="textoWelcome" className="login100-form-title p-b-26">
                Seja bem-vindo ao Sementes!
                </span>
                <span className="login100-form-title p-b-48">
                <p id= "textoDescricao">Entre ou faça seu cadastro com a conta da empresa</p>
                </span>

                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                  <input className="input100" type="text" name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <span className="focus-input100" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <span className="btn-show-pass">
                    <i className="zmdi zmdi-eye"></i>
                  </span>
                  <input className="input100" type="password" name="pass" value={password}
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
                    <button className="login100-form-btn">
                      Login
                    </button>
                  </div>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn">
                      Cadastrar Conta
                    </button>
                  </div>
                </div>

                

                <div className="text-center p-t-20">
                <a className="txt2" href="#">
                    Esqueceu sua Senha ?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;