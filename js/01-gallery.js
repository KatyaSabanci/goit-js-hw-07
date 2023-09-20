import { galleryItems } from './gallery-items.js';

const photoElements = document.querySelector('.gallery');
const itemsMarkup = createPhotoMarkup(galleryItems);

function createPhotoMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}
photoElements.insertAdjacentHTML('beforeend', itemsMarkup);

photoElements.addEventListener('click', imgClick);

function imgClick(event) {
  event.preventDefault();

  const isImg = event.target.classList.contains('gallery__image');
  if (!isImg) return;

  const currentImg = event.target.dataset.source;

  const modal = basicLightbox.create(
    `
		<img src="${currentImg}" width="1060" height="auto"/>
        `,
    {
      onShow: modal => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: modal => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );
  modal.show();

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    modal.close();
  }
}
