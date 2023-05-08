import { DiscreteLogarithmService } from "./services/discrete-logarithm.service";
import { NumericService } from "./services/numeric.service";
import { PrimesService } from "./services/primes.service";

const primes = new PrimesService();
primes.primes$.subscribe((primes) => {
  const n = new NumericService(primes);
  
});
