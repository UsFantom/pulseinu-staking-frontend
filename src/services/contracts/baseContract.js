import { Contract } from 'ethers';

export class BaseContract {
  constructor(address, abi, provider) {
    this.address = address;
    this.reader = null;
    this.writer = null;

    this.connect(address, abi, provider);
  }

  connect(address = this.address, abi, provider) {
    this.reader = new Contract(address, abi, provider);
    this.writer = new Contract(address, abi, provider.getSigner());
  }
}
