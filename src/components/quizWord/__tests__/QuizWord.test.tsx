import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import QuizWord from '../QuizWord';

let randomWords = ['word1', 'word2', 'word3', 'word4'];
let randomDefinitions = ['definition1', 'definition2', 'definition3', 'definition4'];

jest.mock('../../../utils/api/api', () => ({
    getRandomWordApi: jest.fn(() => {
        const promise: Promise<string> = new Promise((resolve) => {
            setTimeout(() => {
                const word = randomWords[0];
                randomWords.splice(0, 1);
                resolve(word);
            }, 0);
        });
        return promise;
    }),
    getDefinitionApi: jest.fn(() => {
        const promise: Promise<string> = new Promise((resolve) => {
            setTimeout(() => {
                const definition = randomDefinitions[0];
                randomDefinitions.splice(0, 1);
                resolve(definition);
            }, 0);
        });
        return promise;
    }),
}));

describe('QuizWord', () => {

    beforeEach(() => {
        randomWords = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8'];
        randomDefinitions = ['definition1', 'definition2', 'definition3', 'definition4'];
    })

    it('should have div with class .QuizWordMain', () => {
        const { container } = render(<QuizWord />);
        const divQuizWord = container.querySelector(".QuizWordMain");
        expect(divQuizWord).toBeInTheDocument();
    });

    it('should have div with class .Loader', () => {
        const { container } = render(<QuizWord />);
        const divLoader = container.querySelector(".Loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with class .Header', () => {
        const { container } = render(<QuizWord />);
        const divHeader = container.querySelector(".Header");
        expect(divHeader).toBeInTheDocument();
    });

    it('should have div with class .Layout', () => {
        const { container } = render(<QuizWord />);
        const divLayout = container.querySelector(".Layout");
        expect(divLayout).toBeInTheDocument();
    });

    it('should have div with class .Question, .Answers, .Score, .Btn after load async', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            () => {
                const question = container.querySelector('.Question');
                expect(question).toBeInTheDocument();
                const answers = container.querySelector('.Answers');
                expect(answers).toBeInTheDocument();
                const score = container.querySelector('.Score');
                expect(score).toBeInTheDocument();
                const btn = container.querySelector('.Btn');
                expect(btn).toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Loader after load async', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            () => {
                const loader = container.querySelector('.Loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Correct and not have div with class .Wrong after click correct answer', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            async () => {
                const definitionCorrect = screen.getByText('definition1');
                await userEvent.click(definitionCorrect);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Wrong and not have div with class .Correct after click wrong answer', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            async () => {
                const definitionWrong = screen.getByText('definition2');
                await userEvent.click(definitionWrong);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Wrong and .Correct when no answer picked', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            async () => {
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Wrong, .Correct after good answer and clicked next question button', async () => {
        const { container } = render(<QuizWord />);
        await waitFor(
            async () => {
                const definitionCorrect = screen.getByText('definition1');
                await userEvent.click(definitionCorrect);
                const nextQuestionBtn = screen.getByText('Next Question');
                await userEvent.click(nextQuestionBtn);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });
});