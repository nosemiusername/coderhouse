import { ModifierFlags } from 'typescript';

/**
 * Funcion que realiza la operacion indicada en op
 * 
 * @param {number} firstNumber 
 * @param {number} secondNumber 
 * @param {string} op 
 */
const operacion = (firstNumber: number, secondNumber: number, op: string) => 
    new Promise(resolve => {
        switch (op) {
            case 'suma':
                import('./suma').then(module => {
                    const result = new module.suma(firstNumber,secondNumber);
                    resolve(result.resultado());
                });
            case 'resta':
                import('./resta').then(module => {
                    const result = new module.resta(firstNumber,secondNumber);
                    resolve(result.resultado());
                });
        }
    });

/**
 * Funcion que imprime los resultados de las operaciones de suma y resta
 */
const operaciones = async () => {
    const sumaResult = await operacion(1,2,'suma');
    const restaResult = await operacion(1,2,'resta');
    console.log(sumaResult);
    console.log(restaResult);
};

operaciones();