import React from 'react';
import ProgressBar from '../components/progressBar.jsx';
import comunicacao from "../Utils/img/comunicacao.png";
import proatividade from "../Utils/img/proatividade.png";
import inteligenciaEmocional from "../Utils/img/inteligenciaEmocional.png";
import flexibilidade from "../Utils/img/flexibilidade.png";
import criatividade from "../Utils/img/criatividade.png";
import observacao from "../Utils/img/observacao.png";

const MediaAvaliacoes = ({ avaliacoes }) => {
  const atributosValidos = ['comunicacao', 'proatividade', 'inteligenciaEmocional', 'flexibilidade', 'criatividade', 'observacao'];
  const atributosImagens = {
    comunicacao: comunicacao,
    proatividade: proatividade,
    inteligenciaEmocional: inteligenciaEmocional,
    flexibilidade: flexibilidade,
    criatividade: criatividade,
    observacao: observacao,
  };


  if (!avaliacoes || !avaliacoes.length) {
    return <div>Nenhuma avaliação encontrada.</div>;
  }

  const avaliacoesValidas = avaliacoes.filter((avaliacao) => {
    return atributosValidos.every((atributo) => typeof avaliacao[atributo] === 'number' && !isNaN(avaliacao[atributo]));
  });

  const mediaGeral = avaliacoesValidas.length > 0 ? (
    avaliacoesValidas.reduce((total, avaliacao) => {
      const somaAtributos = atributosValidos.reduce((soma, atributo) => soma + avaliacao[atributo], 0);
      return total + somaAtributos;
    }, 0) / atributosValidos.length / avaliacoesValidas.length
  ) : 0;

  const mediaAtributos = atributosValidos.map((atributo) => {
    const atributoAvaliacoes = avaliacoes.map(a => a[atributo]).filter(n => !isNaN(n));
    const media = atributoAvaliacoes.reduce((sum, n) => sum + n, 0) / atributoAvaliacoes.length;
    return { atributo, media };
  });

  return (
    <div className="media-avaliacoes">
      <h3>{mediaGeral.toFixed(2)}</h3>
      {mediaAtributos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Atributo</th>
              <th>Média</th>
              <th>Progresso</th>
            </tr>
          </thead>
          <tbody>
            {mediaAtributos.map(({ atributo, media }) => (
              <tr key={atributo}>
                <td><img src={atributosImagens[atributo]} alt="" /></td>
                <td className='atributeTitle'>{atributo}</td>
                <td>{media.toFixed(2)}</td>
                <td><ProgressBar value={media.toFixed(2)} maxValue={5} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MediaAvaliacoes;