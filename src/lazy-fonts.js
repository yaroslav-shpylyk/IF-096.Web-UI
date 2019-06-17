function addScript(url){
  let linkElem = document.createElement('link');
  let scriptElem = document.getElementsByTagName('script')[0];
  linkElem.rel = 'stylesheet';
  linkElem.href = url;
  scriptElem.parentNode.insertBefore(linkElem, scriptElem);
}
addScript('https://fonts.googleapis.com/icon?family=Material+Icons');
addScript('https://fonts.googleapis.com/css?family=Roboto');
