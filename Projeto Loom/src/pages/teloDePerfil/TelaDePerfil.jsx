import { useState } from "react";
import "./TelaDePerfil.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";


const TeladePerfil = () => {
  const [modoSidebar, setModoSidebar] = useState("close");
  // Dados de exemplo para o perfil
  const userData = {
    nome: "Luana Andrade",
    cargo: "Desenvolvedor Full Stack",
    email: "luana.andrade@example.com",
    telefone: "(11) 98765-4321",
    localizacao: "São Paulo, SP",
    dataAdmissao: "01/03/2022",
    departamento: "Tecnologia",
    biografia:
      "Entusiasta de React e Node.js. Focado em criar soluções escaláveis e performáticas. Gosto de café, código limpo e aprender coisas novas todos os dias.",
    tarefasConcluidas: 124,
    projetosAtivos: 5,
    ultimaAtividade: "20/07/2025",
  };

  return (
    <div className={`body_perfil sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={true}
        geral={{ ativo: false, path: "/gerente", nome: "Acessos" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: false, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="container_perfil">
        <div className="profile-card">
          <div className="profile-header">
            <div className="banner"></div>
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Foto de perfil"
              className="profile-img"
            />
            <h2 className="profile-name">{userData.nome}</h2>
            <p className="profile-role">{userData.cargo}</p>
          </div>

          <div className="profile-content">
            {/* Seção de Biografia */}
            <div className="profile-section bio-section">
              <h3>Sobre Mim</h3>
              <p className="biography">{userData.biografia}</p>
            </div>

            {/* Seção de Informações Detalhadas */}
            <div className="profile-section info-details-section">
              <h3>Detalhes Profissionais e Contato</h3>
              <div className="info-grid">
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {userData.telefone}
                </p>
                <p>
                  <strong>Departamento:</strong> {userData.departamento}
                </p>
                <p>
                  <strong>Admissão:</strong> {userData.dataAdmissao}
                </p>
                <p>
                  <strong>Localização:</strong> {userData.localizacao}
                </p>
              </div>
            </div>

            {/* Seção de Estatísticas/Métricas */}
            <div className="profile-section stats-section">
              <h3>Métricas de Trabalho</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <h4>{userData.tarefasConcluidas}</h4>
                  <p>Tarefas Concluídas</p>
                </div>
                <div className="stat-item">
                  <h4>{userData.projetosAtivos}</h4>
                  <p>Projetos Ativos</p>
                </div>
                <div className="stat-item">
                  <h4>{userData.ultimaAtividade}</h4>
                  <p>Última Atividade</p>
                </div>
              </div>
            </div>

            {/* Seção de Botões/Ações */}
            {/* <div className="profile-actions">
              {/* Botão primário para edição */}
              {/* <Botao nomeDoBotao="Editar Perfil" estilo="primary" onClick={() => console.log('Editar')} />  */}
              {/* Novo botão para segurança */}
              {/* <Botao nomeDoBotao="Mudar Senha" estilo="secondary" onClick={() => console.log('Mudar Senha')} />  */}
              {/* Botão de sair padronizado ou com estilo diferente */}
              {/* <Botao nomeDoBotao="Sair da Conta" estilo="danger" onClick={() => console.log('Sair')} />  */}
            {/* </div> */} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeladePerfil;