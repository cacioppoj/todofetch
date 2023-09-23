import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [listToDo, setlistToDo] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [username, setUsername] = useState("");

  const API_URL =
    "https://playground.4geeks.com/apis/fake/todos/user/cacioppoj";

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setlistToDo(data))
      .catch((error) => console.log("Error"));
  }, []);

  const handleCreateUserTodoList = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });

      const data = await response.json();

      if (data.result === "ok") {
        alert("To Do Creado");
      } else {
        alert("Error de api");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  };
  const syncTareas = (updatedTareas) => {
    console.log(updatedTareas);
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(updatedTareas),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error");
        return response.json();
      })
      .then((data) => alert(data.msg))
      .catch((error) => console.error("Error actualizando data:", error));
  };

  const createUser = () => {
    fetch(API_URL, {
      method: "POST",
      body: [],
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error");
        return response.json();
      })
      .then((data) => setlistToDo(data))
      .catch((error) => console.error("Error actualizando data:", error));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (text.trim()) {
      if (editIndex !== null) {
        const newListToDo = [...listToDo];
        newListToDo[editIndex] = {
          label: text,
          done: listToDo[editIndex].done,
        };
        setlistToDo(newListToDo);
        syncTareas(newListToDo);
        setEditIndex(null);
      } else {
        setlistToDo([...listToDo, { label: text, done: false }]);
        syncTareas([...listToDo, { label: text, done: false }]);
      }
      setText("");
      setEditIndex(null);
    } else {
      alert("Por favor agrega una tarea valida");
    }
  };

  const handleRemoveToDo = (index) => {
    const newListToDo = listToDo.slice();
    newListToDo.splice(index, 1);
    setlistToDo(newListToDo);
    syncTareas(newListToDo);
  };

  // const handleEditToDo = (index) => {
  //   setText(listToDo[index].label);
  //   setEditIndex(index);
  // };

  const handleToggleComplete = (index) => {
    const newListToDo = [...listToDo];
    newListToDo[index].done = !newListToDo[index].done;
    setlistToDo(newListToDo);
    syncTareas(newListToDo);
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.result === "ok") {
        setlistToDo([]);
        alert("Todas las tareas del usuario han sido borradas exitosamente.");
      } else {
        alert("Hubo un error al intentar borrar las tareas.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al intentar borrar las tareas.");
    }
  };

  return (
    <>
      <div className="container d-flex flex-column">
        <div className="d-flex justify-content-end mb-3">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={handleCreateUserTodoList}
              className="btn btn-primary mt-2"
            >
              Crear Todo List
            </Button>
          </Form>
        </div>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="container"
          style={{
            maxWidth: "400px",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <Form onSubmit={handleAddTodo}>
            <Form.Group controlId="formBasicTaskTitle">
              <Form.Label>Tarea:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Tarea"
                name="taskTitle"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex mt-3">
              <Button type="submit" className="ms-auto me-2 btn btn-success">
                {editIndex !== null ? "Modificar" : "Agregar+"}
              </Button>
            </div>
          </Form>
          <ListGroup>
            {listToDo.length > 0
              ? listToDo?.map((task, index) => {
                  return (
                    <ListGroup.Item
                      key={index}
                      variant={task.done ? "secondary" : "success"}
                      className="mt-4"
                    >
                      <div className="d-flex align-items-center">
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
                          className="ms-auto"
                          onClick={() => handleRemoveToDo(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  );
                })
              : "No Tareas"}
          </ListGroup>

          <Button onClick={handleDeleteAll} className="btn btn-danger mt-3">
            Borrar todas las tareas
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
