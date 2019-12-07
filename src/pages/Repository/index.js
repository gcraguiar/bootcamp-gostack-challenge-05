import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FadeIn } from 'animate-css-styled-components';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, FilterOption, IssuePage } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    stateIssues: '',
    pageNumber: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          page: 6,
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

  FilterIssues = async state => {
    const { repository } = this.state;

    const [issues] = await Promise.all([
      api.get(`/repos/${repository.full_name}/issues`, {
        params: {
          state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      issues: issues.data,
      loading: false,
      pageNumber: 1,
      stateIssues: state,
    });
  };

  PageIssues = async page => {
    const { repository, stateIssues } = this.state;

    const [issues] = await Promise.all([
      api.get(`/repos/${repository.full_name}/issues`, {
        params: {
          state: stateIssues,
          page,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      pageNumber: page,
      issues: issues.data,
      loading: false,
    });
  };

  render() {
    const { repository, issues, loading, pageNumber } = this.state;

    if (loading) {
      return <Loading>Loading . . . </Loading>;
    }

    return (
      <FadeIn duration="1.5s" delay="0.2s">
        <Container>
          <Owner>
            <Link to="/">Back to Repositories</Link>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>
          <FilterOption>
            <button type="button" onClick={() => this.FilterIssues('all')}>
              All
            </button>
            <button type="button" onClick={() => this.FilterIssues('open')}>
              Open
            </button>
            <button type="button" onClick={() => this.FilterIssues('closed')}>
              Closed
            </button>
          </FilterOption>
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
          <IssuePage>
            {pageNumber === 1 ? (
              <button
                type="button"
                disabled
                onClick={() => this.PageIssues(pageNumber - 1)}
              >
                Previous Page
              </button>
            ) : (
              <button
                type="button"
                onClick={() => this.PageIssues(pageNumber - 1)}
              >
                Previous Page
              </button>
            )}

            {issues.length === 0 ? (
              <button
                type="button"
                disabled
                onClick={() => this.PageIssues(pageNumber + 1)}
              >
                Next Page
              </button>
            ) : (
              <button
                type="button"
                onClick={() => this.PageIssues(pageNumber + 1)}
              >
                Next Page
              </button>
            )}
          </IssuePage>
        </Container>
      </FadeIn>
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
