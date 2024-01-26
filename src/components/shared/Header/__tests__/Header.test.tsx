import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';


describe('Header', () => {

    it('should have div with test-id header', () => {
        render(<Header text=''/>);
        const divHeader = screen.getByTestId("header");
        expect(divHeader).toBeInTheDocument();
    });

    it('should have div with text "text"', () => {
        render(<Header text='text'/>);
        const divHeader = screen.getByText('text');
        expect(divHeader).toBeInTheDocument();
    });
});