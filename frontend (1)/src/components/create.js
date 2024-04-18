import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Create({ getData, setIsCreate }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const postData = () => {
        axios.post(`http://127.0.0.1:5000/criar_aluno`, {
            nome,
            email
        }).then(() => {
            setIsCreate(false); // Fecha o formulário de criação
            getData(); // Atualiza os dados da tabela
        })
    }
    return (
        <div>
            <h2>Cadastrar Aluno</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Nome</label>
                    <input placeholder='Nome' onChange={(e) => setNome(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>E-mail</label>
                    <input placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Cadastrar</Button>
            </Form>
        </div>
    )
}
