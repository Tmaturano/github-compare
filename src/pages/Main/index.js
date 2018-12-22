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
    repositoryInput: '',
    repositories: [],
  };


  handleAddRepository = async (e) => {
    e.preventDefault();

    try {
      // desestructuration and renaming
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      // creating a new property called lastCommit
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository], // spread operator
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="User/Repository"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
