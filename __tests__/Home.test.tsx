import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';


describe('Home', () => {
    it('should have div with test-id layout', () => {
        render(<Home />);
        const divLayout = screen.getByTestId('layout');
        expect(divLayout).toBeInTheDocument();
    });
});