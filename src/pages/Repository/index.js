import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Container from '../../components/Container';

import api from '../../services/api';

import { Loading, Owner, IssueList, FilterState } from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filters: [
        { state: 'open', label: 'Open', active: true },
        { state: 'closed', label: 'Closed', active: false },
        { state: 'all', label: 'All', active: false },
      ],
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async filterState(index) {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const { state } = filters[index];

    const issues = await api.get(`repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
      },
    });

    this.setState({ issues: issues.data, activeIndex: index });
  }

  render() {
    const { repository, issues, loading, filters, activeIndex } = this.state;

    if (loading) {
      return (
        <Loading>
          Loading
          <Loader type="Oval" height={30} width={30} color="#7159c1" />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <FilterState active={activeIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.state}
                onClick={() => this.filterState(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterState>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  <span className={issue.state}>{issue.state}</span>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
