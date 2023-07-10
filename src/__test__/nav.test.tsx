import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from '@/components/layout/nav';

test('loads and displays nav', async () => {
  render(<Nav />);

  expect(screen.getByRole('button', { name: '다크모드 변경' }));
});
