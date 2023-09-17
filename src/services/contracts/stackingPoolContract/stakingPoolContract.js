import { ethers } from 'ethers';
import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class StakingPoolContract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }

  async totalReward() {
    return this.reader.totalReward();
  }

  async totalStaked() {
    return this.reader.totalStaked();
  }

  async userStakingInfo(account) {
    return this.reader.userStakingInfo(account);
  }

  async stake(amount, days, referrer = ethers.ZeroAddress) {
    return this.writer.stake(amount, days, referrer);
  }

  async referrals(account) {
    return this.reader.referrals(account);
  }
}
