// const _ = require('lodash');
import '../../assets/css/index.css';
const icon = require('../../assets/images/logo360.png');
// import print from './print';
/**
 * 
 */
function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['11111111, hello', 'world !'], ' ');
  let Myicon = new Image();
  Myicon.src = icon;
  element.appendChild(Myicon);
  // element.onclick = print;

  return element;
}

console.log($(component()))
document.body.appendChild($(component())[0]);