import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import {getGallery} from "./galleryAPI";

const refs = {
    formElem: document.querySelector('#search-form'),
    listElem: document.querySelector('.gallery'),
    moreBtn: document.querySelector(`.more`)
}
refs.formElem.addEventListener('submit', inSearch);
refs.moreBtn.addEventListener('submit', inMoreLoad);

let value = "";
let currentPage = 1;
let currentPer_page = 40;

function inSearch(e) {
    e.preventDefault();
       value = e.target.elements.searchQuery.value;
    // console.log(value);
    
    refs.moreBtn.style.visibility = "visible";
    currentPage = 1;
     e.target.reset(); 
     clearContainer();
     getCard(value);

}
async function getCard(value) {
  try {
       const res = await getGallery(value, currentPage)
        //    console.log(res.data.hits);
        //  console.log(res.data.totalHits);

         if (res.data.hits.length > 0 && checkSpaces(value)) {
           renderCard(res.data.hits);
           Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
           return res;
         } else {
           throw new Error('404');
         }

   } 
   catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
console.log(error);
 }
 return {}
}

function inMoreLoad() {
 currentPage += 1;

 getCard(value).then((res) => {
   console.log(res);
   let total_pages = res.data.totalHits / currentPer_page;

     if (currentPage >= total_pages) {
     refs.moreBtn.style.visibility = "hidden";
     Notify.failure("We're sorry, but you've reached the end of search results.");
   }
 })
}
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    // alert('At the bottom!');
    inMoreLoad();
  }
});
   
    function renderCard(hits) {
      const markup = hits.map((({ webformatURL, largeImageURL,
         tags, likes, views, comments, downloads }) => {
          return `<div class="photo-card">
          <a class="gallery__item" href="${largeImageURL}"></a>
    <img src="${webformatURL}" data-src="${largeImageURL}" 
    alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views:</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments:</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b> ${downloads}
      </p>
    </div>
    </div>`
  
      })).join('');
  
      refs.listElem.insertAdjacentHTML('beforeend', markup);
      let gallery = new SimpleLightbox('.gallery a');
      gallery.refresh();
      onScrollDocument(); 
    } 
    
  

function clearContainer() {
  refs.listElem.innerHTML = ''; 
  
}
function checkSpaces(string) {
return string.trim() !== '';
}
function onScrollDocument(e) {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
  }); 
}