import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Letter from '../Letter';


describe('Letter', () => {
    it('should have btn with test-id letter', () => {
        render(<Letter value='a' onClick={() => {}}/>);
        const buttonLetter = screen.getByTestId("letter");
        expect(buttonLetter).toBeInTheDocument();
    });

    it('should have btn with text "A"', () => {
        render(<Letter value='A' onClick={() => {}}/>);
        const buttonLetterA = screen.getByText('A');
        expect(buttonLetterA).toBeInTheDocument();
    });

    it('should be disabled after click', async () => {
        render(<Letter value='A' onClick={clickedLetter => {
            clickedLetter!.disabled = true;
        }}/>);
        const buttonLetterA = screen.getByText('A');
        await userEvent.click(buttonLetterA);
        expect(buttonLetterA).toBeDisabled();
    });
});