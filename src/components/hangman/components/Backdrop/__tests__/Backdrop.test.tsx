import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backdrop from '../Backdrop';
import { BackdropContext } from '@/components/hangman/Hangman';


describe('Backdrop', () => {
    it('should have div with test-id backdrop-visible', () => {
        render(
            <BackdropContext.Provider value={{ isBackdrop: true, setIsBackdrop: () => { } }}>
                <Backdrop />
            </BackdropContext.Provider>);
        const divBackdropVisible = screen.getByTestId("backdrop-visible");
        expect(divBackdropVisible).toBeInTheDocument();
    });
    it('should have div with test-id backdrop-hidden', () => {
        render(
            <BackdropContext.Provider value={{ isBackdrop: false, setIsBackdrop: () => { } }}>
                <Backdrop />
            </BackdropContext.Provider>
        );
        const divBackdropHidden = screen.getByTestId("backdrop-hidden");
        expect(divBackdropHidden).toBeInTheDocument();
    });
});