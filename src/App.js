import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { text: "Fertilizer", id: "1", Image: "https://www.istockphoto.com/photo/yellow-gloved-hand-holding-a-green-scoop-with-fertilizer-gm93478217-11026560" },
        { text: "Jembe", id: "2" },
        { text: "Seedlings", id: "1" },
        { text: "Jembe", id: "2" }
      ],
      text: "",
      updateText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Farm Input Management System</h1>

        <form onSubmit={this.handleSubmit}>
          Farm Input Name
          <input
            type="text"
            value={this.state.text}
            placeholder="Enter Farm Input Name"
            onChange={this.handleChange}
          />
          <button type="submit" className="btn save-btn">
            Add Input
          </button>
        </form>

        <h1> Farm Inputs in Stock</h1>

        <table className="crud-table">
          <thead>
            <tr>
              <th>Farm Input Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={item.id + index}>
                <td className={item.showHide ? "hidden" : ""}> {item.text} </td>
                <td className={item.showHide ? "" : "hidden"}>
                  <input
                    type="text"
                    onChange={this.updateChange}
                    defaultValue={item.text}
                  />
                </td>
                <td>
                  <button
                    className={item.showHide ? "hidden" : "btn save-btn"}
                    onClick={() => this.update(item)}
                  >
                    Update
                  </button>
                  <button
                    className={item.showHide ? "btn save-btn" : "hidden"}
                    onClick={() => this.save(item)}
                  >
                    Save
                  </button>
                  <button
                    className="btn del-btn"
                    onClick={() => this.delete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  delete(e) {
    this.state.items.splice(this.state.items.indexOf(e), 1);
    this.setState({ items: this.state.items });
  }
  updateChange(e) {
    this.setState({ updateText: e.target.value });
  }
  update(e) {
    e.showHide = true;
    this.setState(e);
  }
  save(e) {
    const updateItem = {
      text: this.state.updateText ? this.state.updateText : e.text,
      id: Date.now()
    };
    this.state.items.splice(this.state.items.indexOf(e), 1, updateItem);
    this.setState({ items: this.state.items });
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.state.items.unshift(newItem);
    this.setState({ items: this.state.items });
  }
}

export default App;
