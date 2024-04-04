// -----------------------------------------------------------------------------
//  LESSON 10
// -----------------------------------------------------------------------------

class BankAccount {
  constructor(accNumber, accHolder, balance = 0) {
    this.balance = balance;
    this.accHolder = accHolder;
    this.accNumber = accNumber;
  }
  deposit(amt) {
    if (amt > 0) {
      this.balance += amt;
      console.log(`Deposited €${amt}. New Balance: €${parseInt(this.balance)}`);
    }
    console.error(`Can't deposit a negative amount`);
  }
  withdraw(amt) {
    if (this.balance <= 0 || amt > this.balance) {
      console.error("Not enough money 🥺");
    } else {
      this.balance -= amt;
      console.log(`Withdrawn €${amt}. New Balance: €${parseInt(this.balance)}`);
    }
  }
}

const newAccount = new BankAccount("Chris Taylor", "12345678");

console.log(newAccount);

newAccount.deposit(50);
console.log(newAccount.balance);
newAccount.withdraw(30);
newAccount.withdraw(30);
console.log(newAccount.balance);

// newAccount.withdraw(60);
// newAccount.showData();

// -----------------------------------------------------------------------------
//  CODING EXERCISE 2
// -----------------------------------------------------------------------------

class ArrayUtils {
  constructor() {
    throw new Error("ArrayUtils cannot be instantiated.");
  }
  static average(arr) {
    // Check if array is empty
    if (arr.length === 0) {
      throw new Error("Array cannot be empty.");
    }
    // Use reduce method to find average number in array
    return arr.reduce((sum, current) => sum + current, 0) / arr.length;
  }
  static max(arr) {
    // Check if the array is not an array AND is empty
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error("The input must be a non-empty array.");
    }
    // Use Math.max with spread operator to find the largest number
    return Math.max(...arr);
  }
}
