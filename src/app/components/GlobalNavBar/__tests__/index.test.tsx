import React from 'react';
import { render } from '@testing-library/react';

import { GlobalNavBar } from '..';

describe('<GlobalNavBar  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<GlobalNavBar />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
