import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Score from '../Score';
import Answered from '@/utils/interfaces/Answered';


describe('Score', () => {

    it('should have div with class .Score', () => {
        const { container } = render(<Score answered={Answered.CORRECT} score={1} />);
        const divScore = container.querySelector(".Score");
        expect(divScore).toBeInTheDocument();
    });

    it('should have div with class .Correct', () => {
        const { container } = render(<Score answered={Answered.CORRECT} score={1} />);
        const divCorrect = container.querySelector(".Correct");
        expect(divCorrect).toBeInTheDocument();
    });

    it('should not have div with class .Correct', () => {
        const { container } = render(<Score answered={Answered.WRONG} score={1} />);
        const divCorrect = container.querySelector(".Correct");
        expect(divCorrect).not.toBeInTheDocument();
    });

    it('should have div with class .Wrong', () => {
        const { container } = render(<Score answered={Answered.WRONG} score={1} />);
        const divWrong = container.querySelector(".Wrong");
        expect(divWrong).toBeInTheDocument();
    });

    it('should have div with score number', () => {
        render(<Score answered={Answered.CORRECT} score={5} />);
        const divScore = screen.getByText('Score: 5');
        expect(divScore).toBeInTheDocument();
    });

    it('should not have div with class .Correct or .Wrong', () => {
        const { container } = render(<Score answered={Answered.NOT_ANSWERED} score={5} />);
        const divCorrect = container.querySelector(".Correct");
        const divWrong = container.querySelector(".Wrong");
        expect(divCorrect).not.toBeInTheDocument();
        expect(divWrong).not.toBeInTheDocument();
    });
});