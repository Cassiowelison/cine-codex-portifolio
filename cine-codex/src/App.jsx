import React, { useState, useEffect } from 'react';

function App() {
  // --- Estados ---
  const [busca, setBusca] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // --- API ---
  const API_KEY = import.meta.env.VITE_API_KEY; 
  const API_BASE = 'https://api.themoviedb.org/3';
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const carregarFilmes = async (termoDeBusca = '') => {
    setCarregando(true);
    
    
    const endpoint = termoDeBusca 
      ? `/search/movie?api_key=${API_KEY}&language=pt-BR&query=${termoDeBusca}`
      : `/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

    try {
      const resposta = await fetch(API_BASE + endpoint);
      const dados = await resposta.json();
      setFilmes(dados.results);
    } catch (erro) {
      console.error("Erro:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFilmes();
  }, []);

  
  const lidarComBusca = (e) => {
    e.preventDefault();
    carregarFilmes(busca);
  };

  return (
    <div>
      <h1 className="titulo">🎬 Cine Codex</h1>

      <form onSubmit={lidarComBusca} className="form-busca">
        <input 
          className="input-busca"
          type="text"
          placeholder="Busque um filme (ex: Matrix)..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit" className="btn-buscar">Buscar</button>
      </form>
      
      <div className="container-filmes">
        {carregando && <p style={{textAlign: 'center'}}>Carregando...</p>}
        
        {!carregando && filmes.map(filme => (
          <div 
            key={filme.id} 
            className="card-filme"
            onClick={() => setFilmeSelecionado(filme)}
          >
            <img 
              src={filme.poster_path ? `${IMG_BASE_URL}${filme.poster_path}` : 'https://placehold.co/200x300?text=Sem+Imagem'} 
              alt={filme.title} 
              className="poster" 
            />
            <h3>{filme.title}</h3>
            <p>⭐ {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}</p> 
          </div>
        ))}
      </div>

      {filmeSelecionado && (
        <div className="modal-overlay" onClick={() => setFilmeSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {filmeSelecionado.backdrop_path && (
               <img 
                 src={`${IMG_BASE_URL}${filmeSelecionado.backdrop_path}`} 
                 alt={filmeSelecionado.title}
                 className="modal-img"
               />
            )}
            <h2>{filmeSelecionado.title}</h2>
            <p><strong>Lançamento:</strong> {filmeSelecionado.release_date ? filmeSelecionado.release_date.split('-').reverse().join('/') : 'Data desconhecida'}</p>
            <p className="sinopse">{filmeSelecionado.overview || "Sinopse não disponível."}</p>
            
            <button className="btn-fechar" onClick={() => setFilmeSelecionado(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;