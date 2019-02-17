

import * as React from 'react';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';

import Web3SubmitWarning from '../../components/web3SubmitWarning';

import Deposit from './deposit';
import AppLayout from '../../components/appLayout';
import Tokens from '../../stores/tokens';
import Account from '../../stores/account';
import HexString from '../../components/hexString';

interface Params {
  num: number;
  value: number;
}

interface Match {
  params: Params
}

interface WalletProps {
  tokens: Tokens;
  account: Account;
  match: Match;
}

@inject('tokens', 'account')
@observer
export default class Wallet extends React.Component<WalletProps, any> {
  @computed
  private get selectedToken() {
    const { tokens } = this.props;
    return tokens && tokens.tokenForColor(this.color);
  }

  @observable
  private color = 0;

  render() {

    const { account, tokens } = this.props;

    if (!account.address) {
      return (
        <AppLayout section="wallet">
          <Web3SubmitWarning />
        </AppLayout>
      );
    }

    if (!tokens.ready || !this.selectedToken || !this.selectedToken.ready) {
      return <AppLayout section="wallet" />;
    }

    if (tokens.list.length === 0) {
      return (
        <AppLayout section="wallet">
          <div style={{ textAlign: 'center', margin: 50, fontSize: 18 }}>
            You need to register some token first
          </div>
        </AppLayout>
      );
    }

    return (
      <AppLayout section="wallet">
        <Web3SubmitWarning />
        <Deposit
          color={this.color}
          onColorChange={color => {
            this.color = color;
          }}
          num={this.props.match.params.num}
          value={this.props.match.params.value}
        />
      </AppLayout>
    );
  }
}
