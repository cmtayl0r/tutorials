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

// console.log(you.fName);
// console.log(you.lName);

// you.setFullName = 'Ted Lasso';

// console.log(you.fName);
// console.log(you.lName);

// -----------------------------------------------------------------------------
// CODING EXERCISE 3
// -----------------------------------------------------------------------------

class UserProfile {
    constructor(username, email, birthDate) {
        if (username === '' || typeof username !== 'string') {
            throw new Error('Invalid username.');
        }
        if (!email.includes('@')) {
            throw new Error('Invalid email.');
        }
        if (!Date.parse(birthDate)) {
            throw new Error('Invalid birthdate.');
        }
        this._username = username;
        this._email = email;
        this._birthDate = birthDate;
    }

    // GETTER METHODS
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get birthDate() {
        return this._birthDate;
    }

    // SETTER METHODS
    set username(username) {
        if (username === '' || typeof username !== 'string') {
            throw new Error('Invalid username.');
        }
        this._username = username;
    }
    set email(email) {
        if (!email.includes('@')) {
            throw new Error('Invalid email.');
        }
        this._email = email;
    }
    set birthDate(date) {
        // 1990-01-01
        if (!Date.parse(date)) {
            throw new Error('Invalid birthdate.');
        }
        this._birthDate = date;
    }
}
