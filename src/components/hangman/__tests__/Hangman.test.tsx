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

    it('should have div with class .HangmanMain', () => {
        const { container } = render(<Hangman />);
        const divHangman = container.querySelector(".HangmanMain");
        expect(divHangman).toBeInTheDocument();
    });

    it('should have div with class .Loader', () => {
        const { container } = render(<Hangman />);
        const divLoader = container.querySelector(".Loader");
        expect(divLoader).toBeInTheDocument();
    });

    it('should have div with class .Sentence after load async', async () => {
        const { container } = render(<Hangman />);
        await waitFor(
            () => {
                const sentence = container.querySelector('.Sentence');
                expect(sentence).toBeInTheDocument();
            }
        )
    });

    it('should not have div with class .Loader after load async', async () => {
        const { container } = render(<Hangman />);
        await waitFor(
            () => {
                const loader = container.querySelector('.Loader');
                expect(loader).not.toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Win after click correct letters', async () => {
        const { container } = render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterW = screen.getByText('W');
                await userEvent.click(buttonLetterW);
                expect(buttonLetterW).toBeDisabled();

                const buttonLetterO = screen.getByText('O');
                await userEvent.click(buttonLetterO);
                expect(buttonLetterO).toBeDisabled();

                const buttonLetterR = screen.getByText('R');
                await userEvent.click(buttonLetterR);
                expect(buttonLetterR).toBeDisabled();

                const buttonLetterD = screen.getByText('D');
                await userEvent.click(buttonLetterD);
                expect(buttonLetterD).toBeDisabled();

                const divWin = container.querySelector('.Win');
                expect(divWin).toBeInTheDocument();
            }
        )
    });

    it('should have div with class .Lose after click wrong letters', async () => {
        const { container } = render(<Hangman />);
        await waitFor(
            async () => {
                const buttonLetterA = screen.getByText('A');
                await userEvent.click(buttonLetterA);
                expect(buttonLetterA).toBeDisabled();

                const buttonLetterB = screen.getByText('B');
                await userEvent.click(buttonLetterB);
                expect(buttonLetterB).toBeDisabled();

                const buttonLetterC = screen.getByText('C');
                await userEvent.click(buttonLetterC);
                expect(buttonLetterC).toBeDisabled();

                const buttonLetterE = screen.getByText('E');
                await userEvent.click(buttonLetterE);
                expect(buttonLetterE).toBeDisabled();

                const buttonLetterF = screen.getByText('F');
                await userEvent.click(buttonLetterF);
                expect(buttonLetterF).toBeDisabled();

                const buttonLetterG = screen.getByText('G');
                await userEvent.click(buttonLetterG);
                expect(buttonLetterG).toBeDisabled();

                const buttonLetterH = screen.getByText('H');
                await userEvent.click(buttonLetterH);
                expect(buttonLetterH).toBeDisabled();

                const buttonLetterI = screen.getByText('I');
                await userEvent.click(buttonLetterI);
                expect(buttonLetterI).toBeDisabled();

                const buttonLetterJ = screen.getByText('J');
                await userEvent.click(buttonLetterJ);
                expect(buttonLetterJ).toBeDisabled();

                const divLose = container.querySelector('.Lose');
                expect(divLose).toBeInTheDocument();
            }
        )
    });
});