import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class BoostNftContract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }

  async tokenTypePrice(type) {
    return this.reader.tokenTypePrice(type);
  }

  async mint(type) {
    return this.writer.mint(type);
  }

  async totalSupply() {
    return this.reader.totalSupply();
  }

  async tokenIdToType(id) {
    return this.reader.tokenIdToType(id);
  }
}
