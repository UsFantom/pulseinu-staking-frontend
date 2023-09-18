import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class BoostNftContract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }

  async mint(amount, days, referrer = ethers.ZeroAddress) {
    return this.writer.stake(amount, days, referrer);
  }
}
