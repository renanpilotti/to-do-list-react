import './App.css';
import { useState, useEffect } from 'react';
import AlertaMensagem from './components/AlertaMensagem';
import Lista from './components/Lista';
import { FaPlus, FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {

  const [alerta, setAlerta] = useState('');
  const [lista, setLista] = useState(getLocalStorage());
  const [nomeItem, setNomeItem] = useState('');
  const [tarefasFeitas, setTarefasFeitas] = useState(0);
  const [editando, setEditando] = useState(false);
  const [idEditado, setIdEditado] = useState('');

  const mostrarMensagem = (show, status, mensagem) => {
    setAlerta({ show, status, mensagem });
    setTimeout(() => {
      setAlerta('');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeItem) {
      mostrarMensagem(true, 'erro', 'por favor, insira um valor.');
    } else if (editando && nomeItem) {
      setLista(lista.map((item) => {
        if (item.id === idEditado) {
          return { ...item, atividade: nomeItem }
        }
        return item;
      }))
      setNomeItem('');
      setEditando(false);
      setIdEditado('');
      mostrarMensagem(true, 'sucesso', 'item editado com sucesso!');
    } else {
      let idItem = new Date().getTime().toString();
      let novoObjeto = { id: idItem, atividade: nomeItem, statusChecked: false };
      setLista([...lista, novoObjeto]);
      setNomeItem('');
      mostrarMensagem(true, 'sucesso', 'YASSS!');
    };
  };

  const removeItem = (id) => {
    lista.forEach((item) => {
      if (item.statusChecked && item.id === id) {
        setTarefasFeitas(tarefasFeitas - 1);
      };
    });
    setLista(lista.filter((item) => {
      return item.id !== id;
    }));
    mostrarMensagem(true, 'erro', 'item removido');
  };

  const editaItem = (id) => {
    lista.map((item) => {
      if (item.id === id) {
        setNomeItem(item.atividade);
        setEditando(true);
        setIdEditado(id);
      };
      return item;
    });
  };

  const atualizaTarefas = (id) => {
    lista.forEach((item) => {
      if (item.statusChecked && item.id === id) {
        setTarefasFeitas(tarefasFeitas - 1);
        item.statusChecked = false;
      } else if (item.id === id) {
        setTarefasFeitas(tarefasFeitas + 1)
        item.statusChecked = true;
      };
    });
  };

  const limparLista = () => {
    setLista([]);
    setTarefasFeitas(0);
    mostrarMensagem(true, 'erro', 'itens excluidos');
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(lista));
  }, [lista]);

  return (
    <div className="container">
      <h1 className='title'>to-do list</h1>
      <AlertaMensagem {...alerta} />
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='ex. ir ao mercado'
          onChange={(e) => setNomeItem(e.target.value)}
          value={nomeItem} />
        <button className='add-btn' type='submit'>
          {editando ? (<FaPencilAlt />) : (<FaPlus />)}
        </button>
      </form>
      <Lista
        lista={lista}
        removeItem={removeItem}
        atualizaTarefas={atualizaTarefas}
        editaItem={editaItem}
      />

      {lista.length > 0 &&
        <div className="footer">
          {lista.length - tarefasFeitas === 1 ?
            (<span><span className='numero-pendencia'>1</span> item pendente.</span>) :
            (<span><span className='numero-pendencia'>{lista.length - tarefasFeitas}</span> itens pendentes.</span>)}

          <button className="clear-btn" onClick={limparLista}>
            <FaRegTrashAlt />
          </button>
        </div>}
    </div>
  );
};

export default App;