class Person {
  constructor(name = 'Anonymous', age = 'unknown', location = 'unknown') {
    this.name = name;
    this.age = age;
    this.location = location
  }
  getDescription() {
    return `${this.name} is ${this.age} years old and lives in ${this.location}.`
  }

}

class Student extends Person {
  constructor(name, age, location, major = 'undecided') {
    super(name, age, location);
    this.major = major
  }
  hasMajor() {
    return `${this.name} is majoring in ${this.major}`;
  }
}

const me = new Student('Mitch Ramsey', 28, 'Charlotte, NC', 'Environmental Science');
console.log(me);
console.log(me.getDescription());
console.log(me.hasMajor());

const other = new Student();
console.log(other);
console.log(other.getDescription());