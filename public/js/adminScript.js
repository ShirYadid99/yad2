
/**
 * Checks the HTTP response status and returns a promise
 * @param {Response} response - The HTTP response object
 * @returns {Promise} - A promise representing the response status
 */
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}
/**
 * Fetches ad data from the server and updates the DOM with the retrieved information.
 *
 * @returns {void}
 */

function initData() {
    document.getElementById('spinner').style.display = 'block';

    fetch('/admin/ads')
        .then(status)
        .then(response => response.json()) // Parse response as JSON
        .then(function(data) {
            // console.log('Request succeeded with JSON response', data);
            // Get a reference to the product list container
            const adsList = document.getElementById('ads-list');
            // Create HTML for each product item
            let adsHTML = '';
            data.forEach((item, index) => {
                // Add a new row for every third card
                if (index % 3 === 0) {
                    adsHTML += '<div class="row">';
                }

                // Add card HTML
                adsHTML += `
            <div class="col-md-4 mb-4">
              <div class="card" data-ad-delete="${item.id}">
              <img src="photos/secondHandLogo.png" class="card-img-top" alt="Card Logo">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-text">Price: ₪${item.price}</p>
                  <p class="card-text">Phone: ${item.phone}</p>
                  <p class="card-text">Email: ${item.email}</p>
                  <button class="btn btn-outline-success" data-ad-approve="${item.id}" >Approve</button>
                  <button class="btn btn-outline-danger" data-ad-delete="${item.id}" >Delete</button>
                </div>
              </div>
            </div>
          `;

                // Close the row for every third card or at the end of the loop
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    adsHTML += '</div>';
                }
            });


            document.getElementById('spinner').style.display = 'none';
            // Set the innerHTML of the product list container
            adsList.innerHTML = adsHTML;

            let deleteButtons = document.querySelectorAll('.btn.btn-outline-danger');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => onDeleteClick(button.dataset.adDelete));
            });

            let approveButtons = document.querySelectorAll('.btn.btn-outline-success');
            approveButtons.forEach(button => {
                button.addEventListener('click', () => onApproveClick(button.dataset.adApprove));
            });
        })
        .catch(function(error) {
        console.log('Request failed', error);
    });


}

/**
 * Event handler for approving an ad.
 *
 * @param {string} adId - The ID of the ad to be approved.
 * @returns {void}
 */

const onApproveClick = (adId) => {
    const url = `/admin/ads/${adId}`;
    console.log('Approving ad with ID:', adId);
    console.log('URL:', url);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ approved: true })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to approve ad');
            }
            console.log('Ad approved successfully');
            // Optionally, update the card's appearance in the DOM
        })
        .catch(error => {
            console.error('Error approving ad:', error);
            // Handle errors
        });
}



/**
 * Event handler for deleting an ad.
 *
 * @param {string} adId - The ID of the ad to be deleted.
 * @returns {void}
 */

// Function to handle delete button click
const onDeleteClick = (adId) => {
    const url = `/admin/ads/${adId}`;
    console.log('Delete ad with ID:', adId);
    console.log('URL:', url);
    fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete ad');
            }
            // Delete the card from the DOM
            const card = document.querySelector(`[data-ad-delete="${adId}"]`);
            if (card) {
                card.parentElement.remove(); // Remove the parent element (col-md-4) of the card
            } else {
                console.warn('Card element not found');
            }

        })
        .catch(error => {
            console.error('Error deleting ad:', error);
            // Handle errors
        });
}



/**
 * Event listener for DOMContentLoaded event.
 *
 * @param {Event} event - The DOMContentLoaded event object.
 * @returns {void}
 */
window.addEventListener('DOMContentLoaded', (event) => {
   initData()
})