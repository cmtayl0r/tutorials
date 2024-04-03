// -----------------------------------------------------------------------------
//  LESSON 10
// -----------------------------------------------------------------------------

class BankAccount {
  constructor(balance = 0, accHolder, accNumber) {
    this.balance = balance;
    this.accHolder = accHolder;
    this.accNumber = accNumber;
  }
  deposit(amt) {
    if (!this.balance >= 0) return parseInt((this.balance += amt));
  }
  withdraw(amt) {
    if (!this.balance >= 0 || amt > this.balance) {
      console.error("Not enough money");
    } else {
      return parseInt((this.balance -= amt));
    }
  }
  showData() {
    console.log(this.balance);
  }
}

const newAccount = new BankAccount();

newAccount.deposit(50);
newAccount.withdraw(60);
newAccount.showData();
