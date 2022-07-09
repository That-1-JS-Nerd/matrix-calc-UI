'use-strict';

let matrixData_1 = [];
let matrixData_2 = [];

const btnMultiply = document.querySelector('.btn-multiply');
const btnCreate = document.querySelector('.create-grid');
const btnReset = document.querySelector('.reset-matrices');
const btnAuto = document.querySelector('.auto-fill');
const btnClear = document.querySelector('.value-reset');

const userRow1 = document.querySelector('#mtx1-rows');
const userCol1 = document.querySelector('#mtx1-cols');

const userRow2 = document.querySelector('#mtx2-rows');
const userCol2 = document.querySelector('#mtx2-cols');

let created = false;

userRow1.value = 4;
userCol1.value = 3;

userRow2.value = 3;
userCol2.value = 4;

const DEFAULT_R = 6;
const DEFAULT_C = 5;

// Convert user input array into appropriate matrix format
Array.prototype.toMatrix = function(el) {
    if (!this.length || this.length % el !== 0) return null;

    let mtx = [], i, k;
    for (i = 0, k = -1; i < this.length; i++) {
        if (i % el === 0) {
            k++;
            mtx[k] = [];
        }
        mtx[k].push(this[i]);
    }
    return mtx;
}

function multiply(matrix1, matrix2) {
    const resMtx = [];
    for (let j = 0; j < matrix1.length; j++) {
        const res = [];
        for (let k = 0; k < matrix1.length; k++) {
            let ct = 0;
            for (let n = 0; n < matrix1[j].length; n++) {
                ct += matrix1[j][n] * matrix2[n][k];
            }
            res.push(ct);
        }
        resMtx.push(res);
    }
    return resMtx;
}

function completeReset() {
    created = false;
    document.querySelector('.grid-1').innerHTML = '';
    document.querySelector('.grid-2').innerHTML = '';
    document.querySelector('.symbol').textContent = '';
}

function createMatrix(rows, cols, int) {
    const parent = document.querySelector(`.grid-${int}`);
    parent.style.width = `${cols * 50}px`;
    document.querySelector('.symbol').textContent = 'X';
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('input');
        cell.setAttribute('type', 'text');
        cell.classList.add('cell');
        parent.appendChild(cell);
    }
}

function autoFill() {
    const cells = document.querySelectorAll('.cell');
    if (!cells.length) return;

    if (matrixData_1.length && matrixData_2.length) {
        matrixData_1 = [];
        matrixData_2 = [];
    }

    cells.forEach(
        (_, idx) => {
            cells[idx].value = Math.floor(Math.random() * 100) + 1;
            if (idx < cells.length / 2) {
                matrixData_1.push(cells[idx].value);
            } else {
                matrixData_2.push(cells[idx].value);
            }
        }
    );
}

function createResult(matrix, parent) {
    for (let j = 0; j < matrix.length; j++) {
        for (let k = 0; k < matrix[j].length; k++) {
            const cell = document.createElement('input');
            cell.setAttribute('type', 'text');
            cell.classList.add('cell-res');
            cell.value = matrix[j][k];
            parent.appendChild(cell);
        }
    }
}

btnCreate.addEventListener('click', () => {
    if (created) return;
    created = true;

    createMatrix(userRow1.value, userCol1.value, 1);
    createMatrix(userRow2.value, userCol2.value, 2);
});

btnMultiply.addEventListener('click', () => {
    const parent = document.querySelector(`.result-mtx`);
    parent.innerHTML = '';
    if (!matrixData_1.length && !matrixData_2.length) return;

    const matrix_1 = matrixData_1.toMatrix(userCol1.value);
    const matrix_2 = matrixData_2.toMatrix(userCol2.value);
    const resMtx = multiply(matrix_1, matrix_2);

    parent.style.width = `${userRow1.value * 50}px`;

    createResult(resMtx, parent);
});

btnClear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');

    if (!cells.length) return;

    matrixData_1 = [];
    matrixData_2 = [];

    cells.forEach(cell => cell.value = null);
});

btnAuto.addEventListener('click', autoFill);
btnReset.addEventListener('click', completeReset);