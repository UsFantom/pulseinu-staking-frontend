import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class StakingTokenContract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }

  async contractInfo() {
    return this.reader.contractInfo();
  }

  async claimReferrer(proof, percent) {
    return this.writer.claimReferrer(proof, percent);
  }

  async claimFirstAdopter(proof) {
    return this.writer.claimFirstAdopter(proof);
  }
}
