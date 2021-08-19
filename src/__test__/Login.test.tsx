import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import { LoginPage } from "../components/Login/LoginPage";
import { mount } from 'enzyme';
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("<LoginPage />", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
        const onSubmit = jest.fn(); 
        act(() => {
            renderWithToastify(<LoginPage />);
            
        })
        userEvent.click(screen.getByText('Login'));
        expect(onSubmit).toBeCalledTimes(1)
    });
});

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