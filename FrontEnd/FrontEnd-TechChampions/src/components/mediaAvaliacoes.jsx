import React from 'react';

const MediaAvaliacoes = ({ avaliacoes }) => {
  const atributosValidos = ['comunicacao', 'proatividade', 'inteligenciaEmocional', 'flexibilidade', 'criatividade', 'observacao'];

  if (!avaliacoes || !avaliacoes.length) {
    return <div>Nenhuma avaliação encontrada.</div>;
  }

  const avaliacoesValidas = avaliacoes.filter((avaliacao) => {
    return atributosValidos.every((atributo) => typeof avaliacao[atributo] === 'number' && !isNaN(avaliacao[atributo]));
  });


  const mediaGeral = avaliacoesValidas.length > 0 ? (
    avaliacoesValidas.reduce((total, avaliacao) => {
      const somaAtributos = atributosValidos.reduce((soma, atributo) => soma + avaliacao[atributo], 0);
      console.log('Soma dos atributos:', somaAtributos);
      return total + somaAtributos;
    }, 0) / atributosValidos.length / avaliacoesValidas.length
  ) : 0;

  let mediaAtributos;
  if (avaliacoes.length > 0) {
    const mediaPorAtributo = atributosValidos.reduce((result, atributo) => {
      const atributoAvaliacoes = avaliacoes.map(a => a[atributo]).filter(n => !isNaN(n));
      const media = atributoAvaliacoes.reduce((sum, n) => sum + n, 0) / atributoAvaliacoes.length;
      result[atributo] = media;
      return result;
    }, {});

    mediaAtributos = Object.entries(mediaPorAtributo).map(([atributo, media]) => ({ atributo, media }));
  }

  return (
    <div className="media-avaliacoes">
      <h3>Média Geral: {mediaGeral.toFixed(2)}</h3>
      {mediaAtributos && (
        <table>
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            {mediaAtributos.map(({ atributo, media }) => (
              <tr key={atributo}>
                <td>{atributo}</td>
                <td>{media.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MediaAvaliacoes;