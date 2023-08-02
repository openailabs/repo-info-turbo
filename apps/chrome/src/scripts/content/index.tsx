import { log } from "console";
import React, { useEffect } from "react";
import features from "@/feature-manager";
import elementReady from "element-ready";
import ReactDOM, { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

const featureId = features.getFeatureID(import.meta.url);

const isProduction: boolean = process.env.NODE_ENV === "production";
const ROOT_ID = "RENAME_ME_IF_YOU_WANT";

const PortalComponent = ({ container }: { container: Element }) => {
  return ReactDOM.createPortal(<App />, container);
};

async function applyFeature() {
  console.log("2. applyFeature.");
  const payload = { args: { owner: "LTopx", repo: "L-GPT" } };

  // const projectDetails: any = await getProjectDetails(payload);
  // const summary: any = await getSummary(payload);

  if (document.querySelector(".FSSSSSS_XXXX")) {
    console.log("已存在");
    return;
  }

  await elementReady('div[data-testid="results-list"]');

  const searchResults: any = document.querySelectorAll(
    'div[data-testid="results-list"] > div',
  );
  if (searchResults) {
    searchResults.forEach((result: any) => {
      let lastChild = result.lastElementChild;
      lastChild.style.borderBottomLeftRadius = "0px";
      lastChild.style.borderBottomRightRadius = "0px";

      const newDiv = document.createElement("div");
      newDiv.className = "FSSSSSS_XXXX";
      newDiv.style.borderColor = "rgb(208, 215, 222)";
      newDiv.style.borderWidth = "0px 1px 1px";
      newDiv.style.borderStyle = "solid";
      newDiv.style.borderBottomLeftRadius = "6px";
      newDiv.style.borderBottomRightRadius = "6px";
      result.appendChild(newDiv);

      ReactDOM.render(
        <>
          {/* <style>{styles.toString()}</style> */}
          <PortalComponent container={newDiv} />
        </>,
        newDiv,
      );
    });
    // } else {
    //   console.log('No element found.');
  }
}

function observeDOMChanges() {
  const targetNode = document.querySelector('div[data-testid="results-list"]');
  // console.log(targetNode)
  if (!targetNode) return;

  const config = { childList: true, subtree: true };

  const callback = async (mutationsList: any) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // applyFeature();
        await applyFeature();
        // setTimeout(async () => {
        //   console.log("Apply feature 2.");
        //   await applyFeature();
        // }, 1000);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

const init = async (): Promise<void> => {
  await applyFeature();
  // observeDOMChanges();
};

features.add(featureId, {
  include: [() => true],
  awaitDomReady: true,
  init,
  restore: () => {
    console.log("Restored.");
  },
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "urlChanged") {
    console.log("1. URL changed.");
    init();
  }
});
