import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update({ userData, toggleUpdateForm, handleUpdate }) {
    let history = useHistory();
    const [nome, setNome] = useState(userData.nome);
    const [email, setEmail] = useState(userData.email);

    const updateAPIData = () => {
        axios.put(`http://localhost:5000/alunos/${userData.id}`, {
            nome,
            email
        }).then(() => {
            toggleUpdateForm(); // Fecha o formulário de atualização
            handleUpdate(); // Atualiza a tabela
            history.push('/listar'); // Redireciona para a página de listagem
        })
    }

    return (
        <div>
            <h2>Editar Aluno</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Nome</label>
                    <input placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>E-mail</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Atualizar</Button>
            </Form>
        </div>
    )
}
