import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CharacterTable from 'components/CharacterTable';
import { mockCharacterTable } from '../__mocks__/characters';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterTable', () => {
  test('should render CharacterTable', () => {
    const { container } = render(
      <CharacterTable page="3" data={mockCharacterTable} hidden={false} />,
      { wrapper: MemoryRouter }
    );

    screen.getByTestId('first-page-button');
    screen.getByTestId('last-page-button');
    screen.getByTestId('next-page-button');
    screen.getByTestId('previous-page-button');

    expect(container).toMatchSnapshot();
  });

  test('should hide pagination buttons', () => {
    render(
      <CharacterTable page="3" data={mockCharacterTable} hidden={true} />,
      { wrapper: MemoryRouter }
    );

    const button = screen.getByTestId('back-character-button');
    expect(button).toBeInTheDocument;
  });

  test('should check next page button functionality', () => {
    render(
      <CharacterTable page="3" data={mockCharacterTable} hidden={false} />,
      { wrapper: MemoryRouter }
    );

    const button = screen.getByTestId('next-page-button');
    const pagination = screen.getByTestId('pagination-text');

    expect(pagination).toHaveTextContent('Page 3 of 214');
    fireEvent.click(button);

    waitFor(() => {
      expect(pagination).toHaveTextContent('Page 4 of 214');
    });
  });
});
