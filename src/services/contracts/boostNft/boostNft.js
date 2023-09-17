import { BaseContract } from '../baseContract';
import contractAbi from './abi.json';

export class BoostNftContract extends BaseContract {
  constructor(address, provider) {
    super(address, contractAbi, provider);
  }
}
