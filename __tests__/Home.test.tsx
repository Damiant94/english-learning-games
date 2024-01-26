import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';


describe('Home', () => {
    it('should have div with class .Layout', () => {
        const { container } = render(<Home />);
        const divLayout = container.querySelector(".Layout");
        expect(divLayout).toBeInTheDocument();
    });
});