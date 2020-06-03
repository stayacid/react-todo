import React, { useState } from "react";
import PropTypes from "prop-types";

// custom hook
function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");
  const styles = {
    input: {
      width: "100%",
      padding: ".5rem 1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    button: {
      flexShrink: 0,
      marginLeft: "1rem",
    },
  };

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form
      style={{ marginBottom: "1rem", display: "flex" }}
      onSubmit={submitHandler}
    >
      <input {...input.bind} style={styles.input} />
      <button type="submit" style={styles.button} className="btn">
        Add todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
