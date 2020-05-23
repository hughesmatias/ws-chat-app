import React, { Component, ChangeEvent } from "react";
import { connect } from 'react-redux';
import SimpleMention from './SimpleMention';
import Header from '../Header';

interface Message {
  message: any,
  user:string,
}

type ChatStates = {
  ws: WebSocket,
  message: any,
  usersWriting: Array<string>,
  chat: Array<Message>,
};

const WRITING_MESSAGE = "writing_message";
const CHAT_MESSAGE = "chat_message";

class Chat extends Component<{
  username: string,
}, ChatStates> {
  componentWillMount() {
    let ws = new WebSocket("ws://localhost:8000/ws/chat/internal/");
    ws.onmessage = (evt) => {
      const eventObj = JSON.parse(evt.data);
      // events pueden ser de mensaje o de que un usuario esta escribiendo
      switch (eventObj.type) {
        case CHAT_MESSAGE:
          const messageObj: Message = eventObj.data;
          this.updateChat(messageObj);
          break;
        case WRITING_MESSAGE:
          const writingMessageObj: any = eventObj.data;
          this.updateWritingList(writingMessageObj);
          break;
      }
    }

    this.setState({
      ws: ws,
      chat: [],
      usersWriting: [],
    });
  }

  handleNewMessage(value: any) {
    this.setState({
      message: JSON.stringify(value),
    });
  }

  updateChat(message: Message) {
    let { chat } = this.state;
    chat.push(message);
    this.setState({
      chat,
    });
  }

  updateWritingList(writingMessageObj: string[]) {
    this.setState({
      usersWriting: writingMessageObj.filter(w => w != null)
    })
  }

  toggleUser(add: boolean) {
    const writing = {
      type: WRITING_MESSAGE,
      data: {
        user: this.props.username || localStorage.getItem("username"),
        add,
      }
    };

    this.state.ws.send(JSON.stringify(writing));
  }

  sendMessage() {
    const messageObj = {
      type: CHAT_MESSAGE,
      data: {
        message: this.state.message,
        user: this.props.username || localStorage.getItem("username"),
      }
    };
    this.setState({
      message: [],
    });
    
    this.state.ws.send(JSON.stringify(messageObj));
  }

  renderMessageObj(messages: any) {
    const obj = JSON.parse(messages);
    return obj.blocks.map((message: any, key: number) => {
      return `${message.text} `
    })
  }

  render() {
    const {
      chat,
      usersWriting,
    } = this.state;

    return (
      <div className="container">
        <div className="columns is-mobile">
          <Header />
        </div>
        <div className="columns is-mobile">
          <div
            className="column is-4 is-offset-4"
            style={{
              height: '50vh',
              overflowY: 'auto',
            }}
          >
            {
              chat && chat.map(
                (message: Message, key: number) => 
                <article className="message" key={key}>
                  <div className="message-body">
                    {message.user} - {this.renderMessageObj(message.message)}
                  </div>
                </article>
              )
            }
          </div>
        </div>
        <SimpleMention
          handleMessage={(e: any) => this.handleNewMessage(e)}
          toggleUser={(e: any) => this.toggleUser(e)}
          value={this.state.message}
        />

        <div className="columns is-mobile">
          <div className="column is-4 is-offset-4">
            {usersWriting.length > 0 && <p>
              {
                usersWriting.map(
                  (user: string, key: number) =>
                  <span key={key}>{user}</span>
                )
              } {usersWriting.length == 1 ? "esta" : "estan"} escribiendo
              </p>
            }
            <button
              className="button is-primary"
              onClick={() => this.sendMessage()}
            >Enviar mensaje</button>
          </div>
        </div>
      </div>
    );
  }
}

interface AuthObj {
  auth: {
    username: string,
  }
};

const mapStateToProps = ({ auth } : AuthObj) => {
  return {
    username: auth.username,
  }
};

export default connect(mapStateToProps)(Chat);
