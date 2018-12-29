/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
    errorMessage: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }


  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      // desestructuration and renaming
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      // creating a new property called lastCommit
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      if (repositories.filter(r => r.id === repository.id).length > 0) {
        this.setState({
          repositoryError: true,
          errorMessage: 'There is already a repository with the given owner/repository',
        });

        return;
      }

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository], // spread operator
        repositoryError: false,
        errorMessage: '',
      });

      const localRepositories = await this.getLocalRepositories();
      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);
    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(updatedRepositories));
  }

  handleInputOnChange = async (e) => {
    if (e.target.value === '') {
      this.setState({
        repositoryError: false,
        errorMessage: '',
      });
    }

    this.setState({ repositoryInput: e.target.value });
  }

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="ex: facebook/react"
            value={this.state.repositoryInput}
            onChange={e => this.handleInputOnChange(e)}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <span>{this.state.errorMessage}</span>

        <CompareList
          repositories={this.state.repositories}
          removeRepository={this.handleRemoveRepository}
        />
      </Container>
    );
  }
}
