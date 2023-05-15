import { catchError, from, map, Observable, take, throwError } from "rxjs";
import axios, { AxiosError } from "axios";

interface IPrimesResponse {
  [key: string]: number;
}

export const PRIMES_URL =
  "https://raw.githubusercontent.com/koorukuroo/Prime-Number-List/master/primes.json";

export class PrimesService {
  private readonly primesAmount = 150000;

  public primes$: Observable<bigint[]> = from(
    axios<IPrimesResponse>(PRIMES_URL)
  ).pipe(
    take(1),
    map((response) =>
      Array.from({ length: this.primesAmount }, (_, i) => BigInt(response.data[i]))
    ),
    catchError((err: AxiosError) => throwError(err.message))
  );
}
