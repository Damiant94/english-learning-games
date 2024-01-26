import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Translation from '../Translation';


describe('Translation', () => {
    it('should have div with test-id translationVisible', () => {
        render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const divTranslationVisible = screen.getByTestId("translationVisible");
        expect(divTranslationVisible).toBeInTheDocument();
    });

    it('should have div with class .Translation.hidden', () => {
        render(
            <Translation
                show={false}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );     
        const divTranslationHidden = screen.getByTestId("translationHidden");
        expect(divTranslationHidden).toBeInTheDocument();
    });

    it('should have 4 anchors with test id anchor', () => {
        render(
            <Translation
                show={true}
                change={() => { }}
                definition='one two three four'
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const anchors = screen.getAllByTestId("anchor");
        expect(anchors.length).toBe(4);
    });

    it('should have 1 div with class .IconWrapper', () => {
        render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={1}
                sentence=''
                hide={() => { }} />
        );
        const divsIconWrapper = screen.getAllByTestId("icon");
        expect(divsIconWrapper.length).toBe(1);
    });

    it('should have 2 divs with class .IconWrapper', () => {
        render(
            <Translation
                show={true}
                change={() => { }}
                definition=''
                definitionsNumber={2}
                sentence=''
                hide={() => { }} />
        );
        const divsIconWrapper = screen.getAllByTestId("icon");
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