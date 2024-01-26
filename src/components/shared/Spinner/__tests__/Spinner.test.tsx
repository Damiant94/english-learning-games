import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../Spinner';


describe('Spinner', () => {

    it('should have div with test-id loader', () => {
        render(<Spinner />);
        const divSpinner = screen.getByTestId("loader");
        expect(divSpinner).toBeInTheDocument();
    });
});