

import * as React from 'react';
import { observer } from 'mobx-react';
import AppLayout from '../../components/appLayout';
import { CONFIG } from '../../config';

@observer
export default class Home extends React.Component {
  render() {
    return (
      <AppLayout section="home">
        <div style={{ maxWidth: '500px' }}>

          <h1>RED ENVELOPE ME</h1>
          <p>
            Red Envelope is a gifting app. By using the Status.im chat you can gift to anyone in an instant.
            The catch is the Red Envelope gives you all of the gift, some of the gift or no gift at all. Try your luck on
            the app.
          </p>
          <img src="https://user-images.githubusercontent.com/659301/52917683-9c06d280-32ab-11e9-9957-0a30db18a3d4.png" />
          <p>
             Instructions: <br/>
             1.) Scan QR code with Status app <br/>
             2.) Install extension
             3.) Type /fundredenv {'{'}amountToGift{'}'} {'{'}numberOfRecipients{'}'}
          </p>
          <a href="https://github.com/eshavkun/redenvelope-extension/files/2873294/Red.envelope-compressed.pdf">Presentation</a>
          <a href="https://youtu.be/xst03mSqyx8">Video demo</a>

        </div>
      </AppLayout>
    );
  }
}