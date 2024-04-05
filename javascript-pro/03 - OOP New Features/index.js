class User {
    constructor(fName, lName) {
        this.fName = fName;
        this.lName = lName;
    }

    get fullName() {
        return `${this.fName} ${this.lName}`;
    }
    set setFullName(name) {
        [this.fName, this.lName] = name.split(' ');
    }
}

const you = new User('Chris', 'Taylor');

// you.fullName('Ted Lasso');

console.log(you.fName);
console.log(you.lName);

you.setFullName = 'Ted Lasso';

console.log(you.fName);
console.log(you.lName);
