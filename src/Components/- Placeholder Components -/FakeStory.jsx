import React, { useContext } from 'react';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/FakeStory.css';


export function FakeStory() {

    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <article className={`fake-story ${darkTheme ? 'dark-story' : ''}`}>
            <div className={`fake-story-top ${darkTheme ? 'fake-top-dark' : ''}`}></div>
            <div className={`fake-story-bottom ${darkTheme ? 'fake-bot-dark' : ''}`}></div>
        </article>
    )
}
