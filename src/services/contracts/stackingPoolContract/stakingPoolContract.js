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

  async totalRewardPaid() {
    return this.reader.totalRewardPaid();
  }

  async getShareRateBasis() {
    return this.reader.SHARE_RATE_BASIS();
  }

  async currentShareRate() {
    return this.reader.currentShareRate();
  }

  async totalStaked() {
    return this.reader.totalStaked();
  }

  async userStakingInfo(account) {
    return this.reader.userStakingInfo(account);
  }

  async getPinuPriceOfPls() {
    return this.reader.getPinuPriceOfPls();
  }

  async getPlsPriceOfUsd() {
    return this.reader.getPlsPriceOfUsd();
  }

  async getCurrentDay() {
    return this.reader.getCurrentDay();
  }

  async getUserStakeHistory(account) {
    return this.reader.getUserStakeHistory(account);
  }

  async stake(amount, days, referrer = ethers.constants.AddressZero, stakingFee) {
    return this.writer.stake(amount, days, referrer, { value: stakingFee });
  }

  async unstake() {
    return this.writer.unstake();
  }

  async getUserReferrals(account) {
    return this.reader.getUserReferrals(account);
  }

  async getStakingReferrerPercent() {
    return this.reader.STAKING_REFERRER_PERCENT();
  }

  async stakingFee() {
    return this.reader.stakingFee();
  }

  async getLengthBonus(amount, days) {
    return this.reader.getLengthBonus(amount, days);
  }

  async getUserBoostPercent(account) {
    return this.reader.getUserBoostPercent(account);
  }

  async getUserRewards(account) {
    return this.reader.getUserRewards(account);
  }

  async calcShares(amount, days, boostPercent) {
    return this.reader.calcShares(amount, days, boostPercent);
  }
}
