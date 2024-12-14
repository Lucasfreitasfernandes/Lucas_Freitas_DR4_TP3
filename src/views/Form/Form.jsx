import React, { useState } from 'react';
import DateTimePickerComponent from "../../components/DateTimePicker/DateTimePicker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "./Styles.css";

function Formulario({ adicionarTarefa }) {
  const [formularioAtivo, setFormularioAtivo] = useState(null);
  const [dados, setDados] = useState({
    sono: { dataHoraInicial: new Date(), dataHoraFinal: new Date(), observacao: '' },
    amamentacao: { tipo: '', lado: '', dataHoraInicial: new Date(), observacao: '' },
    fralda: { dataHoraInicial: new Date(), tipo: '', observacao: '' },
  });


  const [botoesAtivos, setBotoesAtivos] = useState({
    amamentacao: { 
      tipo: null, 
      lado: null 
    },
    fralda: { 
      tipo: null 
    }
  });

  const handleDateChange = (date, form, field) => {
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [field]: date,
      },
    }));
  };

  const handleChange = (e, form) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [name]: value,
      },
    }));
  };


  const handleButtonSelect = (form, category, value) => {
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [category]: value,
      },
    }));


    setBotoesAtivos((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [category]: value,
      },
    }));
  };

  const handleSubmit = (e, form) => {
    e.preventDefault();
    const novaTarefa = {
      id: Date.now(),
      tipo: form,
      dados: dados[form],
    };
    adicionarTarefa(novaTarefa);
    setFormularioAtivo(null);
  };

  const renderFormulario = () => {
    switch (formularioAtivo) {

      case 'sono':
  return (
    <form onSubmit={(e) => handleSubmit(e, 'sono')}>
      <div>
        <label htmlFor="dataHoraInicial">Data e Hora Inicial</label>
        <DateTimePickerComponent
          onChange={(date) => handleDateChange(date, 'sono', 'dataHoraInicial')}
          value={dados.sono.dataHoraInicial}
          locale="pt-BR"
          format="dd/MM/yyyy HH:mm"
        />
      </div>
      <div>
        <label htmlFor="dataHoraFinal">Data e Hora Final</label>
        <DateTimePickerComponent
          onChange={(date) => handleDateChange(date, 'sono', 'dataHoraFinal')}
          value={dados.sono.dataHoraFinal}
          locale="pt-BR"
          format="dd/MM/yyyy HH:mm"
        />
      </div>
      <div>
        <label htmlFor="observacao">Observação</label>
        <textarea
          id="observacao"
          name="observacao"
          value={dados.sono.observacao}
          onChange={(e) => handleChange(e, 'sono')}
        />
      </div>
      <button type="submit">Enviar</button>
      <button type="button" onClick={() => setFormularioAtivo(null)}>
        Fechar
      </button>
    </form>
  );


      case 'amamentacao':
        return (
          <form onSubmit={(e) => handleSubmit(e, 'amamentacao')}>
            <div>
              <label htmlFor="tipo">Tipo de Amamentação</label>
              <button
                type="button"
                name="tipo"
                value="mamadeira"
                onClick={() => handleButtonSelect('amamentacao', 'tipo', 'mamadeira')}
                className={botoesAtivos.amamentacao.tipo === 'mamadeira' ? 'botao-selecionado' : ''}
              >
                Mamadeira
              </button>
              <button
                type="button"
                name="tipo"
                value="seios"
                onClick={() => handleButtonSelect('amamentacao', 'tipo', 'seios')}
                className={botoesAtivos.amamentacao.tipo === 'seios' ? 'botao-selecionado' : ''}
              >
                Seios
              </button>
            </div>
            <div>
              <label htmlFor="dataHoraInicial">Data e Hora Inicial</label>
              <DateTimePickerComponent
                onChange={(date) => handleDateChange(date, 'amamentacao', 'dataHoraInicial')}
                value={dados.amamentacao.dataHoraInicial}
                locale="pt-BR"
                format="dd/MM/yyyy HH:mm"
              />
            </div>
            <div>
              <label htmlFor="lado">Lado</label>
              <button
                type="button"
                name="lado"
                value="esquerdo"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'esquerdo')}
                className={botoesAtivos.amamentacao.lado === 'esquerdo' ? 'botao-selecionado' : ''}
              >
                Esquerdo
              </button>
              <button
                type="button"
                name="lado"
                value="direito"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'direito')}
                className={botoesAtivos.amamentacao.lado === 'direito' ? 'botao-selecionado' : ''}
              >
                Direito
              </button>
              <button
                type="button"
                name="lado"
                value="ambos"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'ambos')}
                className={botoesAtivos.amamentacao.lado === 'ambos' ? 'botao-selecionado' : ''}
              >
                Ambos
              </button>
            </div>

            <div>
              <label htmlFor="observacao">Observação</label>
              <textarea
                id="observacao"
                name="observacao"
                value={dados.amamentacao.observacao}
                onChange={(e) => handleChange(e, 'amamentacao')}
              />
            </div>
            <button type="submit">Enviar</button>
            <button type="button" onClick={() => setFormularioAtivo(null)}>
                Fechar
            </button>
          </form>
        );
      case 'fralda':
        return (
          <form onSubmit={(e) => handleSubmit(e, 'fralda')}>
            <div>
              <label htmlFor="dataHoraInicial">Data e Hora Inicial</label>
              <DateTimePickerComponent
                onChange={(date) => handleDateChange(date, 'fralda', 'dataHoraInicial')}
                value={dados.fralda.dataHoraInicial}
                locale="pt-BR"
                format="dd/MM/yyyy HH:mm"
              />
            </div>
            <div>
              <label htmlFor="tipo">Tipo de Fralda</label>
              <button
                type="button"
                name="tipo"
                value="molhada"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'molhada')}
                className={botoesAtivos.fralda.tipo === 'molhada' ? 'botao-selecionado' : ''}
              >
                Molhada
              </button>
              <button
                type="button"
                name="tipo"
                value="suja"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'suja')}
                className={botoesAtivos.fralda.tipo === 'suja' ? 'botao-selecionado' : ''}
              >
                Suja
              </button>
              <button
                type="button"
                name="tipo"
                value="os dois"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'os dois')}
                className={botoesAtivos.fralda.tipo === 'os dois' ? 'botao-selecionado' : ''}
              >
                Os Dois
              </button>
              <button
                type="button"
                name="tipo"
                value="limpa"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'limpa')}
                className={botoesAtivos.fralda.tipo === 'limpa' ? 'botao-selecionado' : ''}
              >
                Limpa
              </button>
            </div>

            <div>
              <label htmlFor="observacao">Observação</label>
              <textarea
                id="observacao"
                name="observacao"
                value={dados.fralda.observacao}
                onChange={(e) => handleChange(e, 'fralda')}
              />
            </div>
            <button type="submit">Enviar</button>
            <button type="button" onClick={() => setFormularioAtivo(null)}>
                Fechar
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => setFormularioAtivo('sono')}>Formulário Sono</button>
      <button onClick={() => setFormularioAtivo('amamentacao')}>Formulário Amamentação</button>
      <button onClick={() => setFormularioAtivo('fralda')}>Formulário Fralda</button>
      {renderFormulario()}
    </div>
  );
}

export default Formulario;