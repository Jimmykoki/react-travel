/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../components';
import { Provider } from 'react-redux';
import rootStore from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('renders the header with logo, search bar, and buttons', () => {
    render(
      <Provider store={rootStore.store}>
        <PersistGate persistor={rootStore.persistor}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
    // check if the logo is in the document
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    // check if the search input is in the document
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();

    // check if the sign-in button is in the document
    const signInButton = screen.getByRole('button', {
      name: 'header.signin',
    });
    expect(signInButton).toBeInTheDocument();
    userEvent.click(signInButton);

    // check if the sign-up button is in the document
    const signUpButton = screen.getByRole('button', {
      name: 'header.register',
    });
    expect(signUpButton).toBeInTheDocument();
    userEvent.click(signUpButton);
  });
});
