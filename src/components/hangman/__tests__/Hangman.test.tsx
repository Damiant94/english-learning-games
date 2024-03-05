import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Hangman from '../Hangman';


jest.mock('../../../utils/api/api', () => ({
    getRandomWordApi: jest.fn(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('word');
            }, 0);
        });
        return promise;
    }),
    getDefinitionsApi: jest.fn(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(['definition 1', 'definition 2']);
            }, 0);
        });
        return promise;
    }),
}));

describe('Hangman', () => {

    it('should have div with test id hangman', () => {
        render(<Hangman />);
        const divHangman = screen.getByTestId("hangman");
        expect(divHangman).toBeInTheDocument();
    });

    it('should have div with test id loader', () => {
        render(<Hangman />);
        const divLoader = screen.getByTestId("loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with test-id sentence after load async', async () => {
        render(<Hangman />);
        await waitFor(
            () => {
                const sentence = screen.getByTestId('sentence');
                expect(sentence).toBeInTheDocument();
            }
        )
    });

    it('should not have div with test-id loader after load async', async () => {
        render(<Hangman />);
        await waitFor(
            () => {
                const loader = screen.queryByTestId("loader");
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with data-id Win after click correct letters', async () => {
        render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterW = screen.getByText('W');
                await userEvent.click(buttonLetterW);
                expect(buttonLetterW).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterO = screen.getByText('O');
                await userEvent.click(buttonLetterO);
                expect(buttonLetterO).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterR = screen.getByText('R');
                await userEvent.click(buttonLetterR);
                expect(buttonLetterR).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterD = screen.getByText('D');
                await userEvent.click(buttonLetterD);
                expect(buttonLetterD).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const divWin = screen.getByTestId('Win');
                expect(divWin).toBeInTheDocument();
            }
        )
    });

    it('should have div with test-id Lose after click wrong letters', async () => {
        render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterA = screen.getByText('A');
                await userEvent.click(buttonLetterA);
                expect(buttonLetterA).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterB = screen.getByText('B');
                await userEvent.click(buttonLetterB);
                expect(buttonLetterB).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterC = screen.getByText('C');
                await userEvent.click(buttonLetterC);
                expect(buttonLetterC).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterE = screen.getByText('E');
                await userEvent.click(buttonLetterE);
                expect(buttonLetterE).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterF = screen.getByText('F');
                await userEvent.click(buttonLetterF);
                expect(buttonLetterF).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterG = screen.getByText('G');
                await userEvent.click(buttonLetterG);
                expect(buttonLetterG).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterH = screen.getByText('H');
                await userEvent.click(buttonLetterH);
                expect(buttonLetterH).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterI = screen.getByText('I');
                await userEvent.click(buttonLetterI);
                expect(buttonLetterI).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterJ = screen.getByText('J');
                await userEvent.click(buttonLetterJ);
                expect(buttonLetterJ).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const divLose = screen.getByTestId('Lose');
                expect(divLose).toBeInTheDocument();
            }
        )
    });

    it('should have div with data-id Win after type on keyboard correct letters', async () => {
        render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterW = screen.getByText('W');
                await userEvent.keyboard("{w}");
                expect(buttonLetterW).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterO = screen.getByText('O');
                await userEvent.keyboard("{o}");
                expect(buttonLetterO).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterR = screen.getByText('R');
                await userEvent.keyboard("{r}");
                expect(buttonLetterR).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                await userEvent.keyboard("{d}");
            }
        )
        await waitFor(
            async () => {
                const divWin = screen.getByTestId('Win');
                expect(divWin).toBeInTheDocument();
            }
        )
    });

    it('should have div with data-id Win after type on keyboard and click correct letters', async () => {
        render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterW = screen.getByText('W');
                await userEvent.keyboard("{w}");
                expect(buttonLetterW).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterO = screen.getByText('O');
                await userEvent.click(buttonLetterO);
                expect(buttonLetterO).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                const buttonLetterR = screen.getByText('R');
                await userEvent.keyboard("{r}");
                expect(buttonLetterR).toBeDisabled();
            }
        )
        await waitFor(
            async () => {
                await userEvent.keyboard("{d}");
            }
        )
        await waitFor(
            async () => {
                const divWin = screen.getByTestId('Win');
                expect(divWin).toBeInTheDocument();
            }
        )
    });
});