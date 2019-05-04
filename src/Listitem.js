import React from "react";

function Listitem(props) {
  return (
    <div>
      <li className="list-group-item">
        <button onClick={props.editTodo} className="btn-sm btn btn-info mr-4">
          U
        </button>
        {props.item.name}
        <button
          onClick={props.deleteTodo}
          className="btn-sm btn btn-danger ml-4"
        >
          X
        </button>
      </li>
    </div>
  );
}
export default Listitem;
