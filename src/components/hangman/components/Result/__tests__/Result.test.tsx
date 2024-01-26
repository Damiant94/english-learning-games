import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Result from '../Result';


describe('Result', () => {
    it('should have div with class .Result', () => {
        render(<Result message='' sentence='' restart={() => {}} classColor='' resultClicked={() => {}}/>);
        const divResult = screen.getByTestId("result");
        expect(divResult).toBeInTheDocument();
    });

    it('should have p with class .Win', () => {
        render(<Result message='' sentence='' restart={() => {}} classColor='Win' resultClicked={() => {}}/>);
        const pWin = screen.getByTestId("Win");
        expect(pWin).toBeInTheDocument();
    });

    it('should have p with class .Lose', () => {
        render(<Result message='' sentence='' restart={() => {}} classColor='Lose' resultClicked={() => {}}/>);
        const pLose = screen.getByTestId("Lose");
        expect(pLose).toBeInTheDocument();
    });

    it('should have p with text message', () => {
        render(<Result message='message' sentence='' restart={() => {}} classColor='' resultClicked={() => {}}/>);
        const pMessage = screen.getByText('message');
        expect(pMessage).toBeInTheDocument();
    });

    it('should have p with text sentence', () => {
        render(<Result message='' sentence='sentence' restart={() => {}} classColor='' resultClicked={() => {}}/>);
        const pSentence = screen.getByText('sentence');
        expect(pSentence).toBeInTheDocument();
    });
});