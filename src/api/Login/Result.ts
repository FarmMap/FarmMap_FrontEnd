abstract class Result<L, R> {
  value!: L | R;
}

class Left<L, R> extends Result<L, R> {
  value: L;

  constructor(value: L) {
    super();
    this.value = value;
  }
}

class Right<L, R> extends Result<L, R> {
  value: R;

  constructor(value: R) {
    super();
    this.value = value;
  }
}

export { Result, Left, Right };
