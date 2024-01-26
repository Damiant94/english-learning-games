import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backdrop from '../Backdrop';


describe('Backdrop', () => {
    it('should have div with class .Backdrop.visible', () => {
        const { container } = render(<Backdrop show={true}/>);
        const divBackdropVisible = container.querySelector(".Backdrop.visible");
        expect(divBackdropVisible).toBeInTheDocument();
    });
    it('should have div with class .Backdrop.hidden', () => {
        const { container } = render(<Backdrop show={false}/>);
        const divBackdropHidden = container.querySelector(".Backdrop.hidden");
        expect(divBackdropHidden).toBeInTheDocument();
    });
});