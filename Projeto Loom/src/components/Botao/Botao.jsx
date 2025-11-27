import "./Botao.css";

const Botao = ({ nomeDoBotao, onClick, tipo = "button" }) => {
  return (
    <button className="botao" type={tipo} onClick={onClick}>
      {nomeDoBotao}
    </button>
  );
};

export default Botao;