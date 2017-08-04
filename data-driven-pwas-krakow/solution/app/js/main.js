let container = document.getElementById('dynamic-content-container');
let offlineMessage = document.getElementById('offline');
let noDataMessage = document.getElementById('no-data');
let dataSavedMessage = document.getElementById('data-saved');
let saveErrorMessage = document.getElementById('save-error');

const dbPromise = createIndexedDB();

getLocalChangeRequests() // get offline changes from IDB
.then(postChangeRequests) // push local updates to the server
.then(getServerData) // then get updated server data
.then(dataFromNetwork => {
  updateUI(dataFromNetwork); // display server data on page
  saveProjectsLocally(dataFromNetwork); // update local copy of data
}).catch(err => { // if we can't connect to the server...
  getLocalProjects() // attempt to get local data from IDB
  .then(offlineData => {
    if (!offlineData.length) { // alert user if there is no local data
      messageNoData();
    } else {
      messageOffline(); // alert user that we are using local data (possibly outdated)
      updateUI(offlineData); // display local data on page
    }
  });
});

/* Network functions */

function getServerData() {
  return fetch('api/data.json').then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

function postChangeRequests(localChangeRequests) {
  return Promise.all(
    localChangeRequests.map(changeRequest => {
      let url = changeRequest.url;
      let headers = new Headers({'Content-Type': 'application/json'});
      let body = JSON.stringify({id: changeRequest.id});
      return fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      }).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      });
    })
  );
}

/* UI functions */

function updateUI(projectsData) {
  let rows = '';
  projectsData.forEach(json => {
    let row = [
      '<tr>',
        '<td>' + 'Title' + '<td>',
        '<td>' + json.title + '<td>',
      '</tr>',
      '<tr>',
        '<td>' + 'City' + '<td>',
        '<td>' + json.city + '<td>',
      '</tr>',
    ].join('\n');
    rows += row;
  });
  let table = document.createElement('table');
  table.innerHTML = rows;
  container.appendChild(table);
}

function messageOffline() {
  // alert user that data may not be current
  offlineMessage.style.visibility = 'visible';
}

function messageNoData() {
  // alert user that there is no data available
  noDataMessage.style.visibility = 'visible';
}

function messageDataSaved() {
  // alert user that data has been saved for offline
  dataSavedMessage.style.visibility = 'visible';
}

function messageSaveError() {
  // alert user that data couldn't be saved offline
  saveErrorMessage.style.visibility = 'visible';
}

/* IndexedDB functions */

function createIndexedDB() {
  if (!('indexedDB' in window)) {return null;}
  return idb.open('dashboardr', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('projects')) {
      let projectsOS = upgradeDb.createObjectStore('projects', {keyPath: 'id'});
      projectsOS.createIndex('date', 'date');
      projectsOS.createIndex('city', 'city');
    }
    if (!upgradeDb.objectStoreNames.contains('localChanges')) {
      let localChangesOS = upgradeDb.createObjectStore('localChanges', {keyPath: 'id'});
    }
  });
}

function getLocalProjects() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    let tx = db.transaction('projects', 'readonly');
    let store = tx.objectStore('projects');
    return store.getAll();
  });
}

function saveProjectsLocally(projectsData) {
  if (!('indexedDB' in window)) {return null;}
  dbPromise.then(db => {
    let tx = db.transaction('projects', 'readwrite');
    let store = tx.objectStore('projects');
    projectsData.forEach(function(project) {
      store.put(project);
    });
    return tx.complete;
  }).then(() => {
    // TODO - still ran this even when PUT failed...
    messageDataSaved();
  }).catch(err => {
    messageSaveError();
    console.warn(err);
  });
}

function getLocalChangeRequests() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    let tx = db.transaction('localChanges', 'readonly');
    let store = tx.objectStore('localChanges');
    return store.getAll();
  });
}

function saveChangeRequestLocally(changeRequest) {
  if (!('indexedDB' in window)) {return null;}
  dbPromise.then(db => {
    let tx = db.transaction('localChanges', 'readwrite');
    let store = tx.objectStore('localChanges');
    console.log('Adding local change:', changeRequest.url, changeRequest.id);
    store.add(changeRequest);
    return tx.complete;
  }).then(() => {
    // TODO update UI
    console.log('Change saved for offline!');
  }).catch(err => {
    // could update UI here to inform user
    console.warn('Unable to save change offline!', err);
  });
}

// // for each card, add button w/ listener
// addEventListener('click', e => {
//   fetch('api/update/', {
//     method: 'POST',
//     body: JSON.stringify({
//       id: //get id from card,
//       notes: // get note input value
//     });
//   })
// });

// fetch('/api/update', {
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      method: 'POST',
//      body: JSON.stringify({
//        title: 'Opela',
//        notes: 'UPDATED NOTE!!!!!'
//      })
//    }).then(response => {
//      console.log(response);
//      return response.text();
//    }).then(text => {
//      console.log(text);
//    });

// TODO
// if (!('indexedDB' in window)) {
//   console.console.warn();('This browser doesn\'t support IndexedDB');
//   // update UI TODO
//   return;
// }
