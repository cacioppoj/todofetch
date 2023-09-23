import React from "react";
import { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [listToDo, setlistToDo] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (text.trim()) {
      if (editIndex !== null) {
        const newListToDo = [...listToDo];
        newListToDo[editIndex] = {
          label: text,
          done: listToDo[editIndex].done,
        };
        setlistToDo(newListToDo);
        setEditIndex(null);
      } else {
        setlistToDo([...listToDo, { label: text, done: false }]);
      }
      setText("");
    }
  };

  const handleRemoveToDo = (index) => {
    const newListToDo = listToDo.slice();
    newListToDo.splice(index, 1);
    setlistToDo(newListToDo);
  };

  const handleEditToDo = (index) => {
    setText(listToDo[index].label);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const newListToDo = [...listToDo];
    newListToDo[index].done = !newListToDo[index].done;
    setlistToDo(newListToDo);
  };

  return (
    <>
      <div className="container ">
        <Form onSubmit={handleAddTodo}>
          <Form.Group controlId="formBasicTaskTitle">
            <Form.Label>Task Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter A Task"
              name="taskTitle"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="btn btn-success">
            {editIndex !== null ? "Modificar" : "Agregar+"}
          </Button>
        </Form>

        <ListGroup>
          {listToDo.map((task, index) => {
            return (
              <ListGroup.Item
                key={index}
                variant={task.done ? "secondary" : "success"}
                className="mt-4"
              >
                <Form.Check
                  inline
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleComplete(index)}
                />
                <span
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.label}
                </span>
                <Button
                  type="button"
                  variant="danger"
                  value={index}
                  className="ms-3"
                  onClick={() => handleRemoveToDo(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default Home;
