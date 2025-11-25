import { useState, useEffect } from "react";
import "./TelaDePerfil.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import secureLocalStorage from "react-secure-storage";
import api from "../../Services/services";
import Button from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/PerfilModal/perfilModal";

const TelaDePerfil = () => {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    const token = secureLocalStorage.getItem("token");

    if (!userId || !token) {
      console.log("Nenhum usuário logado.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get(
          `https://localhost:7283/api/Usuario/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSair = () => {
    navigate("/perfil");
  };

 const handleEditar = () => {
    console.log("Clicou em editar!"); // ESTE LOG DEVE APARECER
    setOpenModal(true); // ESTE É O COMANDO CHAVE
    console.log("Estado openModal definido para: true"); // NOVO LOG PARA CONFERÊNCIA
};

  console.log("MODAL aberto?", openModal); // <-- AGORA ESTÁ NO LUGAR CERTO

  const salvarAlteracoes = async (form) => {
    try {
      const token = secureLocalStorage.getItem("token");

      await api.put(
        `https://localhost:7283/api/Usuario/${userData.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUserData({ ...userData, ...form });
    } catch (err) {
      console.log("Erro ao salvar dados:", err);
    }
  };

  return (
    <>
      <MenuLateral
        perfil={true}
        geral={{ ativo: false, path: "/gerente", nome: "Acessos" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
         mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className={`body_perfil sidebar-${modoSidebar}`}>
        <div className="container_perfil">
          <div className="profile-card">

            <div className="banner"></div>

            <div className="profile-header">
              <h2 className="profile-name">{loading ? "Carregando..." : userData?.nome}</h2>
              <p className="profile-role">{userData?.cargo || "Usuário"}</p>
            </div>

            <div className="profile-content">

              {!loading && userData && (
                <>
                  <div className="profile-section">
                    <h3>Informações Pessoais</h3>
                    <div className="info-grid">
                      <p><strong>Email:</strong> {userData.email}</p>
                      <p><strong>Telefone:</strong> {userData.telefone || "Não informado"}</p>
                      <p><strong>CPF:</strong> {userData.cpf || "Não informado"}</p>
                      <p><strong>Endereço:</strong> {userData.endereco || "Não informado"}</p>
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3>Estatísticas</h3>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <h4>12</h4>
                        <p>Chamados Resolvidos</p>
                      </div>
                      <div className="stat-item">
                        <h4>3</h4>
                        <p>Projetos Ativos</p>
                      </div>
                      <div className="stat-item">
                        <h4>98%</h4>
                        <p>Satisfação</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {loading && <p>Carregando dados...</p>}

              <div className="profile-actions">
                <Button nomeDoBotao="Editar" estilo="primary" onClick={handleEditar} />
                <Button nomeDoBotao="Sair" estilo="danger" onClick={handleSair} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        userData={userData || { telefone: "", cpf: "", endereco: "" }}
        onSave={salvarAlteracoes}
      />
    </>
  );
};

export default TelaDePerfil;
