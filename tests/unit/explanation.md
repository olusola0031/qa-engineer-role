# Todo.vue Unit Test Summary

## Mocking
No external dependencies or APIs required mocking as all logic is self-contained in the component.

## Failing Test Fix (Example)
**Failing:** Adding an empty todo did not show the error message because the error logic was incorrect (e.g., `if (!newTodo)` instead of checking `.length`).

**Fix Applied:** 
```js
if (newTodo.value.length === 0) {
  error.value = 'Todo cannot be empty'
}

