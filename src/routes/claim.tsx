
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import AppLayout from '../components/appLayout';

import Account from '../stores/account';

import { computed, observable, reaction, autorun } from 'mobx';

import { Button } from 'antd';

import { Link } from 'react-router-dom';


import { CONFIG } from '../config';

import Tokens from '../stores/tokens';
import { BigIntType, bi, ZERO, greaterThan, lessThanOrEqual } from 'jsbi-utils';


const mainnetLambda = "https://pz3ks5l8tb.execute-api.eu-west-1.amazonaws.com/mainnet/claim";
const testnetLamdba = "https://c90vfqfc1l.execute-api.eu-west-1.amazonaws.com/testnet/claim";

const Big = require('big.js');

interface Params {
  addr: string
}

interface Match {
  params: Params
}

interface ClaimProps {
  match: Match;
  account?: Account;
  tokens?: Tokens;
}

@inject('account', 'tokens')
@observer
export default class Claim extends React.Component<ClaimProps> {

  @computed
  get selectedToken() {
    const { tokens } = this.props;
    return tokens && tokens.tokenForColor(0);
  }

  @observable
  initing: boolean = true;

  @observable
  success: boolean = false;

  @observable
  amount: number;

  constructor(props) {
    super(props);

    this.init = this.init.bind(this);

    this.init();
  }

  init() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if(this.props.account.ready) {
          resolve()
        }
      }, 1000)
    })
    .then(() => {
      console.log("BEFORE FETCH");
      console.log(this.props.account.address);
      return fetch(mainnetLambda, {
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            envelopeAddr: this.props.match.params.addr,
            claimantAddr: this.props.account.address,
          }), 
      })
    })
    .then(response => response.json())
    .then(r => {
      const amount = r.amount;
      if (amount > 0) {
        this.amount = amount;
        this.initing = false;
        this.success = true;
      } else {
        this.initing = false;
        this.success = false;
      }
    })
    .catch(error => {
      this.initing = false;
      this.success = false;
    })
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(), 10000);
    // }).then(() => {
    //   this.initing = false;
    //   this.success = true;
    // })
  }

  render() {
    console.log(this.props.match.params.addr);
    console.log(this.props.account.address);

    const style = {
      width: "67%"
    }
    return (
      <AppLayout section="claim">
        <div>
          {this.initing && (
            <div>
              <h1> Opening your envelope... </h1> <br /> <br /> 
              <img src="https://s3-eu-west-1.amazonaws.com/redenvelope.me/ezgif.com-resize.gif" />
            </div>
          )}
          {(!this.initing && this.success) && (
            <div>
              <h1> You got {Big(this.amount.toString() || 0).div(10 ** 18).toFixed()} LEAP! </h1> <br /> <br />
              <img src="https://s3-eu-west-1.amazonaws.com/redenvelope.me/red+envelope4.jpg" /> <br /> <br />
              <Button style={style} onClick={() => {window.location = "https://mainnet.leapdao.org/wallet" as any}}> MANAGE FUNDS </Button> <br /> <br />
              <Button> <Link to={`/fundenvelope/0.01/3`}>FUND YOUR OWN ENVELOPE</Link></Button>
            </div>
          )}
          {(!this.initing && !this.success) && (
            <div>
              <h1> Better luck next time! </h1> <br /> <br />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7m3VLlfMcRJ2c-RlcXdAJk-PKqg5s9iAi3uLxiEnjPJq-bFGq" /> <br /> <br />
              <Button style={style} onClick={() => {window.location = "https://mainnet.leapdao.org/wallet" as any}}> MANAGE FUNDS </Button> <br /> <br />
              <Button> <Link to={`/fundenvelope/0.01/3`}> FUND YOUR OWN ENVELOPE</Link></Button>
            </div>
          )}
        </div>
      </AppLayout>
    );
  }
}
