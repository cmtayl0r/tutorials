class BankAccount {
  constructor(balance = 0, accHolder, accNumber) {
    this.balance = balance;
    this.accHolder = accHolder;
    this.accNumber = accNumber;
  }
  deposit(amt) {
    return parseInt((this.balance += amt));
  }
  withdraw(amt) {
    return parseInt((this.balance -= amt));
  }
  showData() {
    console.log(this.balance);
  }
}

const newAccount = new BankAccount();

newAccount.deposit(50);
newAccount.withdraw(20);
newAccount.showData();
