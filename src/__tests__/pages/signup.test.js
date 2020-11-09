import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { FirebaseContext } from '../../context/firebase'
import { SignUp } from '../../pages'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({})
}));

const firebase = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(
      () => Promise.resolve({
        user: {
          updateProfile: jest.fn(() => Promise.resolve('I am signed up!'))
        }
      })
      )
  }))
};

describe('<SignUp />', () => {
  it ('renders the sign up page with a form submission', async () => {
    const { getByTestId, getByPlaceholderText, queryByTestId } = render (
      <Router>
        <FirebaseContext.Provider value={{firebase}}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async() => {
      await fireEvent.change(getByPlaceholderText('First Name'), {
        target: { value: 'Ivan'}
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'test@mail.ru'}
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password'}
      });
      fireEvent.click(getByTestId('sign-up'));

      expect(getByPlaceholderText('First Name').value).toBe('Ivan');
      expect(getByPlaceholderText('Email address').value).toBe('test@mail.ru');
      expect(getByPlaceholderText('Password').value).toBe('password');
      expect(queryByTestId('error')).toBeFalsy();

    })
  })
})
