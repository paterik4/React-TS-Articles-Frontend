import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../components/Home/Home';
import { ToastContainer } from "react-toastify";

test('should render the Home component', () => {
    renderWithToastify(<HomePage />);
    const linkElement = screen.getByText(/Welcome To SPA Articles App/i);
    expect(linkElement).toBeInTheDocument()
})

export const renderWithToastify = (component: any) => {

    return (
      render(
        <div>
          <ToastContainer/>
          {component}
        </div>
      )
    );
  };