import React from 'react'

import styles from '@/styles/index.css?inline'
import App from './App'
import isSearchResult from '@/helpers/is-search-result'
import elementReady from 'element-ready'
import { render, Container as ContainerType } from 'react-dom'

// import RepoInfo from '@/components/RepoInfo'
// import { AiSummaryResult, ProjectStructureProps } from '@/components/RepoInfo'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { sendMessageToBackground } from '@/utils/browser'
import features from '@/feature-manager'
import Container from '@/components/Container'

const featureId = features.getFeatureID(import.meta.url)

const isProduction: boolean = process.env.NODE_ENV === 'production'
const ROOT_ID = 'RENAME_ME_IF_YOU_WANT'
const queryClient = new QueryClient()

const renderTo = (
    container: ContainerType,
    owner: string,
    repo: string
    // structure: ProjectStructureProps,
    // summary: AiSummaryResult
) => {
    render(
        <>
            {<style>{styles.toString()}</style>}
            <QueryClientProvider client={queryClient}>
                <Container owner={owner} repo={repo} />
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
            {/* <RepoInfo
            structure={structure}
            summary={summary}
        /> */}
        </>,
        container
    )
}

const getRepoName = async (result: any) => {
    const repoPattern = 'div.search-title > div > a > span'
    let owner
    let repo
    const repoElement = result.querySelector(repoPattern)
    if (repoElement) {
        const value = repoElement.textContent
        if (value.indexOf('/') > -1) {
            owner = value.substring(0, value.indexOf('/'))
            repo = value.substring(value.indexOf('/') + 1)
            console.log('Owner: %s Repo: %s', owner, repo) // or do something else with the value
        } else {
            console.log('Cound not found repo info.')
        }
    }
    return { owner: owner, repo: repo }
}

export const applyFeature = async () => {
    try {
        if (document.querySelector('.FSSSSSS_XXXX')) return
        await elementReady('div[data-testid="results-list"]')

        const searchResults: any = document.querySelectorAll(
            'div[data-testid="results-list"] > div'
        )

        if (searchResults) {
            const repoPattern = 'div.search-title > div > a > span'

            for (let i = 0; i < searchResults.length; i++) {
                const result = searchResults[i]

                const repoPattern = 'div.search-title > div > a > span'

                let owner
                let repo

                const repoElement = result.querySelector(repoPattern)
                if (repoElement) {
                    const value = repoElement.textContent
                    if (value.indexOf('/') > -1) {
                        owner = value.substring(0, value.indexOf('/'))
                        repo = value.substring(value.indexOf('/') + 1)
                        console.log('Owner: %s Repo: %s', owner, repo) // or do something else with the value
                    } else {
                        console.log('Cound not found repo info.')
                    }
                }

                // searchResults.forEach((result: any, index: any) => {
                const newDiv = document.createElement('div')

                //get api result
                const payload = { args: { owner: owner, repo: repo } }
                const projectDetails: any = await sendMessageToBackground({
                    action: 'fetchProjectDetails',
                    payload
                })
                const summary: any = await sendMessageToBackground({
                    action: 'getSummary',
                    payload
                })

                let lastChild = result.lastElementChild

                lastChild.style.borderBottomLeftRadius = '0px'
                lastChild.style.borderBottomRightRadius = '0px'

                // 根据 lastChild 类型打印出相应的结果
                if (lastChild.tagName === 'A') {
                    // console.log('A')
                    newDiv.style.borderTop = '0px'
                } else if (lastChild.tagName === 'DIV') {
                    // console.log('DIV')
                    newDiv.style.borderTop = '1px'
                } else {
                    // console.log(lastChild.tagName)
                }

                newDiv.className = 'FSSSSSS_XXXX'
                newDiv.style.borderColor = 'rgb(208, 215, 222)'
                newDiv.style.borderWidth = '0px 1px 1px'
                newDiv.style.borderStyle = 'solid'
                newDiv.style.borderBottomLeftRadius = '6px'
                newDiv.style.borderBottomRightRadius = '6px'
                newDiv.style.height = '200px'
                newDiv.style.backgroundColor = 'pink'
                result.appendChild(newDiv)
                // renderTo(newDiv, projectDetails, summary)
                //renderTo(newDiv, owner, repo)
            }
        }

        // if(!isSearchResult){
        //     console.log("is not search result page")
        //     return
        // }

        // const container = document.createElement('div')
        // document.body.appendChild(container)

        // if (container) {
        //     container.id = rootId
        //     container.style.position = 'inherit'
        //     container.style.zIndex = '2147483666'
        // }

        // if (isProduction) {
        //     console.log('Production mode 🚀. Adding Shadow DOM')
        //     container.attachShadow({ mode: 'open' })
        // } else {
        //     console.log('Development mode 🛠')
        // }

        // const target: ShadowRoot | HTMLElement = isProduction ? container.shadowRoot! : container

        // const root = createRoot(target!)

        // root.render(
        //     <React.StrictMode>
        //         <>
        //             {isProduction && <style>{styles.toString()}</style>}
        //             <App />
        //         </>
        //     </React.StrictMode>
        // )
    } catch (error) {
        console.error('Error Injecting React', error)
    }
}

const init = async (): Promise<void> => {
    console.log('Preparing initial...')
    await applyFeature()

    // setTimeout(async () => {
    //     await applyFeature()
    // }, 1000)

    //   observeDOMChanges();
}

features.add(featureId, {
    include: [() => true],
    awaitDomReady: false,
    init
})
