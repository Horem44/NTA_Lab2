export class NumericService {
  constructor(private primes: number[]) {}

  gcd(x: number, p: number): number {
    let t: number;

    while (p) {
      t = p;
      p = x % p;
      x = t;
    }

    return x;
  }

  trialDivisionMethod(n: number): number | undefined {
    for (let i = 0; i < this.primes.length; i++) {
      if (n % this.primes[i] === 0) {
        return this.primes[i];
      }
    }
  }

  numberDecomposition(n: number) {
    const decomposition: {
      divisor: number;
      power: number;
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
          power: 1,
        });
      }

      n = n / divisor;
    }

    return decomposition;
  }

  toBinary(n: number): number[] {
    const binaryNumber = [];

    while (n >= 1) {
      binaryNumber.push(n % 2);
      n = n / 2;
    }

    return binaryNumber.reverse();
  }

  moduloHornerScheme(n: number, pow: number, m: number): number {
    let binaryPow = this.toBinary(pow);
    let result = 1;

    for (let i = 0; i < binaryPow.length; i++) {
      if (binaryPow[i] === 1) {
        result = (result * n) % m;
      }

      if (i === binaryPow.length - 1) {
        break;
      }

      result = (result * result) % m;
    }

    return result;
  }

  createRTable(a: number, n: number, m: number) {
    const numberDecomposition = this.numberDecomposition(n);
    return numberDecomposition.map((element) => {
      const result: number[] = [];

      for (let i = 0; i < element.divisor; i++) {
        const power = (n * i) / element.divisor;
        result.push(this.moduloHornerScheme(a, power, m));
      }

      return result;
    });
  }

  chineseRemainderTheorem(modulos: number[], remainders: number[]): number {
    const prod = modulos.reduce((a, b) => a * b);
    let result = 0;

    for (let i = 0; i < modulos.length; i++) {
      const p = prod / modulos[i];
      result += remainders[i] * this.mulInv(p, modulos[i]) * p;
    }

    return result % prod;
  }

  private mulInv(a: number, b: number): number {
    const b0 = b;
    let x0 = 0;
    let x1 = 1;

    if (b === 1) {
      return 1;
    }

    while (a > 1) {
      const q = Math.floor(a / b);
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
}
