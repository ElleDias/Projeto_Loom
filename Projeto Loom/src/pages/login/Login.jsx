import "./Login.css";
import { useState } from "react";
import logo from "../../assets/img/Logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../Context/authContext";
import { userDecodeToken } from "../../utils/userDecodeToken";
import secureLocalStorage from "react-secure-storage";
import api from "../../Services/services";
import Button from "../../components/Botao/Botao";

const Login = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { setUsuario } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const realizarAutenticacao = async (e) => {
    e.preventDefault();
    console.log("Função realizarAutenticacao chamada");
    console.log("Email:", email, "Senha:", senha);

    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor preencha os campos para realizar o login");
      return;
    }

    setLoading(true); 
    try {
      const resposta = await api.post("https://localhost:7283/api/Auth/login", {
        email,
        senha,
      });

      console.log("Resposta da API:", resposta.data);

      const token = resposta.data.token;
if (!token) {
  alert("Email ou senha inválidos!");
  setLoading(false);
  return;
}

const tokenDecodificado = userDecodeToken(token);
console.log("Token decodificado:", tokenDecodificado);

// salva o token PURO para usar no Authorization


// salva o decodificado só no contexto, se quiser
setUsuario(tokenDecodificado);
secureLocalStorage.setItem("tokenLogin", token); // salva o token JWT puro

const role = tokenDecodificado["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

if (role === "Gerente") {
  navigate("/TelaDoGerente");
} else if (role === "Gestor") {
  navigate("/TelaDoGestor");
} else {
  navigate("/");
}

    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Email ou senha inválidos! Para dúvidas entre em contato com o suporte.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <main className="main_login">
      <div className="fundo_loom"></div>
      <section className="section_login">
        <img className="logo_superior" src={logo} alt="Logo da Loom" />
        <form className="form_login" onSubmit={realizarAutenticacao}>
          <h1>Bem Vindo</h1>
          <h2>Por favor, preencha os campos.</h2>

          <div className="campos_login">
            <div className="campo_input">
              <label htmlFor="Email">E-mail</label>
              <input
                type="email"
                id="Email"
                placeholder="Entre com seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="campo_input">
              <label htmlFor="senha">Senha</label>
              <div className="input_senha">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  placeholder="•••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span
                  className="icone_olho"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* <div className="options">
              <label>
                <input type="checkbox" /> Lembre-se de mim
              </label>
              <a className="link_esqueceuasenha" href="/Senha">
                Esqueceu a senha?
              </a>
            </div> */}
          </div>

          {/* ✅ Botão desabilitado enquanto a requisição está em andamento */}
          <Button nomeDoBotao={loading ? "Carregando..." : "Log-in"} type="submit" disabled={loading} />

          {/* <p className="nao_tem_uma_conta">
            Não tem uma conta?{" "}
            <a className="link_registre" href="/Cadastro">
              Registre-se aqui
            </a>
          </p> */}
        </form>
      </section>
    </main>
  );
};

export default Login;