
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CidadeUniversitaria from './Pages/CidadeUniversitaria';
import Header from './Components/Header/Header';
import Footer from './Components/footer';
import Pesquisadores from './Pages/Pesquisadores';
import Publicacoes from './Pages/Publicacoes';
import Artistas from './Pages/Artistas';
import { Artista } from './Pages/Artistas/Artista';
import Projeto from './Pages/Projeto';
import Contato from './Pages/Contato';
import Home from './Pages/Home';
import EBA from './Pages/EBA';
import Coletivo from './Pages/Coletivos/Coletivo';
import { Coletivos } from './Pages/Coletivos';
import { Entrevistas } from './Pages/Entrevistas';
import { ArtistProvider } from './contexts/artists';
import { PesquisadoresProvider } from './contexts/pesquisadores';
import { ColetivosProvider } from './contexts/coletivos';
import { HomepageProvider } from './contexts/homepage';
import { PublicacoesProvider } from './contexts/publicacoes';
import { ProjectProvider } from './contexts/project';
import { UfrjpageProvider } from './contexts/ufrj'; 
import { EbapageProvider } from './contexts/eba';

const Routes = () => {
    return (
        <ArtistProvider>
            <PesquisadoresProvider>
                <ColetivosProvider>
                    <HomepageProvider>
                        <PublicacoesProvider>
                            <ProjectProvider>
                                <UfrjpageProvider>
                                    <EbapageProvider>
                                        <BrowserRouter>
                                            <Header />

                                            <Switch>
                                                <Route exact path="/" component={Home} />
                                                <Route path="/EBA" component={EBA} />
                                                <Route path="/projeto" component={Projeto} />
                                                <Route path="/contato" component={Contato} />
                                                <Route path="/artistas" component={Artistas} />
                                                <Route path="/artista/:id" component={Artista} />
                                                <Route path="/publicacoes" component={Publicacoes} />
                                                <Route path="/pesquisadores" component={Pesquisadores} />
                                                <Route path="/cidade_universitaria" component={CidadeUniversitaria} />
                                                <Route path="/coletivo/:id" component={Coletivo} />
                                                <Route path="/coletivos" component={Coletivos} />
                                                <Route path="/entrevistas" component={Entrevistas} />
                                            </Switch>

                                            <Footer />
                                        </BrowserRouter>
                                    </EbapageProvider>
                                </UfrjpageProvider>
                            </ProjectProvider>
                        </PublicacoesProvider>
                    </HomepageProvider>
                </ColetivosProvider>
            </PesquisadoresProvider>
        </ArtistProvider>
    )
}

export default Routes;