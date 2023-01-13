
// import {ApiServ} from "./galleryAPI";
// import createCard from ``;
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// new SimpleLightbox(`.card a`, {
//     `captions`:true,
//     `captionsData`:`alt`,

// }

// )
console.log(555);

import {getGallery} from "./galleryAPI";

const refs = {
    formEl: document.querySelector('#search-form'),
    listEl: document.querySelector('.gallery'),
}
refs.formEl.addEventListener('submit', onSearch);



async function onSearch(e) {
    e.preventDefault();
   
    
    
    value = e.target.elements.searchQuery.value;
    console.log(value);
    
   // getGallery(value).then(data => console.log(data.data.hits));
    //console.log(getGallery);
    clearContainer();
    try {
        const card = await getGallery(value).then(res => {
           // console.log(data.data.hits);
            renderCard(res.data.hits);
        })
        
        
    } catch (error) {
       // console.log("error")
    }
      
    
    
    // console.log(galleryApi);
    // if (galleryApi.value === '')
    //     return console.log("Sorry, there are no images matching your search query. Please try again.") 
}

function renderCard(hits) {
    const markup = hits.map((({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" data-src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
            
    })).join('');
    refs.listEl.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
    refs.listEl.innerHTML = ''; 
    
}
function checkSpaces(string) {
  return string.trim() !== '';
}