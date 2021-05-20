import React, { useState, useEffect } from "react";
import { StoriesList } from "./StoriesList";
import { Pagination } from "./Pagination";
import { FakeStoriesList } from "../- Placeholder Components -/FakeStoriesList";
import { StoryComments } from "./StoryComments";
import { getStories } from "../../Api Calls/apiCalls";
import { usePreventSetStateOnUnmount } from "../../Hooks/usePreventSetStateOnUnmount";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./Styles/Stories.css";

export function Stories({ storiesApiName }) {
  const { path } = useRouteMatch();

  const initialStoriesData = { status: "isLoading" };

  const [storiesData, setStoriesData] = useState(initialStoriesData);

  const [pageNum, setPageNum] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [storiesPerPage, setStoriesPerPage] = useState(10);

  const [midBtnsArr, setMidBtnsArr] = useState([]);

  const initialBtnsArr = (storiesCount) => {
    const pagesCount = Math.ceil(storiesCount / storiesPerPage);
    if (pagesCount < 8)
      return Array.from({ length: pagesCount }, (v, i) => i + 1);
    return Array.from({ length: 5 }, (v, i) => i + 2);
  };

  const handleSelectPageNum = (num) => {
    setPageNum(num);
  };

  const handleMidBtnsArr = (array) => {
    setMidBtnsArr(array);
  };

  const { isMounted, abortController, abortSignal } =
    usePreventSetStateOnUnmount();

  useEffect(() => {
    setStoriesData(initialStoriesData);
    getStories(storiesApiName, abortSignal, pageNum, storiesPerPage).then(
      (res) =>
        isMounted.current &&
        (setStoriesData(res),
        midBtnsArr.length < 1 &&
          setMidBtnsArr(initialBtnsArr(res.storiesCount)))
    );
    window.scrollTo(0, 0);
    // If a user quickly clicks on a paginate button and then some nav link:
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, storiesApiName]);

  const { storiesArr, storiesCount, status } = storiesData;

  return (
    <section className="stories_with_comments">
      {
        {
          isLoading: (
            <React.Fragment>
              <FakeStoriesList />
            </React.Fragment>
          ),
          error: (
            <p className="error">
              Network error. Refresh the browser, or try again later.
            </p>
          ),
          isLoaded: (
            <Switch>
              <Route exact path={path}>
                <React.Fragment>
                  <StoriesList
                    storiesArr={storiesArr}
                    pageNum={pageNum}
                    storiesPerPage={storiesPerPage}
                  />
                  <Pagination
                    pageNum={pageNum}
                    storiesCount={storiesCount}
                    handleSelectPageNum={handleSelectPageNum}
                    midBtnsArr={midBtnsArr}
                    handleMidBtnsArr={handleMidBtnsArr}
                    storiesPerPage={storiesPerPage}
                  />
                </React.Fragment>
              </Route>
              <Route path={`${path}/comments_on_:StoryId`}>
                <StoryComments />
              </Route>
              <Route path="*">
                <h2>Invalid URL!</h2>
              </Route>
            </Switch>
          ),
        }[status]
      }
    </section>
  );
}
