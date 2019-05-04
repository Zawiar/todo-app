import React from "react";
import logo from "./logo.svg";
import Listitem from "./Listitem";
import axios from "axios";
import "./App.css";
import loader from "./loader.gif";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      newTodo: "",
      editing: false,
      editingIndex: false,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = "http://5ccc93b4f47db800140112b3.mockapi.io";

    this.handleChange = this.handleChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);

    this.alert = this.alert.bind(this);
  }
  //Feching data from the api
  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);

    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 500);
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  async addTodo() {
    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;

    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ""
    });

    this.alert("Todo Added Successfully");
  }

  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];

    this.setState({
      todos
    });

    this.alert("Todo Deleted Successfully");
  }

  editTodo(index) {
    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos: todos,
      editing: false,
      editingIndex: null,
      newTodo: ""
    });

    this.alert("Todo Updated Successfully");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>CRUD REACT</h1>
        </header>
        <div className="container">
          {this.state.notification && (
            <div className="alert alert-success mt-3">
              <p className="text-center">{this.state.notification}</p>
            </div>
          )}
          <input
            name="todo"
            type="text"
            className="form-control my-4"
            placeholder="Add a New Todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
          <button
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            className="btn-success mb-3 form-control"
            disabled={this.state.newTodo.length < 5}
          >
            {this.state.editing ? "Update Todo" : "Add Todo"}
          </button>
          {this.state.loading && <img src={loader} alt="loader" />}
          {(!this.state.editing || this.state.loading) && (
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return (
                  <Listitem
                    key={item.id}
                    item={item}
                    editTodo={() => {
                      this.editTodo(index);
                    }}
                    deleteTodo={() => {
                      this.deleteTodo(index);
                    }}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
