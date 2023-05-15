import { table } from "console";

export class NumericService {
  constructor(private primes: bigint[]) {}

  gcd(x: bigint, p: bigint): bigint {
    let t: bigint;

    while (p) {
      t = p;
      p = x % p;
      x = t;
    }

    return x;
  }

  trialDivisionMethod(n: bigint): bigint | undefined {
    for (let i = 0; i < this.primes.length; i++) {
      if (n % this.primes[i] === 0n) {
        return this.primes[i];
      }
    }
  }

  numberDecomposition(n: bigint) {
    const decomposition: {
      divisor: bigint;
      power: bigint;
    }[] = [];

    while (n > 1) {
      const divisor = this.trialDivisionMethod(n);
      const exisitingDivisor = decomposition.find(
        (element) => element.divisor === divisor
      );

      if (!divisor) {
        break;
      }

      if (exisitingDivisor) {
        exisitingDivisor.power++;
      } else {
        decomposition.push({
          divisor,
          power: 1n,
        });
      }

      n = n / divisor;
    }

    return decomposition;
  }

  toBinary(n: bigint): bigint[] {
    const binaryNumber = [];

    while (n >= 1) {
      binaryNumber.push(n % 2n);
      n = n / 2n;
    }

    return binaryNumber.reverse();
  }


  moduloHornerScheme(base: bigint, power: bigint, modulo: bigint): bigint {
    let result = 1n;
    base = base % modulo;

    while (power > 0) {
      if (power % 2n === 1n) {
        result = (result * base) % modulo;
      }

      power = power / 2n;
      base = (base * base) % modulo;
    }

    return result;
  }

  createRTable(a: bigint, n: bigint) {
    const numberDecomposition = this.numberDecomposition(n);
    return numberDecomposition.map((element) => {
      const result: bigint[] = [];

      for (let i = 0; i < element.divisor; i++) {
        if (i === 0) {
          result.push(1n);
        } else {
          result.push(
            this.moduloHornerScheme(a, (n * BigInt(i)) / element.divisor, n + 1n)
          );
        }
      }
      return result;
    });
  }

  chineseRemainderTheorem(modulos: bigint[], remainders: bigint[]): bigint {
    const prod = modulos.reduce((a, b) => a * b);
    let result = 0n;

    for (let i = 0; i < modulos.length; i++) {
      const p = prod / modulos[i];
      result += remainders[i] * this.mulInv(p, modulos[i]) * p;
    }

    return result % prod;
  }

  mulInv(a: bigint, b: bigint): bigint {
    const b0 = b;
    let x0 = 0n;
    let x1 = 1n;

    if (b === 1n) {
      return 1n;
    }

    while (a > 1) {
      const q = a / b;
      const amb = a % b;
      a = b;
      b = amb;

      const xqx = x1 - q * x0;
      x1 = x0;
      x0 = xqx;
    }

    if (x1 < 0) {
      x1 += b0;
    }

    return x1;
  }

  findInTable(table: bigint[][], column: number, value: bigint) {
    for (let i = 0; i < table[column].length; i++) {
      if (table[column][i] === value) {
        return BigInt(i);
      }
    }
  }

  findX(
    a: bigint,
    b: bigint,
    n: bigint,
    factor: { divisor: bigint; power: bigint },
    column: number
  ) {
    const alpha = this.mulInv(a, n + 1n);
    let p_i = factor.divisor * factor.divisor;
    let p_j = factor.divisor;
    const rTable = this.createRTable(a, n);

    let x = this.findInTable(
      rTable,
      column,
      this.moduloHornerScheme(b, n / factor.divisor, n + 1n)
    )!;

    for(let i = 1; i < factor.power; i++){
        const degree = n / p_i;
        const a = this.moduloHornerScheme(alpha, x!, n + 1n);
        const temp = this.moduloHornerScheme(b * a, degree, n + 1n);
        x += p_j * this.findInTable(rTable, column, temp)!;
        p_j *= factor.divisor;
        p_i *= factor.divisor;
    }

    return x;
  }
}
