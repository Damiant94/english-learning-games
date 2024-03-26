import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Translation from '../Translation';
import { BackdropContext, DefinitionsContext, SentenceContext } from '@/components/hangman/Hangman';


describe('Translation', () => {
    it('should have div with test-id translationVisible', () => {
        render(
            <BackdropContext.Provider value={{ isBackdrop: true, setIsBackdrop: () => { } }}>
                <DefinitionsContext.Provider value={{ definitions: [], currentDefinition: "", setCurrentDefinition: () => { } }}>
                    <Translation />
                </DefinitionsContext.Provider>
            </BackdropContext.Provider>
        );
        const divTranslationVisible = screen.getByTestId("translationVisible");
        expect(divTranslationVisible).toBeInTheDocument();
    });

    it('should have div with class .Translation.hidden', () => {
        render(
            <DefinitionsContext.Provider value={{ definitions: [], currentDefinition: "", setCurrentDefinition: () => { } }}>
                <Translation/>
            </DefinitionsContext.Provider>
        );
        const divTranslationHidden = screen.getByTestId("translationHidden");
        expect(divTranslationHidden).toBeInTheDocument();
    });

    it('should have 4 anchors with test id anchor', () => {
        render(
            <SentenceContext.Provider value={[""]}>
                <DefinitionsContext.Provider value={{ definitions: [""], currentDefinition: "word1 word2 word3, word4", setCurrentDefinition: () => { } }}>
                    <Translation/>
                </DefinitionsContext.Provider>
            </SentenceContext.Provider>
        );
        const anchors = screen.getAllByTestId("anchor");
        expect(anchors.length).toBe(4);
    });

    it('should have 1 div with class .IconWrapper', () => {
        render(
            <SentenceContext.Provider value={[""]}>
                <DefinitionsContext.Provider value={{ definitions: [], currentDefinition: "", setCurrentDefinition: () => { } }}>
                    <Translation/>
                </DefinitionsContext.Provider>
            </SentenceContext.Provider>
        );
        const divsIconWrapper = screen.getAllByTestId("icon");
        expect(divsIconWrapper.length).toBe(1);
    });

    it('should have 2 divs with class .IconWrapper', () => {
        render(
            <SentenceContext.Provider value={[""]}>
                <DefinitionsContext.Provider value={{ definitions: ["a", "b"], currentDefinition: "", setCurrentDefinition: () => { } }}>
                    <Translation/>
                </DefinitionsContext.Provider>
            </SentenceContext.Provider>
        );
        const divsIconWrapper = screen.getAllByTestId("icon");
        expect(divsIconWrapper.length).toBe(2);
    });

    it('should have anchor with sentence', () => {
        render(
            <SentenceContext.Provider value={["w", "o", "r", "d"]}>
                <DefinitionsContext.Provider value={{ definitions: [], currentDefinition: "", setCurrentDefinition: () => { } }}>
                    <Translation/>
                </DefinitionsContext.Provider>
            </SentenceContext.Provider>
        );
        const aSentence = screen.getByText('word');
        expect(aSentence).toBeInTheDocument();
    });
});