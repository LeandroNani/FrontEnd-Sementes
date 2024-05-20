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
    console.error('Elemento com id "pesquisar" não encontrado no DOM');
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

  return (
    <div id="header">
      <nav>
        <ul id="ul-nav">
          <li>
            <img id="logo-profile" src={logo} alt=""></img>
          </li>
          <li>
            <form>
              <input id="pesquisar" type="search" placeholder="Pesquise um integrante para avaliar" onChange={handleSearch} />
              <svg id="icone-pesquisa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M29.6421 32L21.7263 24.0842C20.5754 24.9825 19.3053 25.6842 17.9158 26.1895C16.5263 26.6947 15.0456 26.9474 13.4737 26.9474C9.71228 26.9474 6.52632 25.6421 3.91579 23.0316C1.30526 20.4211 0 17.2351 0 13.4737C0 9.71228 1.30526 6.52632 3.91579 3.91579C6.52632 1.30526 9.71228 0 13.4737 0C17.2351 0 20.4211 1.30526 23.0316 3.91579C25.6421 6.52632 26.9474 9.71228 26.9474 13.4737C26.9474 15.0456 26.6947 16.5263 26.1895 17.9158C25.6842 19.3053 24.9825 20.5754 24.0842 21.7263L32 29.6421L29.6421 32ZM13.4737 23.5789C16.2807 23.5789 18.6667 22.5965 20.6316 20.6316C22.5965 18.6667 23.5789 16.2807 23.5789 13.4737C23.5789 10.6667 22.5965 8.2807 20.6316 6.31579C18.6667 4.35088 16.2807 3.36842 13.4737 3.36842C10.6667 3.36842 8.2807 4.35088 6.31579 6.31579C4.35088 8.2807 3.36842 10.6667 3.36842 13.4737C3.36842 16.2807 4.35088 18.6667 6.31579 20.6316C8.2807 22.5965 10.6667 23.5789 13.4737 23.5789Z" fill="#B3B6B6" />
              </svg>
              <button id="button-buscar" type="submit">Buscar</button>
            </form>
            {searchTerm.length > 1 && (
              <div id="search-results" className="search-results">
                <table>
                {searchResults.map((user) => (
                  <div key={user.id} className="search-result-item">
                      <tr className="trSearch">
                        <td className="tdSearch">
                          <span className="spanPurple">Nome:</span>
                          <span className="spanOrange">{user.nome}</span>
                        </td>
                        <td className="tdSearch">
                          <span className="spanPurple">Cargo:</span>
                          <span className="spanOrange">{user.cargo}</span>
                        </td>
                        <td className="tdSearch">
                          <button type='button'> Avaliar!</button>
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