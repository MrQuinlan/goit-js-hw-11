import cardTemplate from '../templates/card.hbs';

export default function renderCards(container, dataToRender) {
  container.insertAdjacentHTML('beforeend', cardTemplate(dataToRender));
}
