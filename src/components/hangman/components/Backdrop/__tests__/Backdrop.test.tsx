import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backdrop from '../Backdrop';


describe('Backdrop', () => {
    it('should have div with test-id backdrop-visible', () => {
        render(<Backdrop show={true}/>);
        const divBackdropVisible = screen.getByTestId("backdrop-visible");
        expect(divBackdropVisible).toBeInTheDocument();
    });
    it('should have div with test-id backdrop-hidden', () => {
        render(<Backdrop show={false}/>);
        const divBackdropHidden = screen.getByTestId("backdrop-hidden");
        expect(divBackdropHidden).toBeInTheDocument();
    });
});