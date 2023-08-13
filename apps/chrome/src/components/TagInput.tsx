import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import payload from './repo.json';

const KeyCodes = {
    comma: 188,
};

const delimiters = [KeyCodes.comma];

type Tag = {
    id: string;
    text: string;
};

const TagInput = ({ savedTags, setNewTags }) => {
    const [tags, setTags] = React.useState([]);
    useEffect(() => {
        const transformedTags =
            savedTags &&
            tags.map((tag) => ({
                id: Math.random().toString(36),
                text: tag,
            }));
        setTags(transformedTags);
    }, [savedTags]);
    useEffect(() => {
        setNewTags(tags);
    }, [tags]);

    const handleDelete = (i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: { id: string; text: string }) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    return (
        <div>
            <div>
                <ReactTags
                    classNames={{
                        tags: 'flex flex-col gap-4 relative',
                        tagInputField:
                            'min-h-[32px] w-[220px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        // tagInputField:
                        //  "focus:outline-none border rounded border-gray-300 placeholder:text-gray-500 placeholder:text-sm focus:border-gray-500 rounded p-2 focus:ring-0",
                        tag: 'text-blue-500 flex items-center font-medium border border-blue-500 rounded-md px-2 text-blue-500 text-sm',
                        selected: 'rounded-md p-2 flex gap-2 flex-wrap',
                        remove: 'ml-2 text-blue-400 font-thin',
                    }}
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    inputFieldPosition="bottom"
                    autocomplete
                />
            </div>
        </div>
    );
};

export default TagInput;
