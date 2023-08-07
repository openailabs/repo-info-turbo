// import * as pageDetect from 'github-url-detection';
import { Repo } from '@/types';
import elementReady from 'element-ready';
import $ from 'jquery';

const getRepo = (result: any): Repo => {
  const repoPattern = 'div.search-title > div > a > span';
  let owner: string;
  let name: string;
  const repoElement = result.querySelector(repoPattern);
  if (repoElement) {
    const value = repoElement.textContent;
    if (value.indexOf('/') > -1) {
      owner = value.substring(0, value.indexOf('/'));
      name = value.substring(value.indexOf('/') + 1);
      // console.log("Owner: %s Repo: %s", owner, name); // or do something else with the value
    } else {
      // console.log("Cound not found repo info.");
    }
  }
  return { owner: owner, name: name };
};
export default getRepo;
