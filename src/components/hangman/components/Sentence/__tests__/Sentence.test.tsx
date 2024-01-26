import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sentence from '../Sentence';


describe('Sentence', () => {
    it('should have div with class .Sentence', () => {
        const { container } = render(<Sentence currentSentence=''/>);
        const divSentence = container.querySelector(".Sentence");
        expect(divSentence).toBeInTheDocument();
    });

    it('should have div with current sentence', () => {
        render(<Sentence currentSentence='currentSentence'/>);
        const divSentence = screen.getByText('currentSentence');
        expect(divSentence).toBeInTheDocument();
    });
});