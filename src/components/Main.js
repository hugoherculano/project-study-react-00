import React, { Component } from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa'

import Form from './Form';

import './Main.css';

export default class Main extends Component {

    state = {
        novaTarefa: '',
        lista: [],
        indice: -1
    }

    componentDidMount() {

        const tasks = localStorage.getItem('tasks')

        if(!tasks) return;

        this.setState({
            lista: JSON.parse(tasks)
        });

    }

    componentDidUpdate(prevProps, prevState) {

        const { lista } = this.state;

        if(prevState.lista === lista) return;

        localStorage.setItem('tasks', JSON.stringify(lista))

    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { lista, indice } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(lista.indexOf(novaTarefa) !== -1 || novaTarefa === '') return;

        const tarefas = [...lista];
        
        if(indice === -1) {
            this.setState({
                lista: [novaTarefa, ...tarefas],
                novaTarefa: ''
            });
        } else {
            lista[indice] = novaTarefa;
            this.setState({
                lista: [...lista],
                indice: -1
            });
        }

    }

    handleEdit = (e, ind) => {
        const { lista } = this.state;

        this.setState({
            indice: ind,
            novaTarefa: lista[ind]
        })
        
    }

    handleDelete = (e, ind) => {
        const { lista } = this.state;
        const tarefas = [...lista];

        tarefas.splice(ind, 1);

        this.setState({
            lista: [...tarefas]
        })
        
    }


    render() {

        const { novaTarefa, lista } = this.state;

        return (
            <>
                <div className='main'>
                    <h1>Nova tarefa</h1>

                    <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                    />

                </div>
                <section className='tasks'>
                    <ul>
                        {lista.map((task, ind) => (
                            <li key={ind}>
                                {task}
                                <span>
                                    <FaEdit onClick={(e) => this.handleEdit(e, ind)} />
                                    <FaWindowClose onClick={(e) => this.handleDelete(e, ind)} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </>
        );
    }
}