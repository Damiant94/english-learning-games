import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hearts from '../Hearts';


describe('Hearts', () => {
    it('should have div with test-id hearts', () => {
        render(<Hearts />);
        const divHearts = screen.getByTestId('hearts');
        expect(divHearts).toBeInTheDocument();
    });
    it('should have 9 divs with class .Heart', () => {
        render(<Hearts />);
        const divsHeart = screen.getAllByTestId('heart')
        expect(divsHeart.length).toBe(9);
    });
});