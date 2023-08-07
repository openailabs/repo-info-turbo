import React from 'react';
import { useSaveOrUpdateNote } from '@/hooks/note';

const Note = ({ owner, repoName }) => {
  // useSaveOrUpdateNote({
  //   owner,
  //   repoName,
  // });
  return (
    <div className="w-full">
      <div className="h-30 w-full">
        {/* <button
          disabled={loading || loaded}
          onClick={handleSummaryClick}
          className="z-50 m-0 inline-block h-10 w-full rounded-sm bg-pink-600 text-sm text-white transition-colors ease-linear hover:bg-pink-800 disabled:cursor-not-allowed"
        >
          Get Summary
        </button> */}
        <label>Tags: </label>
        <select>
          <option>node.js</option>
          <option>react</option>
          <option>angular</option>
          <option>vue3</option>
          <option>vue2</option>
          <option>next.js</option>
        </select>

        <label>Note: </label>
        <textarea></textarea>
      </div>
      {/* <div>{loaded && JSON.stringify(summary)}</div> */}
    </div>
  );
};

export default Note;
