import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeIn } from 'animate-css-styled-components';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  notifyError = message => {
    toast.error(`Error: ${message}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    if (!newRepo) {
      this.setState({ loading: false });
      this.notifyError('Repository Invalid!');
      return;
    }

    if (repositories.find(repo => repo.name === newRepo)) {
      this.setState({
        loading: false,
        newRepo: '',
      });
      this.notifyError('Repository already exists');
      return;
    }

    const response = await api.get(`repos/${newRepo}`).catch(() => {
      this.setState({ loading: false, newRepo: '' });
      this.notifyError('Repository not found');
    });

    if (!response) return;

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <FadeIn duration="1.5s" delay="0.2s">
        <Container>
          <h1>
            <FaGithubAlt />
            Repositories
          </h1>

          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Adicionar Repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPlus color="#FFF" size="14px" />
              )}
            </SubmitButton>
          </Form>

          <div>
            <ToastContainer />
          </div>

          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </FadeIn>
    );
  }
}
