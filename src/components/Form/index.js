import React from 'react';
import { FaPlus } from 'react-icons/fa';

import './Form.css';

export default function Form({ handleSubmit, handleChange, novaTarefa }) {

    return (
        <form onSubmit={handleSubmit} action='#'>
            <input
                type="text"
                onChange={handleChange}
                value={novaTarefa}
                placeholder='Digite a nova tarefa...'
            />

            <button>
                <FaPlus />
            </button>
        </form>
    );
}