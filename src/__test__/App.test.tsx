import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import App from "../App";
import { ToastContainer } from "react-toastify";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

test('should render the App with navbar', () => {
  let container = document.querySelector('Body')!
  renderWithToastify(<App />);
  const navbar = container.querySelector('App')!;
  expect(navbar.textContent).toBe("Login Register")
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
