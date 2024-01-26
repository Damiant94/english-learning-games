import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from '../Question';


describe('Question', () => {

    it('should have div with class .Question', () => {
        const { container } = render(<Question currentQuestion=''/>);
        const divQuestion = container.querySelector(".Question");
        expect(divQuestion).toBeInTheDocument();
    });

    it('should have div with class .Question', () => {
        render(<Question currentQuestion='question'/>);
        const divQuestion = screen.getByText('question');
        expect(divQuestion).toBeInTheDocument();
    });
});