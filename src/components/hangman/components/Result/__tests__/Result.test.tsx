import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Result from '../Result';
import { SentenceContext } from '@/components/hangman/Hangman';


describe('Result', () => {
    it('should have div with class .Result', () => {
        render(<Result message='' restart={() => { }} classColor='' resultClicked={() => { }} />);
        const divResult = screen.getByTestId("result");
        expect(divResult).toBeInTheDocument();
    });

    it('should have p with class .Win', () => {
        render(<Result message='' restart={() => { }} classColor='Win' resultClicked={() => { }} />);
        const pWin = screen.getByTestId("Win");
        expect(pWin).toBeInTheDocument();
    });

    it('should have p with class .Lose', () => {
        render(<Result message='' restart={() => { }} classColor='Lose' resultClicked={() => { }} />);
        const pLose = screen.getByTestId("Lose");
        expect(pLose).toBeInTheDocument();
    });

    it('should have p with text message', () => {
        render(<Result message='message' restart={() => { }} classColor='' resultClicked={() => { }} />);
        const pMessage = screen.getByText('message');
        expect(pMessage).toBeInTheDocument();
    });

    it('should have p with text sentence', () => {
        render(
            <SentenceContext.Provider value={['w', 'o', 'r', 'd']}>
                <Result message='' restart={() => { }} classColor='' resultClicked={() => { }} />
            </SentenceContext.Provider>
        );
        const pSentence = screen.getByText('word');
        expect(pSentence).toBeInTheDocument();
    });
});