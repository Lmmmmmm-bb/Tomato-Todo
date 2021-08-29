export const TodosControllerDes = {
  getAllTodos: {
    response: {
      ok: 'Fetch data from database success.',
      notFound: 'Some problems with the database.'
    }
  },
  getTodoByUUID: {
    query: 'Find Todo By UUID.',
    response: {
      ok: 'Find Todo By UUID from database success.',
      notFound: 'Find Todo By UUID from database fail.'
    }
  },
  createTodo: {
    body: 'Create Todo.',
    response: {
      ok: 'Create Todo success.',
      conflict: 'This Todo already exist. Insert to SQL conflict.'
    }
  },
  deleteTodoByUUID: {
    body: 'Delete the specified todo based on UUID.',
    response: {
      ok: 'Delete Todo success.',
      notFound: 'This UUID Todo is not found.'
    }
  },
  saveTodoByUUID: {
    body: 'Edit Todo By UUID.',
    response: {
      ok: 'Edit Todo By UUID success.',
      notFound: 'Edit Todo fail.'
    }
  }
};
