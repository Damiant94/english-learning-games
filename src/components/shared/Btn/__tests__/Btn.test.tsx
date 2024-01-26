import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Btn from '../Btn';


describe('Btn', () => {

    it('should have div with class .Btn', () => {
        const { container } = render(
            <Btn text='' clickHandle={() => {}}/>
        );
        const divBtn = container.querySelector(".Btn");
        expect(divBtn).toBeInTheDocument();
    });

    it('should have div with text "text"', () => {
        render(
            <Btn text='text' clickHandle={() => {}}/>
        );
        const divBtn = screen.getByText('text');
        expect(divBtn).toBeInTheDocument();
    });
});