const container = document.getElementById('container');
const offlineMessage = document.getElementById('offline');
const noDataMessage = document.getElementById('no-data');
const dataSavedMessage = document.getElementById('data-saved');
const saveErrorMessage = document.getElementById('save-error');
const addEventButton = document.getElementById('add-event-button');

addEventButton.addEventListener('click', addAndPostEvent);

Notification.requestPermission();

const dbPromise = createIndexedDB();

loadContentNetworkFirst();

function loadContentNetworkFirst() {
  getServerData() // get server data
  .then(dataFromNetwork => {
    updateUI(dataFromNetwork); // display server data on page
    saveEventDataLocally(dataFromNetwork) // update local copy of data in IDB
    .then(() => {
      setLastUpdated(new Date()); // mark when the local data was last updated
      messageDataSaved(); // alert user that data has been saved locally
    }).catch(err => {
      messageSaveError(); // alert user that there was an error saving data
      console.warn(err);
    });
  }).catch(err => { // if we can't connect to the server...
    console.log('Network requests have failed, this is expected if offline');
    getLocalEventData() // attempt to get local data from IDB
    .then(offlineData => {
      if (!offlineData.length) { // alert user if there is no local data
        messageNoData(); // alert user that no local data is available
      } else {
        messageOffline(); // alert user that we are using local data (possibly outdated)
        updateUI(offlineData); // display local data on page
      }
    });
  });
}

/* Network functions */

function getServerData() {
  return fetch('api/getAll').then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

function addAndPostEvent(e) {
  e.preventDefault();
  const data = {
    id: Date.now(),
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    city: document.getElementById('city').value,
    note: document.getElementById('note').value
  };
  updateUI([data]);
  saveEventDataLocally([data]);
  const headers = new Headers({'Content-Type': 'application/json'});
  const body = JSON.stringify(data);
  return fetch('api/add', {
    method: 'POST',
    headers: headers,
    body: body
  });
}

/* UI functions */

function updateUI(events) {
  events.forEach(event => {
    const eventItem = document.createElement('li');
    const table = document.createElement('table');
    const tableContent = [
      `<tr>`,
        `<td class="label">Title:</td>`,
        `<td>${event.title}</td>`,
      `</tr>`,
      `<tr>`,
        `<td class="label">Date:</td>`,
        `<td>${event.date}</td>`,
      `</tr>`,
      `<tr>`,
        `<td class="label">City:</td>`,
        `<td>${event.city}</td>`,
      `</tr>`,
      `<tr>`,
        `<td class="label">Note:</td>`,
        `<td>${event.note}</td>`,
      `</tr>`
    ].join('\n');
    table.innerHTML = tableContent;
    eventItem.appendChild(table);
    container.appendChild(eventItem);
  });
}

function messageOffline() {
  // alert user that data may not be current
  const lastUpdated = getLastUpdated();
  if (lastUpdated) {
    offlineMessage.textContent += ' Last fetched server data: ' + lastUpdated;
  }
  offlineMessage.style.display = 'block';
}

function messageNoData() {
  // alert user that there is no data available
  noDataMessage.style.display = 'block';
}

function messageDataSaved() {
  // alert user that data has been saved for offline
  const lastUpdated = getLastUpdated();
  if (lastUpdated) {dataSavedMessage.textContent += ' on ' + lastUpdated;}
  dataSavedMessage.style.display = 'block';
}

function messageSaveError() {
  // alert user that data couldn't be saved offline
  saveErrorMessage.style.display = 'block';
}

/* Storage functions */

function getLastUpdated() {
  return localStorage.getItem('lastUpdated');
}

function setLastUpdated(date) {
  localStorage.setItem('lastUpdated', date);
}

function createIndexedDB() {
  if (!('indexedDB' in window)) {return null;}
  return idb.open('dashboardr', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('events')) {
      const eventsOS = upgradeDb.createObjectStore('events', {keyPath: 'id'});
    }
  });
}

function saveEventDataLocally(events) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('events', 'readwrite');
    const store = tx.objectStore('events');
    return Promise.all(events.map(event => store.put(event)))
    .catch(() => {
      tx.abort();
      throw Error('Events were not added to the store');
    });
  });
}

function getLocalEventData() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('events', 'readonly');
    const store = tx.objectStore('events');
    return store.getAll();
  });
}
