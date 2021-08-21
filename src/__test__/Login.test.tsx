import React from 'react';
import { mount, configure } from 'enzyme';
import { Login } from '../components/Login/Components/Login';

it('should call submitFN when the form is submitted', () => {
  const submitFN = jest.fn();
  const wrapper = mount(<Login submitFN={submitFN} />);

  const form = wrapper.find('form');
  form.simulate('submit');
  expect(submitFN).toHaveBeenCalledTimes(1)
})