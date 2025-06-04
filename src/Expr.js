export default class Expr extends Array {
  constructor(name, ...args) {
    super(...args);

    // this additional property does not show up
    // on normal array iteration, or change the length
    // for example:
    //     Expr(foo, 1,2,3)
    // has length 3, and works the same as [1,2,3]
    this.head = name;
  }

  // Output should  x == eval(x.toString())
  toString() {
    if (this.length == 0) {
      return "";
    }
    return (
      this.head.name + "(" + this.map((x) => x.toString()).join(", ") + ")"
    );
  }
}
