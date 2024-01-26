import { render } from '@testing-library/react';
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

    it('should have div with class .Answers', () => {
        const { container } = render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divAnswers = container.querySelector(".Answers");
        expect(divAnswers).toBeInTheDocument();
    });

    it('should have 4 divs with class .Answer', () => {
        const { container } = render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divsAnswer = container.querySelectorAll(".Answer");
        expect(divsAnswer.length).toBe(4);
    });

    it('should have 3 divs with class .AnsweredWrong and 1 div with class .AnsweredCorrect', () => {
        const { container } = render(
            <Answers
                answers={answersMock}
                answered={Answered.CORRECT}
                answerClicked={() => {}} />
        );
        const divsAnswerCorrect = container.querySelectorAll(".AnsweredCorrect");
        const divsAnswerWrong = container.querySelectorAll(".AnsweredWrong");
        expect(divsAnswerCorrect.length).toBe(1);
        expect(divsAnswerWrong.length).toBe(3);
    });
});