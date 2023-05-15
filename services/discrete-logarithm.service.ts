import { Observable, Subject, elementAt } from "rxjs";
import { NumericService } from "./numeric.service";

export class DiscreteLogarithmService {
  constructor(private readonly numericService: NumericService) {}

  brootForceDiscreteLogarithm(a: bigint, b: bigint, n: bigint) {
    return this.brootForce(a, b, n);
  }

  silverPoligGayman(a: bigint, b: bigint, n: bigint) {
    n = n - 1n;

    const modulos = this.numericService
      .numberDecomposition(n)
      .map((element) =>
        this.numericService.moduloHornerScheme(
          element.divisor,
          element.power,
          n + 1n
        )
      );

    const factor = this.numericService.numberDecomposition(n);

    const allX = factor.map((f, index) => this.numericService.findX(a, b, n, f, index));
    
    const result = this.numericService.chineseRemainderTheorem(modulos, allX);

    return result;
  }

  private brootForce(a: bigint, b: bigint, n: bigint) {
    let result = a;

    for (let i = 1; i < n - 1n; i++) {
      if (result === b) {
        return i;
      }

      result = (result * a) % n;
    }
  }
}
