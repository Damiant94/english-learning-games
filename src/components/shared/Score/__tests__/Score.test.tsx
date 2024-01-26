import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Score from '../Score';
import Answered from '@/utils/interfaces/Answered';


describe('Score', () => {

    it('should have div with test-id score', () => {
        render(<Score answered={Answered.CORRECT} score={1} />);
        const divScore = screen.getByTestId("score");
        expect(divScore).toBeInTheDocument();
    });

    it('should have div with test-id correct', () => {
        render(<Score answered={Answered.CORRECT} score={1} />);
        const divCorrect = screen.getByTestId("correct");
        expect(divCorrect).toBeInTheDocument();
    });

    it('should not have div with test-id correct', () => {
        render(<Score answered={Answered.WRONG} score={1} />);
        const divCorrect = screen.queryByTestId(".Correct");
        expect(divCorrect).not.toBeInTheDocument();
    });

    it('should have div with test-id wrong', () => {
        render(<Score answered={Answered.WRONG} score={1} />);
        const divWrong = screen.queryByTestId("wrong");
        expect(divWrong).toBeInTheDocument();
    });

    it('should have div with score number', () => {
        render(<Score answered={Answered.CORRECT} score={5} />);
        const divScore = screen.getByText('Score: 5');
        expect(divScore).toBeInTheDocument();
    });

    it('should not have div with test-id correct or wrong', () => {
        render(<Score answered={Answered.NOT_ANSWERED} score={5} />);
        const divCorrect = screen.queryByTestId("correct");
        const divWrong = screen.queryByTestId("crong");
        expect(divCorrect).not.toBeInTheDocument();
        expect(divWrong).not.toBeInTheDocument();
    });
});