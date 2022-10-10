import {render, fireEvent, screen} from '@testing-library/react';
import List from './List';

test('renders list', () => {
  render(<List />);
  const listElement = screen.getByTestId('list_item');
  expect(listElement).toBeInTheDocument();
});


