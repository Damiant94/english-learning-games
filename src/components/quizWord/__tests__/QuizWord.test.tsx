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

    it('should have div with test-id .quizWord', () => {
        render(<QuizWord />);
        const divQuizWord = screen.getByTestId("quizWord");
        expect(divQuizWord).toBeInTheDocument();
    });

    it('should have div with test-id loader', () => {
        render(<QuizWord />);
        const divLoader = screen.getByTestId("loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with test-id header', () => {
        render(<QuizWord />);
        const divHeader = screen.getByTestId("header");
        expect(divHeader).toBeInTheDocument();
    });

    it('should have div with test-id layout', () => {
        render(<QuizWord />);
        const divLayout = screen.getByTestId("layout");
        expect(divLayout).toBeInTheDocument();
    });

    it('should have div with test-id question, answers, score, btn after load async', async () => {
        render(<QuizWord />);

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
                const btns = screen.getAllByTestId('btn');
                expect(btns[0]).toBeInTheDocument();
                expect(btns[1]).toBeInTheDocument();
            }
        )
    });

    it('should not have div with test-id loader after load async', async () => {
        render(<QuizWord />);

        await waitFor(
            () => {
                const loader = screen.queryByTestId('loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with test-id correct and not have div with test-id wrong after click correct answer', async () => {
        render(<QuizWord />);

        await waitFor(
            async () => {
                const wordCorrect = screen.getByText('definition1');
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
        render(<QuizWord />);

        await waitFor(
            async () => {
                const wordWrong = screen.getByText('definition2');
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
        render(<QuizWord />);
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
});