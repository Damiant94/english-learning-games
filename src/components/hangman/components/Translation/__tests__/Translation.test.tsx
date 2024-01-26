import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Translation from '../Translation';


describe('Translation', () => {
    it('should have div with class .Translation.visible', () => {
        const { container } = render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const divTranslationVisible = container.querySelector(".Translation.visible");
        expect(divTranslationVisible).toBeInTheDocument();
    });

    it('should have div with class .Translation.hidden', () => {
        const { container } = render(
            <Translation
                show={false}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );     
        const divTranslationHidden = container.querySelector(".Translation.hidden");
        expect(divTranslationHidden).toBeInTheDocument();
    });

    it('should have 4 anchors in .Definition container', () => {
        const { container } = render(
            <Translation
                show={true}
                change={() => { }}
                definition='one two three four'
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const anchors = container.querySelectorAll(".Definition a");
        expect(anchors.length).toBe(4);
    });

    it('should have 1 div with class .IconWrapper', () => {
        const { container } = render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={1}
                sentence=''
                hide={() => { }} />
        );
        const divsIconWrapper = container.querySelectorAll("div.IconWrapper");
        expect(divsIconWrapper.length).toBe(1);
    });

    it('should have 2 divs with class .IconWrapper', () => {
        const { container } = render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const divsIconWrapper = container.querySelectorAll("div.IconWrapper");
        expect(divsIconWrapper.length).toBe(2);
    });

    it('should have anchor with sentence', () => {
        render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence='sentence'
                hide={() => { }} />
        );
        const aSentence = screen.getByText('sentence');
        expect(aSentence).toBeInTheDocument();
    });
});