import React from 'react'

import styles from '@/styles/index.css?inline'
import Box from '@/components/Box'

const App = () => {
    return (
        <>
            <style>{styles.toString()}</style>
            <div className="h-32 w-full bg-red-700">
                <Box />
            </div>
        </>
    )
}

export default App
