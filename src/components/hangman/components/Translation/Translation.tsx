import React, { Fragment, useContext } from 'react';
import classes from './Translation.module.scss';
import { X } from '../../../../../public/X';
import { Right } from '../../../../../public/Right';
import { BackdropContext, DefinitionsContext, SentenceContext } from '../../Hangman';

const Translation = () => {
    const { isBackdrop, setIsBackdrop } = useContext(BackdropContext)

    const dictionaryHref = 'https://dictionary.cambridge.org/dictionary/english/';
    const secondClassName = isBackdrop ? classes.visible : classes.hidden;
    const testId = isBackdrop ? 'translationVisible' : 'translationHidden';

    const { definitions, currentDefinition, setCurrentDefinition } = useContext(DefinitionsContext);
    const sentence = useContext(SentenceContext)

    const changeDefinitionHandler = () => {
        const definitionsNumber = definitions.length;
        const currentDefinitionIndex = definitions.indexOf(currentDefinition);
        const newDefinitionIndex = definitionsNumber - 1 !== currentDefinitionIndex ? currentDefinitionIndex + 1 : 0;
        setCurrentDefinition(definitions[newDefinitionIndex]);
    };

    const hideDefinitionsHandler = () => {
        setIsBackdrop(false);
      }

    const buttonNext = definitions.length > 1 ? (
        <div
            className={`${classes.IconWrapper}`}
            onClick={changeDefinitionHandler}
            data-testid="icon">
            <Right color="#d30cb8" />
        </div>
    ) : null;

    const definition = currentDefinition?.split(" ").map((word, index) => {
        return (
            <Fragment key={index}>
                <a
                    href={`${dictionaryHref}${word}`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="anchor">
                    {word}
                </a>
                <span>{" "}</span>
            </Fragment>
        );
    })

    return (
        <div className={`${classes.Translation} ${secondClassName}`} data-testid={testId}>
            <div className={classes.Sentence}>
                <a
                    href={`${dictionaryHref}${sentence}`}
                    target="_blank"
                    rel="noreferrer">
                    {sentence}
                </a>
            </div>
            <div className={classes.Definition}>
                {definition}
            </div>
            <div className={classes.Icons}>
                {buttonNext}
                <div
                    className={classes.IconWrapper}
                    onClick={hideDefinitionsHandler}
                    data-testid="icon">
                    <X color="#d30cb8" />
                </div>
            </div>
        </div>
    );
};

export default Translation;