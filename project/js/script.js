'use-strict';

const mtxInput1 = [];
const mtxInput2 = [];

// Matrix multiply page
const multiplyBtn = document.querySelector('.multiply');
const multiplyReset = document.querySelector('.reset-matrices');

// transpose page
const resetTranspose = document.querySelector('.reset-transpose');
const transposeBtn = document.querySelector('.transpose');


const Matrix = {
    transpose: function(matrix) {
        if (!this.isValidMatrix(matrix)) return "Invalid Matrix";

        let transposed = [];
        let row;

        // i <= matrix.length I think
        for (let i = 0; i < matrix.length; i++) {
            row = [];
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[j][i]) row.push(matrix[j][i]);
            }
            transposed.push(row);
        }
        return transposed.filter(arr => arr.length);
    },

    isValidMatrix: function(matrix) {
        const length = matrix[0].length;
        return matrix.every(el => el.length === length);
    },

    isValidMatrices: function(arr1, arr2) {
        if (!this.isValidMatrix(arr1) || !this.isValidMatrix(arr2)) return [];

        let validRows = arr1.length == arr2[0].length;
        let validCols = arr1[0].length === arr2.length;

        return validRows && validCols;
    },

    multiply: function(matrix1, matrix2) {
        if (!this.isValidMatrices(matrix1, matrix2)) return null;

        const resMtx = [];
        for (let j = 0; j < matrix1.length; j++) {
            const res = [];
            for (let k = 0; k < matrix.length; k++) {
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
};

function createMatrix1(rows, cols) {
    const parent = document.querySelector('.grid-1');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('style', 'padding: 10px 20px; border: 2px solid #000');
            parent.appendChild(cell);
        }
    }
}

createMatrix1(mtxInput1.length, mtxInput2.length);