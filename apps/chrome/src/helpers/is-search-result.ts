import $ from 'jquery';
import * as pageDetect from 'github-url-detection';
import elementReady from 'element-ready';


const isSearchResult=async ()=>{
  // another selector that also works
  // const repoLabel = $('strong[itemprop="name"]').siblings('span.Label.Label--secondary').text();
  await elementReady('div[data-testid="results-list"]');
  const resultLength = $('div[data-testid="results-list"] > div').length
    console.log("Result length: ",resultLength)
  return (
    // pageDetect.isRepo() &&
    // (repoLabel === 'Public' || repoLabel === 'Public template')
    resultLength>0
  );
}
// // check if the repository is public
// export default async function isSearchResult() {
//   // another selector that also works
//   // const repoLabel = $('strong[itemprop="name"]').siblings('span.Label.Label--secondary').text();
//   await elementReady('div[data-testid="results-list"] > *');
//   const resultLength = $('div[data-testid="results-list"] > div').length
//     console.log("Result length: ",resultLength)
//   return (
//     // pageDetect.isRepo() &&
//     // (repoLabel === 'Public' || repoLabel === 'Public template')
//     resultLength>0
//   );
// }

export default { isSearchResult };