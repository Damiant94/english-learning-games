import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Letters from '../Letters';


describe('Letters', () => {
    it('should have div with class .Letters', () => {
        const { container } = render(<Letters clickHandle={() => {}}/>);
        const divLetters = container.querySelector(".Letters");
        expect(divLetters).toBeInTheDocument();
    });

    it('should have 26 divs with class .Letter', () => {
        const { container } = render(<Letters clickHandle={() => {}}/>);
        const divsLetter = container.querySelectorAll(".Letter");
        expect(divsLetter.length).toBe(26);
    });
    
    it('should have div with every letter', () => {
        render(<Letters clickHandle={() => {}}/>);
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("").forEach(letter => {
            const divLetter = screen.getByText(letter);
            expect(divLetter).toBeInTheDocument();
        });
    });
});