import './base.scss';
import moment from 'moment';
import FetchService from './lab/data/fetch.data';

console.log('%c[github-integration].index - Tests with GitHub API.', 'color: #b8e5fa; background: #222; padding: 8px;');

/**
 * Content
 */

/** Save URL. */
const _wtf_ = 'https://api.github.com/repos/faelplg/web-development-researches/readme';
// const _engineering_ = 'https://api.github.com/repos/faelplg/web-development-researches/contents/engineering/README.md'
// const _deployment_ = 'https://api.github.com/repos/faelplg/web-development-researches/contents/engineering/deployment/README.md'

/**
 * Fetch services.
 */
const fetchService = new FetchService();

/** Manage time. */
let now = moment();

/**
 * WTF button
 */
const buttonWTF = document.getElementById('button-wtf');
buttonWTF.addEventListener("click", () => {
  let GitHubWTF = localStorage.getItem('github-wtf');
  let wtfDuration;
  let wtfHours;
  if (GitHubWTF) {
    let GitHubWTFStamp = moment(localStorage.getItem('github-wtf-stamp'));
    wtfDuration = moment.duration(now.diff(GitHubWTFStamp));
    wtfHours = wtfDuration.asHours();
  }
  if(!wtfDuration) {
    console.log('NEW ACCESS. FETCHING CONTENT.');
    fetchService.fetchUrl(_wtf_, 'github-wtf');
  } else {
    if (wtfHours < 1) {
      console.log('VALID CONTENT. REFRESHING');
      fetchService.refreshContent(GitHubWTF);
    } else {
      console.log('EXPIRED. FETCHING NEW CONTENT.');
      fetchService.fetchUrl(_wtf_, 'github-wtf');
    }
  }
});

/**
 * 3 - Software Engineering content
 */
// const cardEngineering = document.getElementById('card-engineering');
// cardEngineering.addEventListener("click", () => {
//   let GitHubEngineering = localStorage.getItem('GitHub-engineering');
//   let engineeringDuration;
//   let engineeringHours;
//   if (GitHubEngineering) {
//     let GitHubEngineeringStamp = moment(localStorage.getItem('GitHub-engineering-stamp'));
//     engineeringDuration = moment.duration(now.diff(GitHubEngineeringStamp));
//     engineeringHours = engineeringDuration.asHours();
//   }
//   if(!engineeringDuration) {
//     console.log('NEW ACCESS. FETCHING CONTENT.');
//     fetchService.fetchUrl(_engineering_, 'GitHub-engineering');
//   } else {
//     if (engineeringHours < 1) {
//       console.log('VALID CONTENT. REFRESHING');
//       fetchService.refreshContent(GitHubEngineering);
//     } else {
//       console.log('EXPIRED. FETCHING NEW CONTENT');
//       fetchService.fetchUrl(_engineering_, 'GitHub-engineering');
//     }
//   }
// });

/**
 * 3.1 - Software deployment content
 */
// const cardDeployment = document.getElementById('card-deployment');
// cardDeployment.addEventListener("click", () => {
//   let GitHubDeployment = localStorage.getItem('GitHub-deployment');
//   let deploymentDuration;
//   let deploymentHours;
//   if (GitHubDeployment) {
//     let GitHubDeploymentStamp = moment(localStorage.getItem('GitHub-deployment-stamp'));
//     deploymentDuration = moment.duration(now.diff(GitHubDeploymentStamp));
//     deploymentHours = deploymentDuration.asHours();
//   }
//   if(!deploymentDuration) {
//     console.log('NEW ACCESS. FETCHING CONTENT.');
//     fetchService.fetchUrl(_deployment_, 'GitHub-deployment');
//   } else {
//     if (deploymentHours < 1) {
//       console.log('VALID CONTENT. REFRESHING');
//       fetchService.refreshContent(GitHubDeployment);
//     } else {
//       console.log('EXPIRED. FETCHING NEW CONTENT');
//       fetchService.fetchUrl(_deployment_, 'GitHub-deployment');
//     }
//   }
// });
