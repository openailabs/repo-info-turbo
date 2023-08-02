import { log } from "console";
import React, { useEffect } from "react";
import features from "@/feature-manager";
import isSearchResult from "@/helpers/is-search-result";
import { Repo } from "@/types";
import elementReady from "element-ready";
import ReactDOM, { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

const featureId = features.getFeatureID(import.meta.url);

const isProduction: boolean = process.env.NODE_ENV === "production";
const ROOT_ID = "RENAME_ME_IF_YOU_WANT";

// const applyFeature = async () => {
//   try {
//     if (document.querySelector(".FSSSSSS_XXXX")) return;
//     const container = document.createElement("div");
//     document.body.appendChild(container);
//     if (container) {
//       container.id = ROOT_ID;
//       container.className = "FSSSSSS_XXXX";
//       container.style.position = "inherit";
//       container.style.zIndex = "2147483666";
//     }

//     if (isProduction) {
//       console.log("Production mode 🚀. Adding Shadow DOM");
//       container.attachShadow({ mode: "open" });
//     } else {
//       console.log("Development mode 🛠");
//     }

//     const target: ShadowRoot | HTMLElement = isProduction
//       ? container.shadowRoot!
//       : container;

//     const root = createRoot(target!);
//     await elementReady('div[data-testid="results-list"]');
//     const searchResults = Array.from(
//       document.querySelectorAll('div[data-testid="results-list"] > div'),
//     );

//     root.render(
//       <React.StrictMode>
//         <>
//           {searchResults.map((element, index) =>
//             createPortal(<App key={index} />, element),
//           )}
//         </>
//       </React.StrictMode>,
//     );
//   } catch (error) {
//     console.error("Error Injecting React", error);
//   }
// };

const PortalComponent = ({
  container,
  owner,
  name,
}: {
  container: Element;
  owner: any;
  name: any;
}) => {
  return ReactDOM.createPortal(<App owner={owner} name={name} />, container);
};

const getRepo = (result: any): Repo => {
  const repoPattern = "div.search-title > div > a > span";
  let owner: string;
  let name: string;
  const repoElement = result.querySelector(repoPattern);
  if (repoElement) {
    const value = repoElement.textContent;
    if (value.indexOf("/") > -1) {
      owner = value.substring(0, value.indexOf("/"));
      name = value.substring(value.indexOf("/") + 1);
      // console.log("Owner: %s Repo: %s", owner, name); // or do something else with the value
    } else {
      // console.log("Cound not found repo info.");
    }
  }
  return { owner: owner, name: name };
};

async function applyFeature() {
  console.log("2. applyFeature.");

  const payload = { args: { owner: "LTopx", repo: "L-GPT" } };

  // const projectDetails: any = await getProjectDetails(payload);
  // const summary: any = await getSummary(payload);

  if (document.querySelector(".FSSSSSS_XXXX")) {
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
      // newDiv.style.borderColor = "rgb(208, 215, 222)";
      // newDiv.style.borderWidth = "0px 1px 1px";
      // newDiv.style.borderStyle = "solid";
      newDiv.style.borderBottomLeftRadius = "6px";
      newDiv.style.borderBottomRightRadius = "6px";

      result.appendChild(newDiv);

      const repo: Repo = getRepo(result);
      console.log("Owner: %s, Repo: %s", repo.owner, repo.name);
      ReactDOM.render(
        <>
          {/* <style>{styles.toString()}</style> */}
          <PortalComponent
            container={newDiv}
            owner={repo.owner}
            name={repo.name}
          />
          {/* ( return ReactDOM.createPortal(
          <App />, container); ) */}
          {/* createPortal(
          <App />, container) */}
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
  if (targetNode) {
    observer.observe(targetNode, config);
  }
}

const init = async (): Promise<void> => {
  let isSearchResultPage: boolean = await isSearchResult();
  if (!isSearchResultPage) {
    console.log("Not in search result page.");
    return;
  }

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
