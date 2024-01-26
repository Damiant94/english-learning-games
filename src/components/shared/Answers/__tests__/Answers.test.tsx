import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Answers from '../Answers';
import Answered from '@/utils/interfaces/Answered';

const answersMock = [
    {isCorrect: true, answer: 'answer1'},
    {isCorrect: false, answer: 'answer2'},
    {isCorrect: false, answer: 'answer3'},
    {isCorrect: false, answer: 'answer4'}
]

describe('Answers', () => {

    it('should have div with test-id answers', () => {
        render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divAnswers = screen.getByTestId("answers");
        expect(divAnswers).toBeInTheDocument();
    });

    it('should have 4 divs with test-id answer', () => {
        render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divsAnswer = screen.getAllByTestId("answer");
        expect(divsAnswer.length).toBe(4);
    });

    it('should have 3 divs with test-id answeredWrong and 1 div with test-id answeredCorrect', () => {
        render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divsAnswerCorrect = screen.getAllByTestId("answeredCorrect");
        const divsAnswerWrong = screen.getAllByTestId("answeredWrong");
        expect(divsAnswerCorrect.length).toBe(1);
        expect(divsAnswerWrong.length).toBe(3);
    });
});