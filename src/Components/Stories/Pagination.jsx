import React from "react";
import "./Styles/Pagination.css";

export function Pagination({
  pageNum,
  storiesCount = 20,
  handleSelectPageNum,
  handleMidBtnsArr,
  midBtnsArr,
  storiesPerPage,
}) {
  const firstPageNum = 1;

  const lastPageNum = Math.ceil(storiesCount / storiesPerPage);

  const firstMidBtnNum = midBtnsArr[0];

  const lastMidBtnNum = midBtnsArr[midBtnsArr.length - 1];

  const midBtnsCount = midBtnsArr.length;

  const initialBtnsArr = Array.from({ length: midBtnsCount }, (v, i) => i + 2);

  const handleFirstPageNumSelect = () => {
    handleMidBtnsArr(initialBtnsArr);
    handleSelectPageNum(firstPageNum);
  };

  const handleLastPageNumSelect = () => {
    handleMidBtnsArr(
      Array.from(
        { length: midBtnsCount },
        (v, i) => i + (lastPageNum - midBtnsCount)
      )
    );
    handleSelectPageNum(lastPageNum);
  };

  const numToChangeMidBtnsArr =
    midBtnsCount % 2 === 0 ? midBtnsCount / 2 : (midBtnsCount - 1) / 2;
  const increaseMidBtnsArrValues = () => {
    if (lastMidBtnNum === lastPageNum - 1) return;
    const increasedArrValues = midBtnsArr.map(
      (num) => num + numToChangeMidBtnsArr
    );
    handleMidBtnsArr(increasedArrValues);
  };

  const decreaseMidBtnsArrValues = () => {
    if (firstMidBtnNum === firstPageNum + 1) return;
    const decreasedArrValues = midBtnsArr.map(
      (num) => num - numToChangeMidBtnsArr
    );
    handleMidBtnsArr(decreasedArrValues);
  };

  const handlePaginateBtnClick = (num, i, arr) => {
    if (num === pageNum) return;
    if (firstMidBtnNum !== 1) {
      if (i === 0) decreaseMidBtnsArrValues();
      if (i === arr.length - 1) increaseMidBtnsArrValues();
    }
    handleSelectPageNum(num);
  };

  const paginationBtns = midBtnsArr.map((num, i, arr) => (
    <li
      key={num}
      className={`pagin-numbers ${num === pageNum ? "pagin-num-selected" : ""}`}
      onClick={() => handlePaginateBtnClick(num, i, arr)}
    >
      {num}
    </li>
  ));

  const displayThreeDots = {
    onStart: firstMidBtnNum !== firstPageNum + 1,
    onEnd: lastMidBtnNum !== lastPageNum - 1,
  };

  const showFirstLastPageBtn = firstMidBtnNum > 1;

  return (
    <div className={`pagination`}>
      {showFirstLastPageBtn && (
        <React.Fragment>
          <p
            onClick={handleFirstPageNumSelect}
            className={`pagin-numbers ${
              pageNum === firstPageNum ? "pagin-num-selected" : ""
            }`}
          >
            {firstPageNum}
          </p>
          {displayThreeDots.onStart && <p className="three-dots">...</p>}
        </React.Fragment>
      )}
      <ol className="pagination-ol">{paginationBtns}</ol>
      {showFirstLastPageBtn && (
        <React.Fragment>
          {displayThreeDots.onEnd && <p className="three-dots">...</p>}
          <p
            onClick={handleLastPageNumSelect}
            className={`pagin-numbers ${
              pageNum === lastPageNum ? "pagin-num-selected" : ""
            }`}
          >
            {lastPageNum}
          </p>
        </React.Fragment>
      )}
    </div>
  );
}
