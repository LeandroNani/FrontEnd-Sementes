import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Pages/login';

describe('Login component', () => {
  test('renders Login component', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Seja bem-vindo ao Sementes!')).toBeInTheDocument();
  });

  test('renders email input field', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText('Email')).toBeInTheDocument();
  });

  test('renders password input field', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText('Senha')).toBeInTheDocument();
  });

  test('renders login button', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('renders register button', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Cadastrar Conta')).toBeInTheDocument();
  });
});