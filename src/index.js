import { fetchBreeds, fetchIdBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import './styles.css';


const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;

loader.style.display = 'block';
divCatInfo.style.display = 'none';
error.style.display = 'none';
selector.style.display = 'none'
let arrBreedsId = [{ text: 'Select a breed', value: '' }];


fetchBreeds()

    .then(data => {

        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
        });

        selector.style.display = 'flex'
        new SlimSelect({
            select: selector,
            data: arrBreedsId
        });

    })
    .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.style.display = 'block';
    divCatInfo.style.display = 'none';
    error.style.display = 'none';
    const breedId = event.currentTarget.value;
    fetchIdBreed(breedId)
        .then(data => {
            loader.style.display = 'none';

            if (breedId === '') {
                divCatInfo.style.display = 'none';
                loader.style.display = 'none';
            }
            else {
                const { url, breeds } = data[0];

                divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
                divCatInfo.style.display = 'flex';
            }
        })

        .catch(onFetchError);
};

function onFetchError(error) {
    selector.style.display = 'none'
    loader.style.display = 'none';
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    });
};