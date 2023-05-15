import { DiscreteLogarithmService } from "./services/discrete-logarithm.service";
import { NumericService } from "./services/numeric.service";
import { PrimesService } from "./services/primes.service";

const primes = new PrimesService();
primes.primes$.subscribe((primes) => {
  const n = new NumericService(primes);
  const d = new DiscreteLogarithmService(n);
  console.log(d.silverPoligGayman(3691395420298n, 520940435869n, 7999955915857n));
});
