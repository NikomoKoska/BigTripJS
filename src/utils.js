const Positions = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Создание DOM узла на основе разметки

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Отрисовка и удаление компонентов

const render = (container, element, place) => {
  switch (place) {
    case Positions.AFTERBEGIN:
      container.prepend(element);
      break;
    case Positions.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {Positions, createElement, render};
