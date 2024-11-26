import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import SignInPage from '../pages/SignInPage';
import AuthProvider from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignInPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>
    );
    mockNavigate.mockClear();
  });

  it('renders the sign-in form', () => {
    expect(screen.getByText('Sign in to MKU Hostels')).toBeInTheDocument();
    expect(screen.getByLabelText(/Student Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid email', async () => {
    const emailInput = screen.getByLabelText(/Student Email/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid@email.com' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please use your MKU student email')).toBeInTheDocument();
  });

  it('shows validation errors for short password', async () => {
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it('successfully logs in with valid credentials', async () => {
    const emailInput = screen.getByLabelText(/Student Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(emailInput, { target: { value: 'student@students.mku.ac.ke' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});