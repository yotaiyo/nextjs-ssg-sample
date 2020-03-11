import fetch from 'isomorphic-unfetch'

function showTodoTitle({ todo }) {
  return <div>Todo Title: {todo.title}</div>
}

showTodoTitle.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const todo = await res.json()
  return { todo }
}

export default showTodoTitle