import { Observable, Subject } from "rxjs";
import { NumericService } from "./numeric.service";

export class DiscreteLogarithmService {
  brootForceDiscreteLogarithm(a: number, b: number, n: number) {
    return this.brootForce(a, b, n);
  }

  private brootForce(a: number, b: number, n: number) {
    let result = a;

    for (let i = 1; i < n - 1; i++) {
      if (result === b) {
        return i;
      }

      result = (result * a) % n;
    }
  }
}
