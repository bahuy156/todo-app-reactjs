import classNames from "classnames/bind";
import { useRef, useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPenToSquare,
  faTrashCan,
  faSpinner,
  faArrowRightFromBracket,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Main.module.scss";

const cx = classNames.bind(styles);

function Main() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(() => {
    const storageTodos = JSON.parse(localStorage.getItem("Todo List"));

    return storageTodos ?? [];
  });
  const [editting, setEditting] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [itemComplete, setItemComplete] = useState(false);

  const inputRef = useRef();

  // animation loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  // handle Logout
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };

  // handle add todo
  const handleAddTodo = () => {
    if (!value.trim()) {
      return;
    }

    setTodos((prev) => {
      const newTodos = [...prev, value];
      localStorage.setItem("Todo List", JSON.stringify(newTodos));

      return newTodos;
    });
    setValue("");

    inputRef.current.focus();
  };

  const handleEnterAdd = (e) => {
    if (!value.trim()) {
      return;
    } else if (e.keyCode === 13) {
      setTodos((pev) => {
        const newTodos = [...pev, value];

        localStorage.setItem("Todo List", JSON.stringify(newTodos));

        return newTodos;
      });
      setValue("");
    }
  };

  // handle delete todo
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    localStorage.setItem("Todo List", JSON.stringify(newTodos));

    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    localStorage.clear();

    const newTodos = [];
    setTodos(newTodos);

    localStorage.setItem("Todo List", JSON.stringify(newTodos));
  };

  // handle edit todo
  const handleEdit = (index, newTodo) => {
    const newTodos = todos.map((todo, todoIndex) => {
      return todoIndex === index ? newTodo : todo;
    });

    if (!newTodo.trim()) {
      return;
    } else {
      setTodos(newTodos);
    }

    localStorage.setItem("Todo List", JSON.stringify(newTodos));
  };

  const handleEnterEdit = (e) => {
    if (e.keyCode === 13) {
      setEditting(null);
    }
  };

  // handle Active Item
  const handleItemComplete = (todo, index) => {
    // const newTodos = [...todos];
    // const todoIndex = newTodos[index];
    // if (todo === todoIndex) {
    //   setItemComplete(!itemComplete);
    // }
  };

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <div className={cx("loading")}>
          <FontAwesomeIcon className={cx("icon-loading")} icon={faSpinner} />
          <p className={cx("text-loading")}>Loading</p>
        </div>
      ) : (
        <div className={cx("content")}>
          <div className={cx("logout")} onClick={handleLogOut}>
            <span className={cx("logo-logout")}>
              <FontAwesomeIcon
                className={cx("icon-logout")}
                icon={faArrowRightFromBracket}
              />
            </span>
            <span className={cx("text-logout")}>Logout</span>
          </div>

          <h1 className={cx("header")}>What's the Plan for Today ?</h1>

          <div className={cx("todo-list")}>
            <div className={cx("todo-header")}>
              <input
                className={cx("input-add")}
                ref={inputRef}
                value={value}
                autoFocus
                placeholder="What needs to be done ?"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleEnterAdd(e)}
              />
              <div className={cx("btn-todo-header")}>
                <button className={cx("btn-add")} onClick={handleAddTodo}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button
                  className={cx("btn-delete-all")}
                  onClick={handleDeleteAll}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>

            <div className={cx("todo-item")}>
              {todos.map((todo, index) => {
                return (
                  <Fragment key={index}>
                    {editting === index ? (
                      <div className={cx("todo-item-edit")}>
                        <input
                          className={cx("input-edit")}
                          autoFocus
                          type="text"
                          defaultValue={todo}
                          onChange={(e) => handleEdit(index, e.target.value)}
                          onKeyDown={(e) => handleEnterEdit(e)}
                        />
                        <button
                          className={cx("btn-done")}
                          onClick={() => setEditting(null)}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div className={cx("todo-item-child")}>
                        <div className={cx("content-main")}>
                          <button
                            className={cx("btn-check")}
                            onClick={() => handleItemComplete(todo, index)}
                          >
                            <FontAwesomeIcon
                              className={cx("icon-check")}
                              icon={faCheck}
                            />
                          </button>
                          <span className={cx("item")}>{todo}</span>
                        </div>
                        <div className={cx("btn")}>
                          <button
                            className={cx("btn-edit")}
                            onClick={() => setEditting(index)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className={cx("btn-delete")}
                            onClick={() => handleDeleteTodo(index)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
