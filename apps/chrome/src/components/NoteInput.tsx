import React, { useEffect, useState } from 'react';

const NoteInput = ({
    defaultValue,
    minRows,
    maxRows,
    onChange,
    placeholder,
    ...props
}) => {
    const [rows, setRows] = useState(minRows);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (defaultValue) {
            setCharCount(countChars(defaultValue));
        }
    }, [defaultValue]);

    const countChars = (text: string) => {
        return Array.from(text).length;
    };

    const handleInputChange = (e) => {
        const numRows = e.target.value.split('\n').length;
        const value = e.target.value;
        setRows(Math.min(Math.max(numRows, minRows), maxRows));
        setCharCount(countChars(value));
        onChange && onChange(value);
    };

    return (
        <div className="relative">
            <textarea
                {...props}
                value={defaultValue}
                onChange={handleInputChange}
                rows={rows}
                placeholder={placeholder}
                className="resize-none p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none w-full"
            />
            <div className="absolute text-xs text-gray-600 bottom-3 right-3">
                {charCount}
            </div>
        </div>
    );
};

export default NoteInput;
