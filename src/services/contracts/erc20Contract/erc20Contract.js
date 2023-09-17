import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class ERC20Contract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }

  async name() {
    return this.reader.name();
  }

  async symbol() {
    return this.reader.symbol();
  }

  async allowance(ownerAddress, spenderAddress) {
    return this.reader.allowance(ownerAddress, spenderAddress);
  }

  async balanceOf(address) {
    return this.reader.balanceOf(address);
  }

  async decimals() {
    return this.reader.decimals();
  }

  async totalSupply() {
    return this.reader.totalSupply();
  }

  async approve(spenderAddress, amount) {
    return this.writer.approve(spenderAddress, amount);
  }
}
