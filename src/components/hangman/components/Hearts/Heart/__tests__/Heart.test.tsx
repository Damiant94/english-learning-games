import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heart from '../Heart';


describe('Heart', () => {
    it('should have div with class .Heart', () => {
        const { container } = render(<Heart data={1} />);
        const divHearts = container.querySelector(".Heart");
        expect(divHearts).toBeInTheDocument();
    });

    it('should have 2 images', () => {
        const { container } = render(<Heart data={1} />);
        const imgs = container.querySelectorAll("img");
        expect(imgs.length).toBe(2);
    });

    it('should have div with data-heart=2', () => {
        const { container } = render(<Heart data={2} />);
        const heart = container.querySelector(`[data-heart="2"]`)
        expect(heart).toBeInTheDocument();
    });
});