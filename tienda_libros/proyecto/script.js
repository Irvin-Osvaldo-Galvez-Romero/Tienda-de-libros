document.getElementById('randomForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let numCount = parseInt(document.getElementById('numCount').value);
    let randomNumbers = randomPseudoaleatorios(numCount);
    psudoaleatorios(randomNumbers);
    displayStatistics(randomNumbers, numCount);
});

function randomPseudoaleatorios(count) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.random());
    }
    return numbers;
}

function psudoaleatorios(numbers) {
    let output = "<h3>Números Generados Pseudoaleatorios</h3><ul>";
    numbers.forEach(num => {
        output += `<li>${num}</li>`;
    });
    output += "</ul>";
    document.getElementById('randomNumbers').innerHTML = output;
}

function displayStatistics(numbers, count) {
    let median = media(numbers);
    let varianzas = varianza(numbers, median);
    let Estandar = Math.sqrt(varianzas);
    let chicuadradaa = chicuadrada(numbers);
    let freqObserved = observada(numbers);
    let esperada = numbers.length / 10;
    let movil = mediamovil(numbers, 3); // ejemplo de ventana de 3
    let frecAcumulada = acumulada(numbers);
    let kolmogorovSmirnov = SmirnovKolmogorov(numbers);
    let Numcongruenciales = congruencial(1, 5, 3, 16, count); // valores de ejemplo
    let prodMedios = medios(1234, 5678, count); // valores de ejemplo
    let prodCuadrados = cuadrados(1234, count); // valores de ejemplo
    let transInversa = inversa(1, count);
    let Convolucionn = convolucion(count);

    let output = `
        <h3>Resultados de las formulas</h3>
        <p>Media: ${median}</p>
        <p>Varianza: ${varianzas}</p>
        <p>Desviación Estándar: ${Estandar}</p>
        <p>Chi-cuadrada: ${chicuadradaa}</p>
        <p>Frecuencia Observada: ${JSON.stringify(freqObserved)}</p>
        <p>Frecuencia Esperada: ${esperada}</p>
        <p>Media Móvil (3): ${JSON.stringify(movil)}</p>
        <p>Frecuencia Acumulada: ${JSON.stringify(frecAcumulada)}</p>
        <p>Prueba de Kolmogorov-Smirnov: ${kolmogorovSmirnov}</p>
        <p>Números Congruenciales: ${JSON.stringify(Numcongruenciales)}</p>
        <p>Productos Medios: ${JSON.stringify(prodMedios)}</p>
        <p>Productos Cuadrados: ${JSON.stringify(prodCuadrados)}</p>
        <p>Transformada Inversa: ${JSON.stringify(transInversa)}</p>
        <p>Convolución: ${JSON.stringify(Convolucionn)}</p>
    `;

    document.getElementById('statistics').innerHTML = output;
}

function media(numbers) {
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function varianza(numbers, mean) {
    let sumOfSquares = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0);
    return sumOfSquares / numbers.length;
}

function chicuadrada(numbers) {
    let expectedFrequency = numbers.length / 10;
    let observedFrequencies = new Array(10).fill(0);

    numbers.forEach(num => {
        let index = Math.floor(num * 10);
        observedFrequencies[index]++;
    });

    let chiSquare = observedFrequencies.reduce((acc, observed) => {
        return acc + Math.pow(observed - expectedFrequency, 2) / expectedFrequency;
    }, 0);

    return chiSquare;
}

function observada(numbers) {
    let frequencies = new Array(10).fill(0);
    numbers.forEach(num => {
        let index = Math.floor(num * 10);
        frequencies[index]++;
    });
    return frequencies;
}

function mediamovil(numbers, windowSize) {
    let averages = [];
    for (let i = 0; i <= numbers.length - windowSize; i++) {
        let window = numbers.slice(i, i + windowSize);
        let avg = media(window);
        averages.push(avg);
    }
    return averages;
}

function acumulada(numbers) {
    let sortedNumbers = [...numbers].sort((a, b) => a - b);
    let cumulativeFreq = [];
    let sum = 0;
    sortedNumbers.forEach(num => {
        sum += num;
        cumulativeFreq.push(sum);
    });
    return cumulativeFreq;
}

function SmirnovKolmogorov(numbers) {
    let n = numbers.length;
    let sortedNumbers = [...numbers].sort((a, b) => a - b);
    let dPlus = -Infinity;
    let dMinus = -Infinity;

    for (let i = 0; i < n; i++) {
        let d1 = (i + 1) / n - sortedNumbers[i];
        let d2 = sortedNumbers[i] - i / n;
        if (d1 > dPlus) dPlus = d1;
        if (d2 > dMinus) dMinus = d2;
    }

    let d = Math.max(dPlus, dMinus);
    return d;
}

function congruencial(seed, a, c, m, count) {
    let numbers = [];
    let x = seed;
    for (let i = 0; i < count; i++) {
        x = (a * x + c) % m;
        numbers.push(x / m); // Normaliza el valor entre 0 y 1
    }
    return numbers;
}

function medios(seed1, seed2, count) {
    let numbers = [];
    let x = seed1;
    let y = seed2;
    for (let i = 0; i < count; i++) {
        let product = (x * y).toString().padStart(8, '0'); // Asegura que el producto tenga al menos 8 dígitos
        let middle = product.slice(Math.floor(product.length / 2) - 2, Math.floor(product.length / 2) + 2); // Toma los 4 dígitos del medio
        x = y;
        y = parseInt(middle, 10);
        numbers.push(y / 10000); // Normaliza el valor entre 0 y 1
    }
    return numbers;
}

function cuadrados(seed, count) {
    let numbers = [];
    let x = seed;
    for (let i = 0; i < count; i++) {
        let square = (x * x).toString().padStart(8, '0'); // Asegura que el cuadrado tenga al menos 8 dígitos
        let middle = square.slice(Math.floor(square.length / 2) - 2, Math.floor(square.length / 2) + 2); // Toma los 4 dígitos del medio
        x = parseInt(middle, 10);
        numbers.push(x / 10000); // Normaliza el valor entre 0 y 1
    }
    return numbers;
}

function inversa(lambda, count) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
        let u = Math.random();
        let x = -Math.log(1 - u) / lambda;
        numbers.push(x);
    }
    return numbers;
}

function convolucion(count) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
        let u1 = Math.random();
        let u2 = Math.random();
        let sum = u1 + u2;
        numbers.push(sum);
    }
    return numbers;
}
