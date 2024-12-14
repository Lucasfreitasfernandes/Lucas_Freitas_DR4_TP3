import { useState } from "react";
import Formulario  from "../Form/Form";
import IconButtonComponent from "../../components/IconButton/IconButtonComponent";


const Home = () => {

  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas((prev) => [...prev, novaTarefa]);
  };

  const removerTarefa = (idTarefa) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== idTarefa));
  };

  const cores = {
    sono: '#FFD700',
    amamentacao: '#00CED1',
    fralda: '#FF6347'
  };

  return (
      <div className="container-home">
      <h1 className="h1-home">Meu bebe</h1>
      <Formulario adicionarTarefa={adicionarTarefa} />
      <div className="tarefas-container">
  {tarefas.map((tarefa) => (
    <div
      key={tarefa.id}
      className="tarefa-item"
      style={{ backgroundColor: cores[tarefa.tipo], padding: '10px', margin: '10px 0', borderRadius: '8px' }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>{tarefa.tipo}</h3>
      {tarefa.dados.dataHoraInicial && (
        <p><strong>Início:</strong> {new Date(tarefa.dados.dataHoraInicial).toLocaleString()}</p>
      )}
      {tarefa.dados.dataHoraFinal && (
        <p><strong>Fim:</strong> {new Date(tarefa.dados.dataHoraFinal).toLocaleString()}</p>
      )}
      {tarefa.dados.tipo && <p><strong>Tipo:</strong> {tarefa.dados.tipo}</p>}
      {tarefa.dados.lado && <p><strong>Lado:</strong> {tarefa.dados.lado}</p>}
      {tarefa.dados.observacao && <p><strong>Observação:</strong> {tarefa.dados.observacao}</p>}
      <button
              onClick={() => removerTarefa(tarefa.id)}
              style={{
                backgroundColor: '#FF6347',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Excluir
            </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Home;