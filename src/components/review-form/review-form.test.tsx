import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA: {
      isSubmittingComment: false,
    },
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render review form for authorized user', () => {
    renderComponent();

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/)).toBeInTheDocument();
    expect(screen.getByText('rating')).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/)).toBeInTheDocument();
    expect(screen.getByText(/50 characters/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render for unauthorized user but with disabled state', () => {
    const unauthorizedStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      DATA: {
        isSubmittingComment: false,
      },
    });

    render(
      <Provider store={unauthorizedStore}>
        <BrowserRouter>
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    const ratingInput = screen.getByDisplayValue('5');

    expect(submitButton).toBeDisabled();

    fireEvent.change(textarea, { target: { value: 'This is a test review with more than 50 characters to make it valid.' } });
    fireEvent.click(ratingInput);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should disable submit button when form is invalid', () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);

    fireEvent.change(textarea, { target: { value: 'This is a test review with more than 50 characters.' } });

    expect(submitButton).toBeDisabled();
  });

  it('should show character count', () => {
    renderComponent();

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    const characterCount = screen.getByText(/50 characters/);

    expect(characterCount).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Test review' } });

    expect(screen.getByText(/50 characters/)).toBeInTheDocument();
  });

  it('should handle rating selection', () => {
    renderComponent();

    const ratingInput = screen.getByDisplayValue('3');

    fireEvent.click(ratingInput);

    expect(ratingInput).toBeChecked();
  });

  it('should show loading state when submitting', () => {
    const loadingStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      DATA: {
        isSubmittingComment: true,
      },
    });

    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
});
