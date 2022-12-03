let allTheColors = [];
let animationDuration = 2500; //ms

const createCard = (
color = '#0022ff',
name = 'Toxic Blue') =>
{
  const $wrap = document.createElement('a');
  $wrap.setAttribute('href', `https://parrot.color.pizza/color/${color.substring(1)}/%E2%9D%A4`);
  $wrap.setAttribute('target', '_blank');

  const $head = document.createElement('header');
  const $color = document.createElement('div');

  const $colorName = document.createElement('h2');
  const $colorValue = document.createElement('var');

  $colorName.classList.add('color__name');

  if (name.length > 20) {
    $colorName.classList.add('color__name--verylong');
  } else if (name.length > 14) {
    $colorName.classList.add('color__name--long');
  }


  $colorValue.classList.add('color__value');
  $colorValue.textContent = color;
  $colorName.innerHTML = name.split('').map((c, i) => `<i class="${c == c.toUpperCase() && c.match(/[A-Z]/) ? 'heavy' : ''}" style="--i: ${i / name.length};">${c}</i>`).join('');

  $wrap.classList.add('color');
  $head.classList.add('color__bottom');
  $color.classList.add('color__swatch');

  $head.appendChild($colorName);
  $head.appendChild($colorValue);

  [$head, $color].forEach($el => $wrap.appendChild($el));

  $wrap.style.setProperty('--color', color);
  $wrap.style.setProperty('--rnd', -1 + Math.random() * 2);
  $wrap.style.setProperty('--rnd2', -1 + Math.random() * 2);
  $wrap.style.setProperty('--rnd3', -1 + Math.random() * 2);
  $wrap.style.setProperty('--rnd4', -1 + Math.random() * 2);

  return $wrap;
};

const $wrap = document.querySelector('[data-wrap]');

const addRandomCard = colorList => {
  const l = colorList.length;
  const index = Math.floor(Math.random() * colorList.length);
  const { name, hex } = colorList[index];
  const $card = createCard(hex, name);

  $wrap.appendChild(
  $card);


  setTimeout(() => {
    $card.classList.add('remove');
    setTimeout(() => {
      $card.remove();
    }, 1000);
  }, animationDuration * 10);
};

fetch('https://api.color.pizza/v1/?goodnamesonly=true').
then(d => d.json()).
then(data => {
  allTheColors = data;
  addRandomCard(data.colors);
  setInterval(() =>
  addRandomCard(data.colors),
  animationDuration);

});