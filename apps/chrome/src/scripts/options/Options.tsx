import React from 'react';

const Options = () => {
    return (
        <div className="flex flex-col gap-2">
            <input
                className="bg-gothamBlack-800 placeholder-shown:border-gothamBlack-400 inline-flex h-24 w-96 items-center justify-between rounded-md border border-zinc-900 py-2 pl-8 pr-14 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Doug"
            />
            <input
                className="bg-gothamBlack-800 placeholder-shown:border-gothamBlack-400 inline-flex h-24 w-96 items-center justify-between rounded-md border border-zinc-900 py-2 pl-8 pr-14 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Silkstone"
            />
            <input
                className="bg-gothamBlack-800 placeholder-shown:border-gothamBlack-400 inline-flex h-24 w-96 items-center justify-between rounded-md border border-zinc-900 py-2 pl-8 pr-14 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="you@example.com"
            />
        </div>
    );
};

export default Options;
