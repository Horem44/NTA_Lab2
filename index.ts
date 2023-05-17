import { DiscreteLogarithmService } from "./services/discrete-logarithm.service";
import { NumericService } from "./services/numeric.service";
import { PrimesService } from "./services/primes.service";

const primes = new PrimesService();
primes.primes$.subscribe((primes) => {
  const numericService = new NumericService(primes);
  const discreteLogarithmService = new DiscreteLogarithmService(numericService);

  console.time('silver polig gellman');
  console.log(discreteLogarithmService.silverPoligGellman(38n, 104n, 179n));
  console.timeEnd('silver polig gellman');
});
