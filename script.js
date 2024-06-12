// Updated script

// Class data
// name, material cost, and duration of class
// is32wk: is 32 week
const studentCount = 8;

const colors = ['red','green','#0000df','yellow','pink','orange','teal','purple'];

var prevID = 0;
var classes = [
  {name:'Acting I',mc:15,len:1},
  {name:'Advanced Chorus',mc:0,len:1},
  {name:'Algebra II',mc:0,len:1,is32wk:true},
  {name:'Apologetics',mc:0,len:1,is32wk:true},//IS32WK?
  {name:'Art I',mc:25,len:1},
  {name:'Art II',mc:25,len:1},
  {name:'Art III',mc:30,len:1.5},
  {name:'Beginner Guitar',mc:0,len:1},
  {name:'Beginner Orchestra',mc:0,len:1},
  {name:'Beginner Piano',mc:0,len:1},
  {name:'Beginner Spanish',mc:0,len:1},
  {name:'Books Children Love',mc:0,len:1},
  {name:'Chess Club 5A & 5B',mc:0,len:0.5},
  {name:'Chess Club 6',mc:0,len:0.5},
  {name:'Coding for Microcontrollers 3,4,6 (10)',mc:0,len:1},
  {name:'Cursive & U.S. Geography 1 & 3',mc:0,len:1},
  {name:'Earth Science',mc:30,len:1},
  {name:'ELEM Theatre Art I',mc:0,len:1},
  {name:'Elementary Chorus',mc:0,len:0.5},
  {name:'Family Style Cooking 2 & 3',mc:60,len:1},
  {name:'Geological Wonders 1, 5,& 6',mc:0,len:1},
  {name:'How Things Work',mc:0,len:1,is32wk:true},
  {name:'HS Creative Writing',mc:0,len:1,is32wk:true},
  {name:'HS Industrial Arts',mc:50,len:1.5,is32wk:true},
  {name:'IEW A Year 2',mc:0,len:1},
  {name:'IEW B',mc:0,len:1},
  {name:'Industrial Arts',mc:50,len:1.5},
  {name:'Intermediate Guitar',mc:0,len:1},
  {name:'Intermediate Orchestra',mc:0,len:1},
  {name:'Intro to Fiber Arts',mc:35,len:1},
  {name:'Kindergarten',mc:55,len:5.25},
  {name:'Lego Club',mc:20,len:1},
  {name:'Literature',mc:0,len:1},
  {name:'Little Explorers',mc:0,len:0.5},
  {name:'Logic Games 1 & 2',mc:0,len:1},
  {name:'Logic & Intro to Debate',mc:0,len:1},
  {name:'Math Tutoring (7)',mc:0,len:1},
  {name:'Medieval Art History',mc:25,len:1},
  {name:'Music Appreciation 1 & 2',mc:0,len:1},
  {name:'Nature Journaling 4 & 6',mc:0,len:1},
  {name:'Nutrition',mc:30,len:1,is32wk:true},
  {name:'P.E. 5A & 5B',mc:0,len:0.5},
  {name:'P.E. 4 & 6',mc:0,len:0.5},
  {name:'Passport to Exploration 1 & 2A',mc:35,len:1},
  {name:'Photojournalism',mc:20,len:1},
  {name:'Physical Science',mc:25,len:1,is32wk:true},
  {name:'Piano Level 1',mc:0,len:1},
  {name:'Piano Level 2',mc:0,len:1},
  {name:'Pre-Algebra',mc:0,len:1,is32wk:true},
  {name:'Preschool',mc:55,len:5.25},
  {name:'Running Club',mc:0,len:1},
  {name:'SOTW Medieval History 1 & 2',mc:35,len:1},
  {name:'Spanish A',mc:0,len:1},
  {name:'Spanish B',mc:0,len:1},
  {name:'Speech & Young Writers',mc:0,len:1},
  {name:'Spiritual Disciples',mc:0,len:0.5},
  {name:'String Ensemble',mc:0,len:1},
  {name:'U.S. History',mc:0,len:1,is32wk:true},
  {name:'Ukulele 4',mc:0,len:1},
  {name:'Ukulele 5A',mc:0,len:0.5},
  {name:'Wildcraft 4 (18)',mc:0,len:1},
];


