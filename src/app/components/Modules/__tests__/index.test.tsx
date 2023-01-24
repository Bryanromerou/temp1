import React from 'react';
import { render } from '@testing-library/react';

import { Module } from '..';

describe('<Module  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Module />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
