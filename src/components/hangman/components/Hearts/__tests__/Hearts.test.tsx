import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hearts from '../Hearts';


describe('Hearts', () => {
    it('should have div with class .Hearts', () => {
        const { container } = render(<Hearts />);
        const divHearts = container.querySelector(".Hearts");
        expect(divHearts).toBeInTheDocument();
    });
    it('should have 9 divs with class .Heart', () => {
        const { container } = render(<Hearts />);
        const divsHeart = container.querySelectorAll(".Heart")
        expect(divsHeart.length).toBe(9);
    });
});