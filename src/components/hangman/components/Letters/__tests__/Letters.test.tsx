import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Letters from '../Letters';


describe('Letters', () => {
    it('should have div with test-id letters', () => {
        render(<Letters clickHandle={() => {}}/>);
        const divLetters = screen.getByTestId("letters");
        expect(divLetters).toBeInTheDocument();
    });

    it('should have 26 divs with test-id letter', () => {
        render(<Letters clickHandle={() => {}}/>);
        const divsLetter = screen.getAllByTestId("letter");
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