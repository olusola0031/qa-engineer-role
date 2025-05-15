### Bug Analysis: Duplicate Todo Items When Added Quickly

---

**Steps to Reproduce (based on testing):**

1. Serve the app (`npm run dev`) and navigate to the todo interface.
2. Type a todo item (e.g., “Buy groceries”).
3. Press **Enter** multiple times rapidly.
4. Observe multiple identical todos being added.
5. Attempt to delete one of the duplicates.
6. Notice that **more than one instance** of the todo may be removed unexpectedly.

---

**🔍 Root Cause Hypothesis:**

* **ID Collision**:
  The todos are assigned IDs using `Math.floor(Date.now() / 1000)`, which only resolves to second-level precision. If a user hits Enter multiple times within the same second, multiple todos receive the **same ID**.

* **Side Effects of Non-Unique IDs**:

  * **Rendering Issue**: Vue’s list rendering via `:key="todo.id"` relies on unique keys. Non-unique keys may confuse the virtual DOM diffing algorithm, leading to rendering bugs or incorrect element updates.
  * **Deletion Bug**: When `deleteTodo(id)` is called, it removes **all todos with that ID**, unintentionally deleting multiple entries.

---

**How to Prevent Regression:**

1. **Ensure Unique IDs**
   Replace the ID generation logic with one that guarantees uniqueness, e.g.:

   ```js
   id: crypto.randomUUID() // modern and safe
   ```

   Or use a timestamp + counter fallback:

   ```js
   let counter = 0;
   function generateId() {
     return `${Date.now()}-${counter++}`;
   }
   ```

2. **Add Unit Tests to Guard Against Duplicate IDs**

   * Write a test that adds multiple todos rapidly and ensures their IDs are all unique.

3. **Test Keyed Rendering with Unique IDs**

   * Confirm `<li v-for="todo in todos" :key="todo.id">` works correctly without duplicate `:key`.

4. **E2E Regression Test**

   * Simulate rapid keydown events and ensure only distinct todos are added.
   * Ensure that deleting one does **not** affect others.

By correcting ID generation and backing it with tests, you eliminate the source of the issue and prevent related regressions in the future.
