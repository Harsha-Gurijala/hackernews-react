/* Async function to get items (comments and stories have unique ids,
which we put in this api call, and then get them back from server): */
export const getItem = async (itemID, abortSignal) => {
    const fetchItem = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`,
        {signal: abortSignal}
    );
    const item = await fetchItem.json();
    return item;
};

// Async function to get all top stories or new stories id's in array:
export const getStoriesIDs = async (storiesApiName, abortSignal) =>  {
    const fetchStoriesIDs = await fetch(
        `https://hacker-news.firebaseio.com/v0/${storiesApiName}.json?print=pretty`,
        {signal: abortSignal}
    );
    const storiesIDsArray = await fetchStoriesIDs.json();
    return storiesIDsArray;
}


export const getStory = async storyID => {
    try {
        const fetchedStory = await getItem(storyID);
        const storyObj = {
            status: 'storyLoaded',
            story: fetchedStory,
            comments: []
        }
        return storyObj;
    }

    catch(err) {
        return {status: 'error'}
    }
};


export const getStories = async (storiesApiName, abortSignal, pageNum, storiesPerPage) => {
    try {
        const storiesIDsArr = await getStoriesIDs(storiesApiName, abortSignal);
        const storiesToNum = pageNum * storiesPerPage;
        const storiesFromNum = storiesToNum - storiesPerPage;
        const getSlicedStories = storiesIDsArr.slice(
            storiesFromNum, storiesToNum).map(async storyID =>
                await getItem(storyID, abortSignal)
        );
        //Let array of promises be only one promise:
        const allStories = await Promise.all(getSlicedStories);
        //Eliminate null or undefined values from array:
        const existingStories = allStories.filter(story => story);
        const storiesObject = {
            status: 'isLoaded', 
            storiesCount: storiesIDsArr.length, 
            storiesArr: existingStories
        };
        return storiesObject;
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'};
    }
};


export const getStoryComments = async (storyKids, abortSignal) => {
    try {
        if (!storyKids || storyKids === []) return [];
        const fetchAllComments = storyKids.map(async commentID => {
            const comment = await getItem(commentID, abortSignal);
            if (!comment) return null;
            //Do a recursion to get all deeply nested comments (replies):
            const comments = await getStoryComments(comment.kids, abortSignal);
            const commentObj = {
                ...comment,
                comments: comments
            };
            return commentObj;
        })
        const allCommentsResult = await Promise.all(fetchAllComments);
        //Filter out all badly formatted or unexisting comments:
        const filteredComments = allCommentsResult.filter(comment => 
            comment && !comment.dead && !comment.deleted
        );
        return filteredComments;
    }

    catch(err) {
        return {status: 'error'};
    }
};


/*Alike previous function, we use this async function for getting all
of the comments, but this time unnested in one big flat array: */
const getCommentsArray = async (storyKids, moreComments, abortSignal) => {
    try {
        if (storyKids === undefined || storyKids === [])
            return [];
        /* We need to slice the kids because they contain unknow number of
        nested comments, which could be a very big number! */
        const fetchComments = storyKids.slice(moreComments[0], moreComments[1])
            .map(async commentID => {
                const comment = await getItem(commentID, abortSignal);
                return comment;
            }
        );
        const comments = await Promise.all(fetchComments);
        const commentsWithKids = comments.filter(commentObj =>
             commentObj && commentObj.kids);
        const getNestedComments = commentsWithKids.map(async comm =>
             await getCommentsArray(comm.kids, moreComments, abortSignal)
        );
        const nestedComments = await Promise.all(getNestedComments);
        const allComments = comments.concat(nestedComments);
        const allCommentsInFlatArray = allComments.flat().filter(comment =>
             comment && !comment.deleted && !comment.dead
        );
        return allCommentsInFlatArray;
    }
    catch (err) {
        return 'error';
    }
}

export const getCommentsWithStories = async (moreComments, abortSignal) =>  {
    try {
        //By fetching the first Api (topstories) we get an array of story id's:        
        const allStoriesIds = await getStoriesIDs('topstories', abortSignal);
        const slicedStoriesIds = allStoriesIds.slice(0, 20);
        /* We need to map that array, and put every single maped value in our
        next Api from which we then get an array of promises 
        (for every single story - one promise): */
        const getStorObjectsArr = slicedStoriesIds.map(async id => 
            await getItem(id, abortSignal)
        );
        /* Then we wrap them all together with Promise.all object method,
        and finally we get a single promise as an array of objects (stories):*/
        const allStorObjectsArr = await Promise.all(getStorObjectsArr);
        // Filter out unwanted values and stories without comments (kids):
        const storObjectsWithKids = allStorObjectsArr.filter(res => 
            res && res.kids
        );
        if (!storObjectsWithKids || storObjectsWithKids === 'error') return {status: 'error'}
        // Then we use the function above to get all of comments in one array: 
        const getAllComments = storObjectsWithKids.map(async story => {
            return await getCommentsArray(story.kids, moreComments, abortSignal);
        });
        /* Again we need to make the array of promises be only one promise
         with array inside of it: */
        const allCommentsDeepArr = await Promise.all(getAllComments);
        /* We concat two arrays so that we can use the recursion to get the title
        of the story, whose given comment belongs to: */
        const allDataArray = storObjectsWithKids.concat(allCommentsDeepArr);
        // Flatten the array, and filter out unwanted values (comments):
        const allDataClean = allDataArray.flat().filter(comment => !comment?.deleted);
        // Sort the data array by time:
        const timeSortedAllData = allDataClean.sort((a, b) => (b.time - a.time));
        return {
            status: 'isLoaded',
            commentsAndStories: timeSortedAllData
        }
    }
    catch (err) {
        return {status: 'error'};
    }
}