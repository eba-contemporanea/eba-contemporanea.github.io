
import './Header_style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import useHomepage from '../../contexts/homepage';
import { useEffect, useState } from 'react';

function Header() {
    const { headerLinks } = useHomepage();
    const [youtube, setYoutube] = useState({ hasLink: false });
    const [instagram, setInstagram] = useState({ hasLink: false });
    
    useEffect(() => {
        headerLinks.map(item => {
            if(item.name == 'youtube') {
                setYoutube({ ...item, hasLink: true });
            } else if(item.name == 'instagram') {
                setInstagram({ ...item, hasLink: true });
            };
        })
    }, [headerLinks]);

    return (
        <header className="container_">
            <div className='inner_container'>
                <Link to="/">
                    <div className='logos'>
                        <img id='logo' src='/logo_min.svg' height="25px" />
                        <img id='logo2' src='/logo_completo.svg' height="25px" />
                    </div>
                </Link>

                <ul id="menu_header">
                    <li><Link to="/artistas">Artistas</Link></li>
                    <li><Link to="/coletivos">Coletivos</Link></li>
                    <li><Link to="/cidade_universitaria">A UFRJ e a Cidade Universitária</Link></li>
                    <li><Link to="/EBA">A Escola de Belas Artes</Link></li>
                    <li><Link to="/projeto">Projeto</Link>
                        <ul>
                            <li><Link to="/pesquisadores">Pesquisadores(as)</Link></li>
                            <li><Link to="/publicacoes">Publicações e apresentações</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>

                <div className="social_media">
                   {youtube.hasLink && (<a href={youtube.link} target="_blank" className='social_media_icon'>
                        <img src='/btnYoutube.svg' width="100%" />
                    </a>)}
                    <a href="mailto:ebacontemporanea@gmail.com" target="_blank" className='social_media_icon'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                    {instagram.hasLink && (<a href={instagram.link} target="_blank" className='social_media_icon'>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>)}

                </div>
            </div>
        </header>
    );
}

export default Header;