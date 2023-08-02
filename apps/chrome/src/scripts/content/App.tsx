import React from "react";
import Box from "@/components/Box";
import styles from "@/styles/index.css?inline";

const App = () => {
  return (
    <>
      <style>{styles.toString()}</style>
      <div className="h-32 w-full bg-red-700">
        <Box />
      </div>
    </>
  );
};

export default App;