// Calculate Costs
function calcCost(classID,includeSupplyFee) {
  /**
   * Returns:
   * 24wk
   * Material Cost + (170 * length of class)
   * 32wk
   * Material Cost + (225 * length of class)
   */
  if (classID == 'lunch') {
    return 85;
  } else {
    if (includeSupplyFee) {
      let base = (classes[classID].is32wk ? 225 : 170) * classes[classID].len
      return base + ' material cost: $' + classes[classID].mc;
    } else {
      return ((classes[classID].is32wk ? 225 : 170) * classes[classID].len) + classes[classID].mc;
    }
  }
}

// Return 2 digits for cost
function floatCost(cost,parse) {
  if (!parse) {
    return (Math.round(cost * 100) / 100).toFixed(2);
  } else {
    return parseFloat((Math.round(cost * 100) / 100).toFixed(2));
  }
}


// Checked list
// first object: students
// second array: classes
var checked = {};
// this will be the end of me
var lunches = {};

// Make student buttons
for (let i = 0; i < studentCount; i ++) {
  let button = document.createElement('button');
  button.className = 'st';
  button.textContent = 'Student ' + (i + 1);
  button.onclick = function () {
    return studentSelect(i);
  }
  document.getElementById('stab').appendChild(button);

  // Add students arrays
  checked[i] = [];
}
// Make table element
const table = document.createElement('table');
table.id = 'student_table';

// Now add rows for every class
for (let i = 0; i < classes.length; i++) {
  // For each row
  // Add a name, cost, and checkbox
  let row = document.createElement('tr');

  // Name
  let name = document.createElement('td');
  name.innerHTML = classes[i].name;

  // Cost
  let cost = document.createElement('td');
  cost.innerHTML = '$'+calcCost(i,true);

  // Checkbox
  let checkbox = document.createElement('td');
  checkbox.innerHTML = '<input type="checkbox" class="cbox">';

  // Add these to the row
  row.appendChild(name);
  row.appendChild(cost);
  row.appendChild(checkbox);

  // Add the row to the table
  table.appendChild(row);
}


// add it to the stab
document.getElementById('stab').appendChild(table);

// Add selecting functionality
function studentSelect(id) {
  // Store the previous data
  document.getElementById('current').textContent = 'Current student selected: '+ (id + 1);
  let boxes = document.getElementsByClassName('cbox');
  
  for (let l = 0; l < boxes.length; l++) {
    if (boxes[l].checked) {
      if (!checked[prevID].includes(l)) checked[prevID].push(l);
      boxes[l].checked = false;
    }
  }
  if (document.getElementById('lunch').checked) {
    lunches[prevID] = true;
    document.getElementById('lunch').checked = false;
  }

  // Make sure to check all classes that were not previously checked
  for (let i = 0; i < checked[id].length; i++) {
    let check = checked[id][i];
    console.log(check);
    boxes[check].checked = true;
  }
  // Lunches need to be handled differently
  if (lunches[id]) {
    document.getElementById('lunch').checked = true;
  }
  document.getElementById('student_table').style.backgroundColor = colors[id];
  // Now set the new prevID
  prevID = id;
}

// Calculate cost
function calculate() {
  studentSelect(prevID);
  let cost = 0;
  for (let i = 0; i < studentCount; i++) {
    for (let l = 0; l < checked[i].length; l++) {
      cost += calcCost(checked[i][l]);
    }

    // add lunch expense
    if (lunches[i] != null) {
      cost += 85;//$85 fee for lunches
    }

    // clear array
    checked[i] = [];
  }

  document.getElementById('result').innerHTML = 'If paid in full, bank draft (-5% discount): <b>$' + floatCost(cost * 0.95) + '</b><br>If paid in full, with credit/debit card (3.5% fee): <b>$' + floatCost(cost*1.035) + '</b><br>If paid in 6 months with bank draft: <b>$' + floatCost(cost/6) + '</b><br>If paid in 6 months with debit/credit card (3.5% fee): <b>$' + floatCost((cost * 1.035)/6) + '</b>';
}