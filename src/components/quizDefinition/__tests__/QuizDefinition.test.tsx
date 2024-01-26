import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import QuizDefinition from '../QuizDefinition';


jest.mock('../../../utils/api/api', () => ({
    getRandomWordApi: jest.fn(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('wordCorrect');
            }, 0);
        });
        return promise;
    }),
    get3RandomWordsApi: jest.fn(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(['word1', 'word2', 'word3']);
            }, 0);
        });
        return promise;
    }),
    getDefinitionApi: jest.fn(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('definition 1');
            }, 0);
        });
        return promise;
    }),
}));

describe('QuizDefinition', () => {

    it('should have div with class .QuizDefinitionMain', () => {
        const { container } = render(<QuizDefinition />);
        const divQuizDefinition = container.querySelector(".QuizDefinitionMain");
        expect(divQuizDefinition).toBeInTheDocument();
    });

    it('should have div with class .Loader', () => {
        const { container } = render(<QuizDefinition />);
        const divLoader = container.querySelector(".Loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with class .Header', () => {
        const { container } = render(<QuizDefinition />);
        const divHeader = container.querySelector(".Header");
        expect(divHeader).toBeInTheDocument();
    });

    it('should have div with class .Layout', () => {
        const { container } = render(<QuizDefinition />);
        const divLayout = container.querySelector(".Layout");
        expect(divLayout).toBeInTheDocument();
    });

    it('should have div with class .Question, .Answers, .Score, .Btn after load async', async () => {
        const { container } = render(<QuizDefinition />);
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
        const { container } = render(<QuizDefinition />);
        await waitFor(
            () => {
                const loader = container.querySelector('.Loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Correct and not have div with class .Wrong after click correct answer', async () => {
        const { container } = render(<QuizDefinition />);
        await waitFor(
            async () => {
                const wordCorrect = screen.getByText('wordCorrect');
                await userEvent.click(wordCorrect);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Wrong and not have div with class .Correct after click wrong answer', async () => {
        const { container } = render(<QuizDefinition />);
        await waitFor(
            async () => {
                const wordWrong = screen.getByText('word1');
                await userEvent.click(wordWrong);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Wrong and .Correct when no answer picked', async () => {
        const { container } = render(<QuizDefinition />);
        await waitFor(
            async () => {
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Wrong, .Correct, .Loader after good answer and clicked next question button', async () => {
        const { container } = render(<QuizDefinition />);
        await waitFor(
            async () => {
                const wordCorrect = screen.getByText('wordCorrect');
                await userEvent.click(wordCorrect);
                const nextQuestionBtn = screen.getByText('Next Question');
                await userEvent.click(nextQuestionBtn);
                const divCorrect = container.querySelector('.Correct');
                const divWrong = container.querySelector('.Wrong');
                expect(divCorrect).not.toBeInTheDocument();
                expect(divWrong).not.toBeInTheDocument();

                await waitFor(
                    async () => {
                        const loader = container.querySelector('.Loader');
                        expect(loader).not.toBeInTheDocument();
                    }
                )
            }
        )
    });
});