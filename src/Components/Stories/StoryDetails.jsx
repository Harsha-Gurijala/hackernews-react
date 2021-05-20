import React from 'react';
import {
    Title,
    WebsiteUrlShort,
    Score,
    User,
    TimeAgo
} from '../- Joint Components -/AllJointComponents';
import { handleLongUrl } from '../../Utilities/functions';
import './Styles/StoryDetails.css';

export function StoryDetails({ story, darkTheme }) {

    const {
        url,
        title,
        score,
        by,
        time
    } = story;

    const urlShort = handleLongUrl(url);

    return (
        <article className={`story-comm-details-box ${darkTheme ? 'details-box-dark' : ''}`}>
            <Title 
                storyUrl={url}
                title={title}
                darkTheme={darkTheme}
            />
            <WebsiteUrlShort 
                urlShort={urlShort}
                darkTheme={darkTheme}
            />
            <div className={`story-comm-details-bot-wrap ${darkTheme ? 'bot-wrap-dark' : ''}`}>
                <div>
                    <Score score={score}/>&ensp;|&ensp;
                    <User 
                        user={by}
                        byWord='by:'
                    />
                </div>
                <TimeAgo time={time}/>
            </div>
        </article>
    );
}
