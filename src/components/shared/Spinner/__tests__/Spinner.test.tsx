import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../Spinner';


describe('Spinner', () => {

    it('should have div with class .Loader', () => {
        const { container } = render(<Spinner />);
        const divSpinner = container.querySelector(".Loader");
        expect(divSpinner).toBeInTheDocument();
    });
});