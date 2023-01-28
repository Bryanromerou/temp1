import React from 'react';
import { render } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { configureAppStore } from 'store/configureStore';
import { AdminConsole } from '..';

const renderComponent = (store: Store) =>
  render(
    <Provider store={store}>
        <AdminConsole  />
    </Provider>
  );

describe('<AdminConsole />', () => {
  let store: ReturnType<typeof configureAppStore>;
  
  beforeEach(() => {
    store = configureAppStore();
  });
  it('should match the snapshot', () => {
    const component = renderComponent(store);
    expect(component.container.firstChild).toMatchSnapshot();
  });
});