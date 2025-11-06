import { useState } from "react";
import Logo from "../../assets/img/Logo.svg";
import "./CadastroUsuario.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // icone de exibir senha
import Botao from "../../components/Botao/Botao";
// import { MenuLateral } from "../../components/Sidebar/Sidebar";

const CadastroUsuario = () => {

    // const [email,setEmail] = useState("");
    // const [senha,setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false);
    // const [criarUsuario, setCriarUsuario] = useState("");




    








    return (

        <main className="main_cadastro">

            <div className="fundo_loom"></div>

            <section className="section_cadastro">
                <img className="logo_superior" src={Logo} alt="Logo da Loom" />

                <form className="form_cadastro">
                    <h1>Cadastre-se</h1>
                    <h2>Por favor, preencha os campos.</h2>

                    <div className="campo_input">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" placeholder="Digite seu nome" />
                    </div>

                    <div className="campo_input">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" placeholder="Entre com seu e-mail" />
                    </div>

                    <div className="campo_input senha_container">
                        <label htmlFor="senha">Criar Senha</label>
                        <div className="input_senha">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                placeholder="•••••••••"
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
                            />
                            <span
                                className="icone_senha"
                                onClick={() => setMostrarConfSenha(!mostrarConfSenha)}
                            >
                                {mostrarConfSenha ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <Botao nomeDoBotao="Cadastrar" />


                    <div className="login_link">
                        <a className="login_link" href="/">Já possuo cadastro</a>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CadastroUsuario;
