import { log } from 'console';
import { useUpsertNote } from '@/hooks/note';
import React, { useState } from 'react';
import NoteInput from './NoteInput';
import TagInput from './TagInput';

const Note = ({ owner, repoName }) => {
    const defaultText = ``;
    const [text, setText] = useState(defaultText);

    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const note = JSON.stringify({
        tags: ['node.js', 'next.js', 'next-auth'],
        content: 'This is a good repo',
    });

    const { handleUpsertNote } = useUpsertNote({
        owner,
        repoName,
        note,
    });
    // 使用 useMutation 钩子更新数据
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
                <div className="m-2">
                    <div className="relative">
                        <TagInput />
                        {/* <input
                            className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter some tags"
                            // value={tags}
                            // onChange={() => {
                            //     console.log('tags: ', tags);
                            // }}
                        />
                        <div className="hidden">
                            <div className="absolute z-40 left-0 mt-2 w-full">
                                <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                                    <a className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">
                                        Add tag "
                                        <span
                                            className="font-semibold"
                                            x-text="textInput"
                                        ></span>
                                        "
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="relative mb-3">
                    <NoteInput
                        defaultValue={text}
                        minRows={5}
                        maxRows={12}
                        placeholder={'Write note here...'}
                        onChange={(value) => setText(value)}
                    />
                    {/* <textarea
                        // value={content}
                        // onChange={() => {
                        //     setContent;
                        // }}
                        className="peer block min-h-[auto]
                        w-full
                        rounded border-0 bg-transparent px-3

                        py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        placeholder="Your message"
                    ></textarea> */}
                    {/* <label
                        htmlFor="exampleFormControlTextarea1"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >
                        Notes
                    </label> */}
                </div>
                <div>
                    <button
                        onClick={handleUpsertNote}
                        className="z-50 m-0 inline-block h-10 w-40 rounded-sm bg-blue-600 text-sm text-white transition-colors ease-linear hover:bg-blue-800 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* <div>{loaded && JSON.stringify(summary)}</div> */}
        </div>
    );
};

export default Note;
