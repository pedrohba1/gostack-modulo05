/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import { FaGithubAlt, FaSpinner, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;
        const res = await api.get(`/repos/${newRepo}`);
        const data = {
            name: res.data.full_name,
        };
        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
        });
        this.setState({ loading: false });
    };

    render() {
        const { newRepo, loading } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="adicionar repositorio"
                        value={newRepo}
                        onChange={this.handleInputChange}
                        type="text"
                    />
                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}
