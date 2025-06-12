import { useEffect } from 'react';
import Slider from '../../Components/Slider';
import useProject from '../../contexts/project';
import './Projeto.css';
import '../../Components/Header/Header_style.css';

export default function Projeto(){
    const { 
        getProjectInformation,
        fullText,
        boldText,
        galleryImages
    } = useProject();

    useEffect(() => {
        getProjectInformation();
    }, []);

    return (
        <>
            <main>
                <h1>O Projeto</h1>
                <Slider imgs={galleryImages} />
                <p className="p_normal" dangerouslySetInnerHTML={{ __html: fullText }}></p>
                <br /><br /> 
                <p className='p_normal p_bold'>
                    {boldText}
                </p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'right', marginTop: '1rem' }}>
                    <a href={'https://www.youtube.com/@EBACONTEMPORANEA'} target="_blank" className='social_media_icon'>
                        <img src='/btnYoutube.svg' width="100%" />
                    </a>
                </div>
            </main>
        </>
    ) 
};