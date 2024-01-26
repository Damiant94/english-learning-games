import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heart from '../Heart';


describe('Heart', () => {
    it('should have div with test-id heart', () => {
        render(<Heart data={1} />);
        const divHeart = screen.getByTestId('heart')
        expect(divHeart).toBeInTheDocument();
    });

    it('should have 2 images', () => {
        render(<Heart data={1} />);
        const imgs = screen.getAllByTestId("img");
        expect(imgs.length).toBe(2);
    });

    it('should have div with data-heart=2', () => {
        render(<Heart data={2} />);
        const divHeart = screen.getByTestId('heart');
        expect(divHeart.dataset.heart).toBe("2");
    });
});