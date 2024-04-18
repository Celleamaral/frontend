import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, TableFooter, TableRow, TableHeaderCell, Icon } from 'semantic-ui-react';
import Create from './create';
import Update from './update';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [userData, setUserData] = useState(null); // State para armazenar os dados do usuário selecionado

    useEffect(() => {
        getData();
    }, []);

    const setData = (data) => {
        setUserData(data); // Define os dados do usuário para atualização
        setIsUpdate(true); // Abre o formulário de atualização
    }

    const getData = () => {
        axios.get(`http://127.0.0.1:5000/alunos`)
            .then((response) => {
                setAPIData(response.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/alunos/${id}`)
            .then(() => {
                getData();
            })
    }

    const toggleCreateForm = () => {
        setIsCreate(!isCreate);
    }

    const toggleUpdateForm = () => {
        setIsUpdate(!isUpdate);
    }

    const handleUpdate = () => {
        getData(); // Atualiza os dados da tabela após o update
        toggleUpdateForm(); // Fecha o formulário de atualização
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Matrícula</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Editar</Table.HeaderCell>
                        <Table.HeaderCell>Remover</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data, index) => {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>ACAD-00{data.id}</Table.Cell>
                                <Table.Cell>{data.nome}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        icon='edit'
                                        onClick={() => setData(data)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        icon='trash'
                                        color='red'
                                        onClick={() => { if (window.confirm('Deseja mesmo deletar?')) { onDelete(data.id) } }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
                <TableFooter fullWidth>
                    <TableRow>
                        <TableHeaderCell />
                        <TableHeaderCell colSpan='4'>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={toggleCreateForm}
                            >
                                <Icon name='user' /> {isCreate ? 'Fechar' : 'Cadastrar Aluno'}
                            </Button>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {isCreate && (
                <Create getData={getData} setIsCreate={setIsCreate} />
            )}
            {isUpdate && (
                <Update
                    userData={userData} // Passa os dados do usuário para o componente de atualização
                    toggleUpdateForm={toggleUpdateForm} // Passa a função para fechar o formulário de atualização
                    handleUpdate={handleUpdate} // Passa a função para atualizar a tabela após o update
                />
            )}
        </div>
    )
}
