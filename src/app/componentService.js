import sayName from './alertService';

const component = () => {
  const element = document.createElement('div');
  element.className = 'say-name';
  element.style.color = '#fff';

  element.innerHTML = sayName('Marshall');
  // value of the function when called
  return element;
};

const render = () => {
  document.body.appendChild(component());
};

export { component, render };