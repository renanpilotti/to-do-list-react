import React from 'react';
import { FaEdit, FaTimesCircle, } from 'react-icons/fa';

const Lista = ({ lista, removeItem, atualizaTarefas, editaItem }) => {

    return (
        <div>
            {lista.map((item) => {
                const { id, atividade } = item;
                return (
                <div className='item-lista' key={id}>
                    <div className='item-checkbox'>
                        <input type="checkbox" 
                        onChange={() => atualizaTarefas(id)} />
                        <label>{atividade}</label>
                    </div>
                    <div className='buttons'>
                        <button onClick={() => editaItem(id)} className='btn'>
                            <FaEdit />
                        </button>
                        <button onClick={() => removeItem(id)} className='btn'>
                            <FaTimesCircle />
                        </button>
                    </div>
                </div>)
            })}
        </div>
    );
};

export default Lista;