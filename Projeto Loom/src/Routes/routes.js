import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas principais
import Login from "../pages/login/Login";
import Gerente from "../pages/telagerente/TelaGerente";
import TelaGestor from "../pages/telagestor/TelaGestor";
import Acessos from "../pages/acessos/Acessos";
import GraficosDetalhados from "../pages/grafico/Grafico";
import Dominios from "../pages/dominios/Dominios";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import TarefasPendentes from "../pages/tarefasPendentes/TarefasPendentes";
import CadastroDeTarefas from "../pages/cadastroDeTarefas/CadastroDeTarefas";
import Mensagem from "../pages/mensagem/Mensagem"
import Comparacao from "../pages/comparacao/ComparacaoFunc"
import MensagemGestor from "../pages/mensagemGestor/MensagemGestor"
import TeladePerfil from "../pages/teloDePerfil/TelaDePerfil";
import RedefinirSenha from "../pages/redefinirsenha/Redefinirsenha"
import  Chat from "../pages/chat/Chat";


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* http://localhost:3000/ => Redefinir Senha */}
                <Route path="/RedefinirSenha" element={<RedefinirSenha />} exact />
                {/* http://localhost:3000/ => Login */}
                <Route path="/" element={<Login />} exact />
                {/* http://localhost:3000/ => Gerente */}
                <Route path="/TelaDoGerente" element={<Gerente />} exact />
                {/* http://localhost:3000/ => Gerente */}
                <Route path="/TelaDoGestor" element={<TelaGestor />} />
                {/* http://localhost:3000/ => Acessos */}
                <Route path="/Acesso" element={<Acessos />} />
                {/* http://localhost:3000/ => GraficosDetalhados */}
                <Route path="/Graficos" element={<GraficosDetalhados />} />
                {/* http://localhost:3000/ => Dominios */}
                <Route path="/Dominio" element={<Dominios />} />
                {/* http://localhost:3000/ => CadastroUsuario */}
                <Route path="/Cadastro" element={<CadastroUsuario />} exact />
                {/* http://localhost:3000/ => TarefasPendentes */}
                <Route path="/Tarefas" element={<TarefasPendentes />} exact />
                {/* http://localhost:3000/ => CadastroDeTarefas */}
                <Route path="/CadastroDeTarefas" element={<CadastroDeTarefas />} exact />
                {/* http://localhost:3000/ => Mensagens */}
                <Route path="/Mensagem" element={<Mensagem />} />
                {/* http://localhost:3000/ => MensagensGestor */}
                <Route path="/MensagemGestor" element={<MensagemGestor />} />
                {/* http://localhost:3000/ => Comparacao */}
                <Route path="/Comparacao" element={<Comparacao />} />
                {/* http://localhost:3000/ => Perfil */}
                <Route path="/Perfil" element={<TeladePerfil />} />
                {/* http://localhost:3000/ => Redefinir Senha */}
                <Route path="/Senha" element={<RedefinirSenha />} />
                <Route path="/Chat/:id" element={<Chat />} /> 

                </Routes>
            </BrowserRouter>
            
    );
}
export default Rotas;