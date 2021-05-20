import React, { useContext } from  'react'
import { User, TimeAgo, Text } from '../- Joint Components -/AllJointComponents';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/StoryComment.css'

export function StoryComment(props) {

    const {
        id,
        user,
        time,
        text,
        collapsedComments,
        expandCollapseComment,
        repliesCount
    } = props;

    const { darkTheme } = useContext(DarkThemeContext);

    const isCollapsed = collapsedComments.includes(id);

    return (
        <article className={`story-comment ${darkTheme ? 'story-comment-dark' : ''}`}>
            <div className={`story-comment-top-wrap ${darkTheme ? 'story-comm-top-wrap-dark' : ''}`}>
                <User user={user} />&nbsp;
                <TimeAgo time={time}/>&ensp;
                <p 
                    className={`comment-exp-collapse ${darkTheme ? 'exp-collapse-dark' : ''}`}
                    onClick={expandCollapseComment}
                >
                    {isCollapsed ? `[${repliesCount} more]` : `[ - ]`}
                </p>
            </div>
            { isCollapsed ? null
              : <div className={`story-comment-bot-wrap ${darkTheme ? 'story-comm-bot-wrap-dark' : ''}`}>
                    <Text text={text} />
                </div>
            }
        </article>
    )
}
