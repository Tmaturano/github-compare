/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background: #FFF;
    border: 0;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
  }

  button{
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background: #63f5b0;
    color: #FFF;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;

    &:hover {
      background: #52D89F;
    }
  }
`;

const Main = () => (
  <Container>
    <img src={logo} alt="Github Compare" />

    <Form>
      <input type="text" placeholder="User/Repository" />
      <button type="submit">Ok</button>
    </Form>
  </Container>
);

export default Main;
