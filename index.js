'use strict';

const prompt = require('prompt-sync')({ sigint: true });

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'Error: tidak bisa membagi dengan nol.';
  return a / b;
}

function modulo(a, b) {
  if (b === 0) return 'Error: tidak bisa modulo dengan nol.';
  return a % b;
}

function power(a, b) {
  return Math.pow(a, b);
}

function getNumber(teks) {
  while (true) {
    const input = prompt(teks);
    const num = Number(input);
    if (!isNaN(num) && input.trim() !== '') {
      return num;
    }
    console.log('Input tidak valid. Masukkan angka yang benar.\n');
  }
}

function getOperator() {
  const validOps = ['+', '-', '*', '/', '%', '**'];
  while (true) {
    const op = prompt('Masukkan operator (+, -, *, /, %, **): ').trim();
    if (validOps.includes(op)) {
      return op;
    }
    console.log('Operator tidak valid. Pilih salah satu: ' + validOps.join(', ') + '\n');
  }
}

function analyzeResult(result) {
  console.log('\n=== Analisis Hasil ===');

  if (result === null || result === undefined) {
    console.log('Hasil:', result ?? 'Tidak ada hasil (null atau undefined)');
    console.log('======================\n');
    return;
  }

  if (typeof result === 'string') {
    console.log('Tipe   : string (pesan error)');
    console.log('Pesan  :', result);
    console.log('======================\n');
    return;
  }

  if (typeof result === 'number') {
    const tanda = result > 0 ? 'positif' : result < 0 ? 'negatif' : 'nol';
    const bentuk = Number.isInteger(result) ? 'bilangan bulat' : 'bilangan desimal';
    const paritas = Number.isInteger(result)
      ? result % 2 === 0 ? 'genap' : 'ganjil'
      : 'tidak berlaku (desimal)';

    console.log('Tipe   : number');
    console.log('Tanda  :', tanda);
    console.log('Bentuk :', bentuk);
    console.log('Paritas:', paritas);
    console.log('======================\n');
  }
}

function main() {
  console.log('=== Kalkulator Interaktif ===\n');

  while (true) {
    const rawA = prompt('Masukkan angka pertama (atau ketik "exit" untuk keluar): ').trim();

    if (rawA.toLowerCase() === 'exit') break;

    const numA = Number(rawA);
    if (isNaN(numA) || rawA === '') {
      console.log('Input tidak valid. Masukkan angka yang benar.\n');
      continue;
    }

    const operator = getOperator();
    const numB = getNumber('Masukkan angka kedua: ');

    let result;
    switch (operator) {
      case '+':  result = add(numA, numB);      break;
      case '-':  result = subtract(numA, numB); break;
      case '*':  result = multiply(numA, numB); break;
      case '/':  result = divide(numA, numB);   break;
      case '%':  result = modulo(numA, numB);   break;
      case '**': result = power(numA, numB);    break;
      default:   result = null;
    }

    console.log('\nHasil: ' + numA + ' ' + operator + ' ' + numB + ' = ' + result);

    analyzeResult(result);

    const lanjut = prompt('Lanjut? (ya / tidak): ').trim().toLowerCase();
    if (lanjut === 'tidak' || lanjut === 'tidak') {
      break;
    }

    console.log('');
  }

  console.log('\nTerima kasih sudah menggunakan kalkulator ini.\n');
}

main();