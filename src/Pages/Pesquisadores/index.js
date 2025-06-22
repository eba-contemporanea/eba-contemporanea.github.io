import Pesquisadores from '../../Components/pesquisadores';
import usePesquisadores from '../../contexts/pesquisadores';
import { CircularProgress } from '@material-ui/core';
import './style.css';
import { useEffect } from 'react';

export default function pesquisadores() {
    const {
        coordenador,
        bolsistasAnteriores,
        bolsistasAtuais,
        voluntarios,
        participacoes,
        isLoading,
        getResearchers
    } = usePesquisadores();

    useEffect(() => {
        getResearchers();
    }, [])

    return (
        isLoading
            ? <CircularProgress />
            : (
                <section className="container">
                    {coordenador.length > 0 && (
                        <div className="role-section">
                            <h2 className='title-section'>Coordenador</h2>
                            {coordenador.map(i => <Pesquisadores pesquisador={i} key={i._id}/>)}
                        </div>
                    )}
                    {bolsistasAtuais.length > 0 && (
                        <div className="role-section">
                            <h2 className='title-section'>Bolsistas Atuais</h2>
                            {bolsistasAtuais.map(i => <Pesquisadores pesquisador={i} key={i._id}/>)}
                        </div>
                    )}
                    {bolsistasAnteriores.length > 0 && (
                        <div className="role-section">
                            <h2 className='title-section'>Bolsistas</h2>
                            {bolsistasAnteriores.map(i => <Pesquisadores pesquisador={i} key={i._id}/>)}
                        </div>
                    )}
                    {voluntarios.length > 0 && (
                        <div className="role-section">
                            <h2 className='title-section'>Voluntários</h2>
                            {voluntarios.map(i => <Pesquisadores pesquisador={i} key={i._id}/>)}
                        </div>
                    )}

                    {participacoes.length > 0 && (
                    <>
                        <h2 className='title-section'>Participações</h2>
                        <div className="names-container">
                            {participacoes.map((i, index) => {
                                const lastPosition = participacoes.length - 1;
                                const punctuation = index == lastPosition ? '.' : ', ';

                                return <span key={index}>{i.nome}{punctuation}</span>;
                            })}
                        </div>
                    </>
                    )}
                </section>
            )
    )
};