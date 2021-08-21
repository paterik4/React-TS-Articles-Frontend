import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import { mount } from 'enzyme';
import { LoginPage } from "../components/Login/LoginPage";

describe("<LoginPage />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    renderWithToastify(<LoginPage />)
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