import React, { Component } from 'react';
import Emoji from './emoji';
import moment from 'moment';


class ContactDetail extends Component {
  render() {
    const {message } = this.props
    let align;
    if(message.socketId === undefined) {
      align = "bubble you"
    } else {
      align = "bubble me"
    }

    return (
              <div className="chat">
                <div className={align}>
                <Emoji message={message.body}  />
                  <span className="timer">
                    {moment().startOf('day').fromNow()}
                  </span>
                </div>


            </div>
      );
  }
}


export default  ContactDetail;
