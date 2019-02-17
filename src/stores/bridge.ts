
import { reaction, action } from 'mobx';
import autobind from 'autobind-decorator';
import { bridge as bridgeAbi } from '../utils/abis';

import ContractStore from './contractStore';
import Transactions from '../components/txNotification/transactions';

import Web3Store from './web3/';
import PlasmaConfig from './plasmaConfig';

export default class Bridge extends ContractStore {

  constructor(
    transactions: Transactions,
    web3: Web3Store,
    private readonly plasmaConfig: PlasmaConfig,
    address?: string
  ) {
    super(bridgeAbi, address, transactions, web3);

    if (plasmaConfig.bridgeAddr) {
      this.setAddress();
    } else {
      reaction(() => plasmaConfig.bridgeAddr, this.setAddress);
    }
    
  }

  @autobind
  @action
  private setAddress() {
    if (!this.plasmaConfig.bridgeAddr) return;
    this.address = this.plasmaConfig.bridgeAddr;
  }

}
