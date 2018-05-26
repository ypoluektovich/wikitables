// ==UserScript==
// @name Wikitables
// @require https://cdn.jsdelivr.net/npm/vanilla-datatables@1.6.14/dist/vanilla-dataTables.min.js
// @match https://*.wikipedia.org/wiki/*
// @grant none
// ==/UserScript==

'use strict';

{
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = 'https://cdn.jsdelivr.net/npm/vanilla-datatables@1.6.14/dist/vanilla-dataTables.min.css';
  document.getElementsByTagName('head')[0].appendChild(css);
}

function getText(e) {
  e = e.cloneNode(true);

  // todo: is there a better way?
  let sups = e.getElementsByTagName('sup');
  while (sups.length > 0) {
    sups[0].remove();
    sups = e.getElementsByTagName('sup');
  }

  return e.textContent;
}

const indexOfHeader = {};
let headerCount = 0;
const headerArray = [];
const data = {};

for (let table of document.getElementsByClassName('wikitable')) {
  const tableHeaderIndexes = [];
  for (let row of table.getElementsByTagName('tr')) {
    const rowIsHeader = row.getElementsByTagName('th').length > 1;
    const cells = [];
    for (let cell of row.getElementsByTagName('th')) {
      cells.push(cell);
    }
    for (let cell of row.getElementsByTagName('td')) {
      cells.push(cell);
    }
    if (rowIsHeader) {
      if (tableHeaderIndexes.length > 0) {
        // todo: log?
        continue;
      }
      for (let header of cells) {
        const text = getText(header);

        let index = indexOfHeader[text];
        if (!index && index !== 0) {
          index = indexOfHeader[text] = headerCount++;
          headerArray.push(text);
        }
        tableHeaderIndexes.push(index);
      }
    } else {
      const id = getText(cells[0]);
      const dataObject = data[id] || (data[id] = {});
      let ix = 0;
      for (let cell of cells) {
        dataObject[tableHeaderIndexes[ix++]] = getText(cell);
      }
    }
  }
}

const dataArray = [];
for (let rowId in data) {
  const row = data[rowId];
  const rowArray = [];
  for (let i = 0; i < headerCount; ++i) {
    rowArray.push(row[i] || "");
  }
  dataArray.push(rowArray);
}

let currentRow = [];
window.valueOfRowField = function (fieldName) {
  return currentRow[indexOfHeader[fieldName]];
};

const filterInput = document.createElement('input');
filterInput.type = 'text';
filterInput.style = 'width: 100%;';
document.getElementById('firstHeading').insertAdjacentElement("beforebegin", filterInput);

const headerForm = document.createElement('form');
document.getElementById('firstHeading').insertAdjacentElement("beforebegin", headerForm);

const table = document.createElement('table');
document.getElementById('firstHeading').insertAdjacentElement("beforebegin", table);

const dataTable = new DataTable(table);

function dtOptions(headers, data) {
  return {
    data: {
      headings: headers,
      data: data
    },
    perPage: 50,
    perPageSelect: [10, 20, 50, 100, 200],
    searchable: false
  };
}

'PARSER';

function updateTable() {
  let untrimmedRows = dataArray;
  if (filterInput.value !== '') {
    untrimmedRows = [];
    for (let row of dataArray) {
      currentRow = row;
      if (PARSER.parse(filterInput.value) === true) {
        untrimmedRows.push(row);
      }
    }
  }

  const selectedHeaders = [];
  const selectedHeaderIndexes = [];
  for (let i = 0; i < headerCount; ++i) {
    if (headerForm.elements[i].checked) {
      selectedHeaderIndexes.push(i);
      selectedHeaders.push(headerArray[i]);
    }
  }

  const trimmedRows = [];
  for (let fullRow of untrimmedRows) {
    const trimmedRow = [];
    for (let ix of selectedHeaderIndexes) {
      trimmedRow.push(fullRow[ix]);
    }
    trimmedRows.push(trimmedRow);
  }

  dataTable.destroy();
  dataTable.init(dtOptions(selectedHeaders, trimmedRows));
}

for (let header of headerArray) {
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = true;
  const label = document.createElement('label');
  label.style = 'margin-right: 1em;';
  label.appendChild(cb);
  label.appendChild(document.createTextNode(' ' + header));
  headerForm.appendChild(label);

  cb.addEventListener(
    'change',
    (ev) => {
      ev.stopPropagation();
      updateTable();
    }
  );
}

filterInput.addEventListener('change', (ev) => {
  ev.stopPropagation();
  updateTable();
});

updateTable();
