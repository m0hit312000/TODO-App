const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('.input-area');
const add = document.querySelector('.add');
var i = 0;
let db;

window.onload = function()
{
  let request = window.indexedDB.open('notes_db', 1);

  request.onerror = function() {
    console.log('Database failed to open');
  };

  request.onsuccess = function()
  {
    console.log('Database opened successfully');
    db = request.result;
    displayData();
  };

  request.onupgradeneeded = function(e) 
  {
    let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });
    objectStore.createIndex('body', 'body', { unique: false });
    console.log('Database setup complete');
  };

  add.onclick = addData;
  

  function addData(e  )
  {
    e.preventDefault();
    let newItem = { body: input.value };
    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.add(newItem);
    request.onsuccess = function() {
      input.value = '';
    };
    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');
      displayData();
    };
    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    };
  }
  

  function displayData()
  {
    while(ul.firstChild)
    {
      ul.removeChild(ul.firstChild);
    }  
    let objectStore = db.transaction('notes_os').objectStore('notes_os');
    objectStore.openCursor().onsuccess = function(e) {
    let cursor = e.target.result;
    if(cursor)
    {
        if(i<=7)    
       {
        const li = document.createElement('li');
        const span = document.createElement('span'); 
        const button = document.createElement('button');
        button.setAttribute('class','remove');
        span.textContent = val;
        button.textContent = 'x';
        li.setAttribute('data-note-id', cursor.value.id);
        button.onclick = rem;
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
        input.value = '';
        input.focus();
        i++;
        cursor.continue();
       }
       else
       {
        alert(`Either Limit reached delete Some TODO's or NUll value entered`);
        input.value = '';
        i--;
       }
    } 
    else
    {
        if(!ul.firstChild) {
         const li = document.createElement('li');
         li.textContent = 'No notes stored.';
         ul.appendChild(li);
        }
        console.log('Notes all displayed');
    }
   };     
  }
    
  function rem(e) {
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.delete(noteId);
    transaction.oncomplete = function() {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log('Note ' + noteId + ' deleted.');
      if(!ul.firstChild) {
        let li = document.createElement('li');
        li.textContent = 'No notes stored.';
        ul.appendChild(li);
      }
    };
  }
}  