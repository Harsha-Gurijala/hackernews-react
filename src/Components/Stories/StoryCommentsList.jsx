import React from 'react';
import { StoryComment } from './StoryComment';
import { nestedCommentsCount } from '../../Utilities/functions';
import './Styles/StoryCommentsList.css';

export function StoryCommentsList({ comments, expandCollapseComment, collapsedComments }) {
    

    return (
        <ul className={`story-comments-ul`}>
            {
                comments.map(comment => 
                    <li 
                        key={comment.id}
                        className={`story-comments-li`}
                    >
                        <StoryComment 
                            id={comment.id}
                            user={comment.by}
                            time={comment.time}
                            text={comment.text}
                            collapsedComments={collapsedComments}
                            expandCollapseComment={() => expandCollapseComment(comment.id)}
                            repliesCount={comment.comments.length + nestedCommentsCount(comment.comments, 0) + 1}
                        />
                        {
                            !collapsedComments.includes(comment.id) &&
                                <StoryCommentsList 
                                    comments={comment.comments}
                                    expandCollapseComment={expandCollapseComment}
                                    collapsedComments={collapsedComments}
                                />
                        }
                    </li>
                )
            }
        </ul>
    )
}
