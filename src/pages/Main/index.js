import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
    };
  }

  // Load localStorage data
  componentDidMount() {
    if (localStorage.getItem('repositories')) {
      this.setState({
        repositories: JSON.parse(localStorage.getItem('repositories')),
      });
    }
  }

  // Store localStorage data
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      newRepo: '',
      repositories: [...repositories, data],
      loading: false,
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

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
    );
  }
}

export default Main;
