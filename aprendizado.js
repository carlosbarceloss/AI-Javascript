//grupos para treinamento
let grupos = [ //array de objetos
    {x1: 1, x2: 1, y: 1},
    {x1: 1, x2: 0, y: 1},
    {x1: 0, x2: 1, y: 0},
    {x1: 0, x2: 0, y: 0}
];

//pesos aleatórios
let weight1 = -1, weight2 = -1;

//variaveis auxiliares
let adjustment = 0, y = 0, totalAdjustments = 0, reps = 0, cont = 0;

for(cont; cont < grupos.length; cont++) { //laço for para percorrer os objetos do array
    let grupo = Object.values(grupos[cont]); //atribui o objeto da posição 'cont' para a variável 'grupo'
    do {
        adjustment = 0; //zera ajustes
       y = neuron(...grupo, weight1, weight2, y); //função neurônio passa o grupo via spread operator, pesos e variáveis, retorna y.
    } while (adjustment != 0);//se não houver ajuste, significa que os pesos estão corretos, fim do laço 'do - while'
    //prints
    console.log(`\n---------- GRUPO ${cont + 1} ----------`);
    console.log("\nRede treinada com sucesso!\n\n>> Valor de Y: " + y);
    console.log(">> W1 ajustado: "+ weight1 + "\n>> W2 ajustado: "+ weight2);
    console.log(">> Quantidade de ajustes necessários: " + totalAdjustments);
    console.log(">> Repetições necessárias: " + reps);
};

//funções
function neuron(x1, x2, yTarget, w1, w2, yOutput) { //função neurônio
    let sum = x1 * w1 + x2 * w2;
    yOutput = funRampa(sum); //atribui função rampa para saída
    if (yOutput != yTarget) { //compara saída obtida com saída esperada
        weight1 = adjustWeight(x1, w1, yTarget, yOutput); //ajusta peso 1
        weight2 = adjustWeight(x2, w2, yTarget, yOutput); //ajusta peso 2
        adjustment++; //marcador de ajuste
        totalAdjustments++; //contador de ajustes
    }
    reps++;
    return yOutput; //retorna saída y    
}

function funRampa(s){ //funcao rampa
    if (s < 0){
        return 0;
    }else if (s >= 0 && s <= 1){
        return s;
    }else if (s > 1){
        return 1;
    }
}

function adjustWeight(x, w, yTarget, yOutput){ //funcao para ajustar pesos
    return w + 1 * (yTarget - yOutput) * x;
}