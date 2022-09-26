import { render, screen } from '@testing-library/react';
import App from './App';

test('should show the logo in the page', () => {
  render(<App />);
  const appLogo = screen.getByTestId("app-logo");
  expect(appLogo).toBeInTheDocument();
});
