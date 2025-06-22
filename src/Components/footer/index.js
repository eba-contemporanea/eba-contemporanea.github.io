import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <section className="footer_container">
                <div className="faixa">
                    <a href="/" rel='noreferrer' className="logos">
                        <img className='logo_footer' src='/logo_eba_white_min.svg' height="25px" />
                        <img className='logo2_footer' src='/logo_eba_white.svg' height="25px" />
                    </a>
                </div>
                <div className="footer_main">
                    <a href="/" target="_blank">
                        <img id='ufrj' src='/UFRJ.png' width="150px" />
                    </a>
                    <a href="/" target="_blank">
                        <img id='eba' src='/EBA.png' width="150px" />
                    </a>
                    <a href="/" target="_blank">
                        <img id="ppgav" src='/PPGAVE.png' width="150px" />
                    </a>
                    <a href="/" target="_blank">
                        <img id="faperj" src='/FAPERF.png' width="150px" />
                    </a>
                </div>
                <Grid container id="menu_footer">
                    <Grid item xs={4}>
                        <a href='/artistas'>Artistas</a>
                        <a href='/coletivos'>Coletivos</a>
                        <a href='/projeto'>O Projeto</a>
                    </Grid>
                    <Grid item xs={4}>
                        <i>Desenvolvido por:</i>
                        <a href="https://www.behance.net/joaopedros1520" target="_blank">
                            João Pedro Santos
                        </a>
                        ,
                        <a href="https://github.com/evelyncorrea" target="_blank">
                            Evelyn Ferreira
                        </a>
                        e
                        <a href="https://github.com/ThiagoBarcellos" target="_blank">
                            Thiago Barcellos
                        </a>
                    </Grid>
                    <Grid item xs={4}>
                        <a 
                            href="mailto:ebacontemporanea@gmail.com" 
                            className='email' 
                            style={{ justifyContent: 'flex-end', margin: 0 }}
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="2x" /> 
                            ebacontemporanea@gmail.com
                        </a>
                    </Grid>
                </Grid>
                <div className='hr_main'>
                    <p>© 2022 por EBAContemporânea de 1975 à atualidade.</p>
                </div>
            </section>
        )
    }
}