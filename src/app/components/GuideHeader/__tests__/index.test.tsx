import React from 'react';
import { render } from '@testing-library/react';

import { GuideHeader } from '..';

describe('<GuideHeader  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<GuideHeader />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
