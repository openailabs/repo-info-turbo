// import * as pageDetect from 'github-url-detection';
import elementReady from "element-ready";
import $ from "jquery";

const getRepo = async (result: any) => {
  // another selector that also works
  // const repoLabel = $('strong[itemprop="name"]').siblings('span.Label.Label--secondary').text();
  // console.log(result);
  await elementReady("div.search-title > div > a > span");
  // console.log($("div.search-title > div > a > span"));

  const resultLength = result.childNodes.querySelector(
    "div.search-title > div > a > span",
  );
  console.log("getRepo result: ", resultLength.textContent);
  return (
    // pageDetect.isRepo() &&
    // (repoLabel === 'Public' || repoLabel === 'Public template')
    resultLength.textContent
  );
};
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

export default getRepo;
