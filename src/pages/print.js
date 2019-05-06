import '../../assets/css/print.css';

let str = _.merge({}, {
  name: 'huangjin',
  age: 57
})

const element = document.createElement('div');
element.innerHTML = str.name;

document.body.appendChild(element);