import React from 'react';

const Popup = () => {
  return (
    <div className="inline-flex h-44 w-96 flex-col justify-between rounded-xl border border-zinc-800 bg-neutral-900 p-8 shadow">
      <div className="inline-flex items-start justify-center gap-4">
        <div className="inline-flex flex-col items-start justify-start gap-1">
          <div className="text-base font-semibold leading-none text-neutral-50">
            beautiful-web-extensions
          </div>
          <div className="inline-flex items-start justify-start pr-2.5">
            <div className="text-sm font-normal leading-tight text-zinc-400">
              Beautifully designed web extensions built with Radix UI and
              Tailwind CSS.
            </div>
          </div>
        </div>
        <div className="min-w-fit justify-center rounded-md bg-zinc-800 px-8">
          <div className="inline-flex items-center justify-start self-stretch rounded-md bg-zinc-800 px-2 py-2 shadow">
            <div className="flex items-center justify-center text-center text-sm font-medium leading-tight text-neutral-50">
              Star
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-start justify-start gap-4">
        <div className="text-sm font-normal leading-tight text-zinc-400">
          TypeScript
        </div>
        <div className="flex items-center justify-start gap-1">
          <div className="text-sm font-normal leading-tight text-zinc-400">
            20k
          </div>
        </div>
        <div className="text-sm font-normal leading-tight text-zinc-400">
          Updated April 2023
        </div>
      </div>
    </div>
  );
};

export default Popup;
