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

  // -------------------------------
  // CARREGAR DADOS DO USUÁRIO
  // -------------------------------
 useEffect(() => {
  const userId = secureLocalStorage.getItem("userId");
  const token = secureLocalStorage.getItem("token");

  if (!userId || !token) {
    setLoading(false);
    return;
  }

  const fetchUser = async () => {
    try {
      const response = await api.get(
        `https://localhost:7283/api/Usuario/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const apiUser = response.data;

      // carregar os dados extras que não existem no banco
      const savedExtra = secureLocalStorage.getItem("perfilExtra_" + userId) || {
        telefone: "",
        cpf: "",
        endereco: ""
      };

      // juntar API + dados extras
      setUserData({ ...apiUser, ...savedExtra });

    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
 
  // -------------------------------
  // BOTÃO EDITAR → ABRIR MODAL
  // -------------------------------
  const handleEditar = () => {
    console.log("Clicou em editar!");
    setOpenModal(true);
    console.log("Estado openModal definido para: true");
  };

  // LOG DO ESTADO ATUAL DO MODAL
  console.log("MODAL aberto?", openModal);

  // -------------------------------
  // SALVAR ALTERAÇÕES DO MODAL
  // -------------------------------
const salvarAlteracoes = (form) => {
  // salva localmente os campos extras
  secureLocalStorage.setItem("perfilExtra_" + userData.id, form);

  // atualiza visualmente os dados do usuário
  setUserData({ ...userData, ...form });

  console.log("Dados salvos localmente:", form);
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

            {/* Banner */}
            <div className="banner"></div>

            {/* Cabeçalho do Perfil */}
            <div className="profile-header">
              <h2 className="profile-name">{loading ? "Carregando..." : userData?.nome}</h2>
              <p className="profile-role">{userData?.cargo || "Usuário"}</p>
            </div>

            {/* Conteúdo */}
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
                </>
              )}

              {loading && <p>Carregando dados...</p>}

              {/* Botões */}
              <div className="profile-actions">
                <Button
                  nomeDoBotao="Editar"
                  onClick={handleEditar}
                />
            
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------- */}
      {/* MODAL DE EDIÇÃO — FUNCIONANDO */}
      {/* ------------------------------- */}
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
