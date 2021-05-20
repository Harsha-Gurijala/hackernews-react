import React from 'react';
import { StoryDetails } from './StoryDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { CommentsCount, Text } from '../- Joint Components -/AllJointComponents';
import { FakeCommentsList } from '../- Placeholder Components -/FakeCommentsList';
import { useState } from 'react';

export function StoryCommentsAndDetails({ darkTheme, storyWithComments }) {

    const { story, comments } = storyWithComments;

    const [collapsedComments, setCollapsedComments] = useState([]);

    const expandCollapseComment = commentId => {
        if (collapsedComments.includes(commentId)) {
            const ejectComment = collapsedComments.filter(id =>
                id !== commentId
            );
        setCollapsedComments(ejectComment);
        }
        else {
            setCollapsedComments(prevCollComments => 
                [...prevCollComments, commentId]
            );
        }
    };

    const commentsLoaded = comments?.length > 0;

    return (
        <div className={`details-comments-wrap ${darkTheme ? 'details-comm-wrap-dark' : ''}`}>
            <StoryDetails 
                story={story}
                darkTheme={darkTheme}
            />
            {story.text &&
                <div className='details-comments-text'>
                    <Text text={story.text} />
                </div>
            }
            <CommentsCount 
                descendants={story.descendants} 
            />
            {commentsLoaded ?
                <StoryCommentsList 
                    comments={comments}
                    expandCollapseComment={expandCollapseComment}
                    collapsedComments={collapsedComments}
                />
              : <FakeCommentsList commentsCount={story.descendants} />
            }
        </div>
    )
}
