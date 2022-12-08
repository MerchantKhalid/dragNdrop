const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let UpdatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let currentColumn;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
  listArrays= [backlogListArray,progressListArray,completeListArray,onHoldListArray ];
  const arrayNames=['backlog','progress','complete','onHold'];
  arrayNames.forEach((arrayName,i)=>{
    localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[i]));
  });
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  console.log('columnEl:', columnEl);
  console.log('column:', column);
  console.log('item:', item);
  console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent=item;
  listEl.draggable= true;
  listEl.setAttribute('ondragstart','drag(event)');

  //append
  columnEl.appendChild(listEl)

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!UpdatedOnLoad){
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent='';
  backlogListArray.forEach((backlogItem,i)=>{
    createItemEl(backlogList,0,backlogItem,i);
  });

  // Progress Column
  progressList.textContent='';
  progressListArray.forEach((progressItem,i)=>{
    createItemEl(progressList,0,progressItem,i);
  });

  // Complete Column
  completeList.textContent='';
  completeListArray.forEach((completeItem,i)=>{
    createItemEl(completeList,0,completeItem,i);
  });

  // On Hold Column
  onHoldList.textContent='';
  onHoldListArray.forEach((onHoldItem,i)=>{
    createItemEl(onHoldList,0,onHoldItem,i);
  });

  // Run getSavedColumns only once, Update Local Storage


}

//when items start dragging
function drag(e){
  draggedItem = e.target;
}

//Column allows for item to drop
function allowDrop(e){
  e.preventDefault();

}
//When items enter the column area
function dragEnter(column){
  listColumns[column].classList.add('over')
  currentColumn= column
}

//Dropping item in column
function drop(e){
  e.preventDefault();
  //Remove Background color / padding
  listColumns.forEach((column)=>{
    column.classList.remove('over');
  });
  //add item to column
   const parent= listColumns[currentColumn];
   parent.appendChild(draggedItem)

}


//on Load
updateDOM();
 
