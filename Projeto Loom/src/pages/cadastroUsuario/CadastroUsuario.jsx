import { useState } from "react";
import Logo from "../../assets/img/Logo.svg";
import "./CadastroUsuario.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Botao from "../../components/Botao/Botao";
import api from "../../Services/services"; // ✅ importa API
import { useNavigate } from "react-router-dom";

const CadastroUsuario = () => {

    // ✅ Estados necessários
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cargo, setCargo] = useState(""); // ✅ adicionado
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false);

    const navigate = useNavigate();

    // ✅ Função para chamar o Swagger
    const realizarCadastro = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !confirmarSenha || !cargo) {
            alert("Preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const resposta = await api.post(
                "https://localhost:7283/api/Auth/register",
                {
                    nome,
                    email,
                    senha,
                    cargo
                }
            );

            console.log("Usuário cadastrado:", resposta.data);
            alert("Cadastro realizado com sucesso!");

            navigate("/");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao realizar cadastro. Verifique os dados.");
        }
    };

    return (
        <main className="main_cadastro">

            <div className="fundo_loom"></div>

            <section className="section_cadastro">
                <img className="logo_superior" src={Logo} alt="Logo da Loom" />

                {/* ✅ FORM COM A FUNÇÃO DE CADASTRO */}
                <form className="form_cadastro" onSubmit={realizarCadastro}>
                    <h1>Cadastre-se</h1>
                    <h2>Por favor, preencha os campos.</h2>

                    <div className="campo_input">
                        <label htmlFor="nome">Nome</label>
                        <input 
                            type="text"
                            name="nome"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="campo_input">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Entre com seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* ✅ CAMPO CARGO ADICIONADO */}
                    <div className="campo_input">
                        <label htmlFor="cargo">Cargo</label>
                        <input
                            type="text"
                            name="cargo"
                            placeholder="Digite seu cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                        />
                    </div>

                    <div className="campo_input senha_container">
                        <label htmlFor="senha">Criar Senha</label>
                        <div className="input_senha">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                placeholder="•••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <span
                                className="icone_senha"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="campo_input senha_container">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <div className="input_senha">
                            <input
                                type={mostrarConfSenha ? "text" : "password"}
                                name="confirmarSenha"
                                placeholder="•••••••••"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                            <span
                                className="icone_senha"
                                onClick={() => setMostrarConfSenha(!mostrarConfSenha)}
                            >
                                {mostrarConfSenha ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* ✅ BOTÃO FUNCIONANDO */}
                    <Botao nomeDoBotao="Cadastrar" type="submit" />

                    <div className="login_link">
                        <a className="login_link" href="/">Já possuo cadastro</a>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CadastroUsuario;
