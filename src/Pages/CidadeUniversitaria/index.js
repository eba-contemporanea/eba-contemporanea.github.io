import React, { useEffect } from 'react';
import Slider from '../../Components/Slider';
import useUfrjpage from '../../contexts/ufrj';
import './ufrj.css';

function formatarTexto(texto = '', trechosNegrito = [], trechosSublinhado = []) {
  if (!texto) return null;

  const todosTrechos = [...new Set([...trechosNegrito, ...trechosSublinhado])];

  if (todosTrechos.length === 0) return texto;

  const regex = new RegExp(
    `(${todosTrechos.map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g'
  );

  const partes = texto.split(regex);

  return partes.map((parte, i) => {
    const isNegrito = trechosNegrito.includes(parte);
    const isSublinhado = trechosSublinhado.includes(parte);

    let estilo = {};
    if (isNegrito) estilo.fontWeight = 'bold';
    if (isSublinhado) estilo.textDecoration = 'underline';

    return <span key={i} style={estilo}>{parte}</span>;
  });
}

export default function Home() {
  const {
    getUfrjInfo,
    galleryImages,
    references,
    timeline,
    boldTexts,
    underlinedTexts,
  } = useUfrjpage();

  useEffect(() => {
    getUfrjInfo();
  }, []);

  if (!timeline || !galleryImages || !boldTexts || !underlinedTexts) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={'ufrj_main'}>
      <h1>A UFRJ e a Cidade Universitária</h1>

      <Slider imgs={galleryImages} />

      <section>
        <h2 style={{ marginBottom: '1rem'}}>Linha do Tempo</h2>
        {timeline.map(evento => (
          <div key={evento._id} style={{ marginBottom: '1rem' }}>
            <p><strong style={{color: 'red'}}>{evento.date}</strong> - {formatarTexto(evento.text || '', boldTexts, underlinedTexts)}</p>
          </div>
        ))}
      </section>

      {references?.length > 0 && (
        <section style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '1rem'}}>Referências</h2>
          {references.map((ref, index) => (
            <div key={ref._id} style={{ marginBottom: '1rem' }}>
              <p key={index}>{formatarTexto(ref || '', boldTexts, underlinedTexts)}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
