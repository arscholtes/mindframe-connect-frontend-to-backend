import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      // The internal state of the component. In this case, we want to keep
      // track of the title, body, and user_id entered, as well as the reponse
      // data.
      this.state = {
        title: "",
        body: "",
        user_id: "",
        data:[]
      }
  }

  // This happens the first time the component is rendered. here we want to get all entries on app load
  componentDidMount() {
    this.getEntries();
  }

  addEntry = () => {
    const {title, body, user_id} = this.state;

    // Your API expects POST data to be sent as form data, which is why we need the next few lines
    const form = new FormData();
    form.append("title", title);
    form.append("body", body);
    form.append("user_id", user_id);
    // This particular end point is used to create a new journal entry
    fetch("https://mindframebackend.herokuapp.com/entries", {
        method: "POST",
        body: form
    })
    // The response type of the request is JSON
    .then(response => response.json())
    // Once we add a new journal entry, we should fetch all journal entries so that we can update the display
    .then(this.getEntries())
  }

  getEntries = () => {
    /// This end point just gets a list of all entries
    fetch("https://mindframebackend.herokuapp.com/entries")
      .then(r => r.json())
      .then(data => this.setState({data}))
  }

  // We call this event handler when a key is pressed in any of the inputs. If the key is the Enter key, go ahead and call addEntry
  update = e => {
    const {title, body, user_id} = this.state;
    if (e.key === "Enter" && title.length && body.length && user_id.length) {
        this.addEntry();
    }
  }

  render() {
    const {title, body, user_id, data} = this.state;

    return (
      <div>
        {/* Here, we just have an input for each value we want to get from the user */}
        {/* value is what shows up in the input */}
        {/* event handler for when any key is pressed */}
        {/* event handler for when the value of the input changes */}
        <input
          tabIndex="0"
          value={title}
          onKeyPress={this.update}
          placeholder="Title"
          onChange={e => this.setState({title: e.target.value})}
        />
        <input
          value={body}
          placeholder="Body"
          onKeyPress={this.update}
          name="body"
          onChange={e => this.setState({body: e.target.value})}
        />
        <input
          value={user_id}
          placeholder="User ID"
          onKeyPress={this.update}
          type="number"
          onChange={e => this.setState({user_id: e.target.value})}
        />
        {/* Here, we are mapping over each result and turning each entry ento an unordered list -- you'll probably want to do something different */}
        {data.map(entry =>
          <div>
            <li>{entry.title}</li>
            <li>{entry.body}</li>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default App;
