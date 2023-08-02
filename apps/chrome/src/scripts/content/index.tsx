import React from "react";
import features from "@/feature-manager";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

const featureId = features.getFeatureID(import.meta.url);

const isProduction: boolean = process.env.NODE_ENV === "production";
const ROOT_ID = "RENAME_ME_IF_YOU_WANT";

const injectReact = async (rootId: string) => {
  try {
    // if (document.querySelector('.FSSSSSS_XXXX')) return
    const container = document.createElement("div");
    document.body.appendChild(container);
    if (container) {
      container.id = rootId;
      // container.className = 'FSSSSSS_XXXX'
      container.style.position = "inherit";
      container.style.zIndex = "2147483666";
    }

    if (isProduction) {
      console.log("Production mode 🚀. Adding Shadow DOM");
      container.attachShadow({ mode: "open" });
    } else {
      console.log("Development mode 🛠");
    }

    const target: ShadowRoot | HTMLElement = isProduction
      ? container.shadowRoot!
      : container;

    const root = createRoot(target!);
    const targetElements = Array.from(
      document.querySelectorAll('div[data-testid="results-list"] > div'),
    );

    root.render(
      <React.StrictMode>
        <>
          {targetElements.map((element, index) =>
            createPortal(<App key={index} />, element),
          )}
        </>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Error Injecting React", error);
  }
};
// setTimeout(async () => {
//     await injectReact(ROOT_ID)
// }, 1000)
// injectReact(ROOT_ID)

const init = async (): Promise<void> => {
  console.log("Preparing initial...");
  // await injectReact(ROOT_ID)
  setTimeout(async () => {
    await injectReact(ROOT_ID);
  }, 200);

  //   observeDOMChanges();
};

features.add(featureId, {
  include: [() => true],
  awaitDomReady: false,
  init,
});
