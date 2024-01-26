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

    it('should have div with test-id quizDefinition', () => {
        render(<QuizDefinition />);
        const divQuizDefinition = screen.getByTestId("quizDefinition");
        expect(divQuizDefinition).toBeInTheDocument();
    });

    it('should have div with test-id loader', () => {
        render(<QuizDefinition />);
        const divLoader = screen.getByTestId("loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with test-id header', () => {
        render(<QuizDefinition />);
        const divHeader = screen.getByTestId("header");
        expect(divHeader).toBeInTheDocument();
    });

    it('should have div with test-id layout', () => {
        render(<QuizDefinition />);
        const divLayout = screen.getByTestId("layout");
        expect(divLayout).toBeInTheDocument();
    });

    it('should have div with test-id question, answers, score, btn after load async', async () => {
        render(<QuizDefinition />);
        await waitFor(
            () => {
                const question = screen.getByTestId('question');
                expect(question).toBeInTheDocument();
            }
        )
        await waitFor(
            () => {
                const answers = screen.getByTestId('answers');
                expect(answers).toBeInTheDocument();
            }
        )
        await waitFor(
            () => {
                const score = screen.getByTestId('score');
                expect(score).toBeInTheDocument();
            }
        )
        await waitFor(
            () => {
                const btn = screen.getByTestId('btn');
                expect(btn).toBeInTheDocument();
            }
        )
    });

    it('should not have div with test-id loader after load async', async () => {
        render(<QuizDefinition />);
        await waitFor(
            () => {
                const loader = screen.queryByTestId('loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with test-id correct and not have div with test-id wrong after click correct answer', async () => {
        render(<QuizDefinition />);
        await waitFor(
            async () => {
                const wordCorrect = screen.getByText('wordCorrect');
                await userEvent.click(wordCorrect);
            }
        )
        await waitFor(
            async () => {
                const divCorrect = screen.getByTestId('correct');
                expect(divCorrect).toBeInTheDocument();
            }
        )
        await waitFor(
            async () => {
                const divWrong = screen.queryByTestId('wrong');
                expect(divWrong).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with test-id wrong and not have div with test-id correct after click wrong answer', async () => {
        render(<QuizDefinition />);
        await waitFor(
            async () => {
                const wordWrong = screen.getByText('word1');
                await userEvent.click(wordWrong);
            }
        )
        await waitFor(
            async () => {
                const divWrong = screen.getByTestId('wrong');
                expect(divWrong).toBeInTheDocument();
            }
        )
        await waitFor(
            async () => {
                const divCorrect = screen.queryByTestId('correct');
                expect(divCorrect).not.toBeInTheDocument();
            }
        )
    });

    it('should not have div with test-id wrong and correct when no answer picked', async () => {
        render(<QuizDefinition />);
        await waitFor(
            async () => {
                const divWrong = screen.queryByTestId('wrong');
                expect(divWrong).not.toBeInTheDocument();
            }
        )
        await waitFor(
            async () => {
                const divCorrect = screen.queryByTestId('correct');
                expect(divCorrect).not.toBeInTheDocument();
            }
        )
    });

    it('should not have div with test-id wrong, correct, loader after good answer and clicked next question button', async () => {
        render(<QuizDefinition />);

        await waitFor(
            async () => {
                const wordCorrect = screen.getByText('wordCorrect');
                await userEvent.click(wordCorrect);
                const nextQuestionBtn = screen.getByText('Next Question');
                await userEvent.click(nextQuestionBtn);
            }
        )

        await waitFor(
            async () => {
                const divWrong = screen.queryByTestId('wrong');
                expect(divWrong).not.toBeInTheDocument();
            }
        )
        await waitFor(
            async () => {
                const divCorrect = screen.queryByTestId('correct');
                expect(divCorrect).not.toBeInTheDocument();
            }
        )
        await waitFor(
            async () => {
                const loader = screen.queryByTestId('loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });
});