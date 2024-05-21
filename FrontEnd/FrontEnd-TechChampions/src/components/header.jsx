import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../Utils/img/logo.png";
import avatar from "../Utils/img/avatar.png";
import configs from "../Utils/img/config.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pesquisarDiv = document.getElementById('pesquisar');

  if (pesquisarDiv !== null) {
    if (searchTerm.length > 1) {
      pesquisarDiv.classList.add('search-term-long');
    } else {
      pesquisarDiv.classList.remove('search-term-long');
    }
  } else {
    console.error('elemento não encontrado');
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchUsers();
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://projeto-sementes.onrender.com/usuarios`);
      const users = response.data;
      const filteredUsers = users.filter((user) => user.nome.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(filteredUsers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAvaliarClick = (e) => {
    const userId = e.currentTarget.dataset.userId;
    localStorage.setItem('usuarioAvaliado', userId);
    navigate('/avaliar');
  };
  return (
    <div id="header">
      <nav>
        <ul id="ul-nav">
          <li>
            <img id="logo-profile" src={logo} onClick={() => navigate('/profile')} alt=""></img>
          </li>
          <li>
            <form>
              <input id="pesquisar" type="search" placeholder="Pesquise um integrante para avaliar" onChange={handleSearch} />
            </form>
            {searchTerm.length > 1 && (
              <div id="search-results" className="search-results">
                <table>
                  {searchResults.map((user) => (
                    <div key={user.id} className="search-result-item">
                      <tr className="trSearch">
                        <td className="tdSearch">
                          <span className="spanOrange">{user.nome}</span>
                        </td>
                        <td className="tdSearch">
                          <span className="spanPurple">Cargo:</span>
                          <span className="spanOrange">{user.cargo}</span>
                        </td>
                        <td className="tdSearch">
                        <button type='button' id='buttonAvaliar' data-user-id={user.id} onClick={handleAvaliarClick}>Avaliar!</button>
                        </td>
                      </tr>
                    </div>
                  ))}
                </table>
              </div>
            )}
          </li>
          <li>
            <img id="avatar-navbar" onClick={() => navigate('/profile')} src={avatar} alt="" />
          </li>
          <li>
            <img id="configs" src={configs} alt="" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;