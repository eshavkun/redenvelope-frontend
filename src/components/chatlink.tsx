import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { computed, observable, reaction, autorun } from 'mobx';

import { Form, Button, Table, Select } from 'antd';

const { Fragment } = React;

interface LinkProps {
  text: string;
}

@observer
export default class ChatLink extends React.Component<LinkProps> {

  @observable
  textArea: any;

  render() {
    const style = {
      height: "120px",
      width: "200"
    }
    console.log(this.textArea);
    return(
      <Fragment>
        <form>
          <textarea
            ref={(textarea) => this.textArea = textarea}
            value={this.props.text}
            style={style}
          />
        </form> <br />
        <Button onClick={(e) => {
          this.textArea.select();
          document.execCommand('copy');
          e.target.focus();
        }}>
          Copy
        </Button>
      </Fragment>
    );
  }

}
