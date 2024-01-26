import React, {Fragment} from 'react';
import classes from './Translation.module.scss';
import { X } from '../../../../../public/X';
import { Right } from '../../../../../public/Right';

const Translation = (props: {
    show: boolean,
    change: () => void,
    definition: string,
    definitionsNumber: number,
    sentence: string,
    hide: () => void
}) => {
    const dictionaryHref = 'https://dictionary.cambridge.org/dictionary/english/';
    const secondClassName = props.show ? classes.visible : classes.hidden;
    const testId = props.show ? 'translationVisible' : 'translationHidden';

    const buttonNext = props.definitionsNumber > 1 ? (
        <div 
            className={`${classes.IconWrapper}`}
            onClick={props.change}
            data-testid="icon">
            <Right color="#d30cb8" />
        </div>
    ) : null;

    const definition = props.definition?.split(" ").map((word, index) => {
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
                    href={`${dictionaryHref}${props.sentence}`} 
                    target="_blank"
                    rel="noreferrer">
                    {props.sentence}
                </a>
            </div>
            <div className={classes.Definition}>
                {definition}
            </div>
            <div className={classes.Icons}>
                {buttonNext}
                <div 
                    className={classes.IconWrapper} 
                    onClick={props.hide}
                    data-testid="icon">
                        <X color="#d30cb8" />
                </div>
            </div>
        </div>
    );
};

export default Translation;