import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from './AuthSlice';
import Header from '../Header';

const loginComponent = () => {
  /* eslint-disable */
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState("");
  const [ toChat, setToChat ] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleLogin = event => {
    event.preventDefault();
    dispatch(login(username));
    setToChat(true);
  }

  return (
    <div className="container">
      <div className="columns is-mobile">
        <Header />
      </div>
      {toChat && <Redirect to="/chat" />}
      <div className="columns is-mobile">
        <div class="column is-4 is-offset-4">
          <form onSubmit={e => handleLogin(e)}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => handleUsername(e)}
                />
              </div>
              <input
                className="button is-primary"
                type="submit" value="Chateaaar!"
                disabled={username == ""}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default loginComponent;
