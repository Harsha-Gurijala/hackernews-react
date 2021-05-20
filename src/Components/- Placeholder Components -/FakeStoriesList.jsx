import React from "react";
import { FakeStory } from "./FakeStory";

export function FakeStoriesList() {
  //Create an arbitary array of thirty values
  const fakeStoriesArr = Array.from({ length: 10 }, (v, i) => i);

  const fakeStoriesList = fakeStoriesArr.map((num) => (
    <li key={num}>
      <FakeStory />
    </li>
  ));

  return <ul className="fake-stories-ul">{fakeStoriesList}</ul>;
}
