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
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const realizarAutenticacao = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor preencha os campos para realizar o login");
      return;
    }

    setLoading(true);
    try {
      // 🔥 LOGIN
      const resposta = await api.post("https://localhost:7283/api/Auth/login", {
        email,
        senha,
      });

      const token = resposta.data.token;
      if (!token) {
        alert("Email ou senha inválidos!");
        return;
      }

      const tokenDecodificado = userDecodeToken(token);

      // 🔥 Salvar token no contexto
      login(token, tokenDecodificado);

      // 🔥 PEGAR USER ID DO TOKEN
      const userId =
        tokenDecodificado.id ||
        tokenDecodificado.Id ||
        tokenDecodificado.nameid ||
        tokenDecodificado.sub;

      secureLocalStorage.setItem("userId", userId);

      // 🔥 BUSCAR FUNCIONÁRIO PELO USERID
      const funcionarioResponse = await api.get(
        `https://localhost:7283/api/Funcionario/usuario/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const funcionarioId = funcionarioResponse.data?.id;

      if (funcionarioId) {
        secureLocalStorage.setItem("funcionarioId", funcionarioId);
        console.log("FuncionarioId salvo:", funcionarioId);



        // 🔥 PEGAR ROLE
        const role =
          tokenDecodificado[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        if (role === "Gerente") navigate("/TelaDoGerente");
        else if (role === "Gestor") navigate("/TelaDoGestor");
        else if (role === "Funcionario") navigate("/Funcionario");
        else navigate("/");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Email ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AQUI COMEÇA O JSX — fora do try/catch
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
          </div>

          <Button
            nomeDoBotao={loading ? "Carregando..." : "Log-in"}
            tipo="submit"
            disabled={loading}
          />

          <p className="nao_tem_uma_conta">
            Não tem uma conta?{" "}
            <a className="link_registre" href="/Cadastro">
              Registre-se aqui
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
