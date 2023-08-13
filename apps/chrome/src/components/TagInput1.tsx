import update from 'immutability-helper';
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WithContext as ReactTags } from 'react-tag-input';

const suggestions = [
    { id: 'abc', text: 'abc' },
    { id: 'def', text: 'def' },
].map((country) => {
    return {
        id: country,
        text: country,
    };
});

const KeyCodes = {
    comma: 188,
    enter: 13,
    tab: 9,
    period: 190,
    slash: 191,
};

const delimiters = [
    KeyCodes.comma,
    KeyCodes.enter,
    KeyCodes.tab,
    KeyCodes.period,
    KeyCodes.slash,
];

const Type = 'tag';
const Tag = ({ tag, index, moveTag, findTag, onDelete }) => {
    const originalIndex = findTag(tag.id).index;
    const [, drag] = useDrag(() => ({
        type: Type,
        item: { id: tag.id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: Type,
        hover(item: any) {
            if (item.id !== tag.id) {
                const { index: overIndex } = findTag(tag.id);
                moveTag(item.id, overIndex);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isDragging = canDrop && isOver;

    return (
        <div
            className={`py-1.5 px-3 flex items-center justify-between rounded-full mr-2 mb-2 transition-all duration-300 ${
                isDragging ? 'opacity-60 ' : ''
            } ${tag.className}`}
            ref={(node) => drag(drop(node))}
            style={{
                transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            }}
        >
            <span className="text-white">{tag.text}</span>
            <span
                className="cursor-pointer p-0 ml-1 text-white"
                onClick={() => onDelete(index)}
            >
                ×
            </span>
        </div>
    );
};

function getRandomGradient() {
    const colors = [
        'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600',
        'bg-gradient-to-r from-yellow-500 via-purple-200 to-indigo-500',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomColor() {
    const colors = [
        'bg-red-600',
        'bg-red-700',
        'bg-red-800',
        'bg-red-900',
        'bg-yellow-400',
        'bg-yellow-500',
        'bg-yellow-600',
        'bg-yellow-700',
        'bg-yellow-800',
        'bg-yellow-900',
        'bg-green-700',
        'bg-green-800',
        'bg-blue-500',
        'bg-blue-600',
        'bg-blue-700',
        'bg-blue-800',
        'bg-indigo-600',
        'bg-indigo-700',
        'bg-indigo-800',
        'bg-indigo-900',
        'bg-purple-500',
        'bg-purple-600',
        'bg-purple-700',
        'bg-purple-800',
        'bg-purple-900',
        'bg-pink-600',
        'bg-pink-700',
        'bg-pink-800',
        'bg-pink-900',
        'bg-orange-600',
        'bg-orange-700',
        'bg-orange-800',
        'bg-orange-900',
        'bg-lime-600',
        'bg-lime-700',
        'bg-lime-800',
        'bg-lime-900',
        'bg-fuchsia-600',
        'bg-fuchsia-700',
        'bg-fuchsia-800',
        'bg-fuchsia-900',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

function TagInput() {
    // const [tags, setTags] = useState([
    //     { id: 'Thailand', text: 'Thailand', className: getRandomColor() },
    //     { id: 'India', text: 'India', className: getRandomColor() },
    //     { id: 'Vietnam', text: 'Vietnam', className: getRandomColor() },
    //     { id: 'Turkey', text: 'Turkey', className: getRandomColor() },
    //     {
    //         id: 'UnitedStates',
    //         text: 'United States',
    //         className: getRandomColor(),
    //     },
    //     { id: 'Mexico', text: 'Mexico', className: getRandomColor() },
    //     { id: 'Canada', text: 'Canada', className: getRandomColor() },
    //     {
    //         id: 'SouthKorea',
    //         text: 'South Korea',
    //         className: getRandomColor(),
    //     },
    //     { id: 'Japan', text: 'Japan', className: getRandomColor() },
    //     { id: 'France', text: 'France', className: getRandomColor() },
    //     { id: 'Germany', text: 'Germany', className: getRandomColor() },
    //     {
    //         id: 'UnitedKingdom',
    //         text: 'United Kingdom',
    //         className: getRandomColor(),
    //     },
    //     { id: 'Spain', text: 'Spain', className: getRandomColor() },
    //     { id: 'Brazil', text: 'Brazil', className: getRandomColor() },
    //     { id: 'Argentina', text: 'Argentina', className: getRandomColor() },
    //     { id: 'Australia', text: 'Australia', className: getRandomColor() },
    //     {
    //         id: 'NewZealand',
    //         text: 'New Zealand',
    //         className: getRandomColor(),
    //     },
    //     {
    //         id: 'SouthAfrica',
    //         text: 'South Africa',
    //         className: getRandomColor(),
    //     },
    //     { id: 'Nigeria', text: 'Nigeria', className: getRandomColor() },
    //     { id: 'Egypt', text: 'Egypt', className: getRandomColor() },
    //     { id: 'Indonesia', text: 'Indonesia', className: getRandomColor() },
    //     { id: 'Malaysia', text: 'Malaysia', className: getRandomColor() },
    //     { id: 'Singapore', text: 'Singapore', className: getRandomColor() },
    //     {
    //         id: 'Philippines',
    //         text: 'Philippines',
    //         className: getRandomColor(),
    //     },
    // ]);

    const [tags, setTags] = useState([
        { id: 'React', text: 'React', className: getRandomColor() },
        { id: 'Angular', text: 'Angular', className: getRandomColor() },
        { id: 'Vue', text: 'Vue.js', className: getRandomColor() },
        { id: 'Flutter', text: 'Flutter', className: getRandomColor() },
        { id: 'Django', text: 'Django', className: getRandomColor() },
        { id: 'Flask', text: 'Flask', className: getRandomColor() },
        { id: 'Laravel', text: 'Laravel', className: getRandomColor() },
        { id: 'Rails', text: 'Ruby on Rails', className: getRandomColor() },
        { id: 'Express', text: 'Express.js', className: getRandomColor() },
        { id: 'SpringBoot', text: 'Spring Boot', className: getRandomColor() },
        { id: 'ASPNET', text: 'ASP.NET', className: getRandomColor() },
        { id: 'Node', text: 'Node.js', className: getRandomColor() },
        { id: 'Tensorflow', text: 'TensorFlow', className: getRandomColor() },
        { id: 'PyTorch', text: 'PyTorch', className: getRandomColor() },
        { id: 'Unity', text: 'Unity3D', className: getRandomColor() },
        { id: 'Unreal', text: 'Unreal Engine', className: getRandomColor() },
        { id: 'Xamarin', text: 'Xamarin', className: getRandomColor() },
        { id: 'Electron', text: 'Electron', className: getRandomColor() },
        { id: 'Kafka', text: 'Apache Kafka', className: getRandomColor() },
        { id: 'Docker', text: 'Docker', className: getRandomColor() },
    ]);

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAddition = (tag) => {
        if (!tags.find((t) => t.text === tag.text)) {
            tag.className = getRandomColor();
            setTags([...tags, tag]);
        }
    };

    const moveTag = (id, atIndex) => {
        const { tag, index } = findTag(id);
        setTags(
            update(tags, {
                $splice: [
                    [index, 1],
                    [atIndex, 0, tag],
                ],
            })
        );
    };

    const findTag = (id) => {
        const tag = tags.filter((c) => `${c.id}` === id)[0];
        return {
            tag,
            index: tags.indexOf(tag),
        };
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-wrap p-3 focus:outline-none rounded w-full">
                {tags.map((tag, index) => (
                    <Tag
                        key={tag.id}
                        index={index}
                        tag={tag}
                        findTag={findTag}
                        moveTag={moveTag}
                        onDelete={handleDelete}
                    />
                ))}
                <ReactTags
                    tags={[]}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    delimiters={delimiters}
                    autofocus={false}
                    placeholder={'Add a new tag'}
                    // inline
                    allowUnique={true}
                    // autocomplete
                    inputFieldPosition="top"
                    classNames={{
                        tagInput:
                            'flex-grow flex-shrink self-stretch inline-flex flex-wrap gap-1',
                        tagInputField:
                            'border border-blue-300 focus:border-blue-400  rounded p-2 w-auto text-black',
                        suggestions:
                            'overflow-auto border border-blue-300 bg-white absolute py-2 rounded shadow-md max-h-32',
                        activeSuggestion: 'bg-blue-200',
                        tags: 'auto',
                        selected: 'text-white',
                        tag: 'hidden',
                        remove: '',
                    }}
                />
            </div>
        </DndProvider>
    );
}

export default TagInput;
