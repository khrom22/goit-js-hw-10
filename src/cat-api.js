
const url = 'https://api.thecatapi.com/v1';
const api_key = 'live_N2F8xsOZtD9KsLdU2Yckvce8eRQ1LFQC7iBF0BlCHsWOA0HA6YB8r1SsSCIpn7Ba';

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};

export function fetchIdBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};