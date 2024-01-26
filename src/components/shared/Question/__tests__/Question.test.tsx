import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from '../Question';


describe('Question', () => {

    it('should have div with test-id question', () => {
        render(<Question currentQuestion=''/>);
        const divQuestion = screen.getByTestId("question");
        expect(divQuestion).toBeInTheDocument();
    });

    it('should have div with current question', () => {
        render(<Question currentQuestion='question'/>);
        const divQuestion = screen.getByText('question');
        expect(divQuestion).toBeInTheDocument();
    });
});