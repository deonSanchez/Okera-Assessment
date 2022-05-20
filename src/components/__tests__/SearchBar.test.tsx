import { render } from '@testing-library/react';
import SearchBar from 'components/SearchBar';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBar', () => {
  test('should render SearchBar', () => {
    const { container } = render(<SearchBar />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });
});
