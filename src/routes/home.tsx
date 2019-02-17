

import * as React from 'react';
import { observer } from 'mobx-react';
import AppLayout from '../components/appLayout';

@observer
export default class Home extends React.Component {
  render() {
    return (
      <AppLayout section="home">
        &nbsp;
      </AppLayout>
    );
  }
}
