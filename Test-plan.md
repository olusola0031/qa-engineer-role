
# Todo App - High-Level Test Plan

## Overview
This test plan outlines the testing strategy for a simple Vue-based Todo app. The app allows users to add, filter, and delete todo items.

## Objective

To ensure the reliability, correctness, and usability of the Todo List component that allows users to add, delete, and filter tasks.

## Scope

This test plan covers unit testing, integration testing, and end-to-end (E2E) testing for the todo list functionality including input validation, todo creation/deletion, and filtering.

## Types of Tests

| Test Type         | Focus                                                                  | Tools (Example)     |
| ----------------- | ---------------------------------------------------------------------- | ------------------- |
| Unit Tests        | Functions: `addTodo`, `deleteTodo`, and computed `filteredTodos`       | Jest, Vitest        |
| Integration Tests | Vue template interaction with logic (e.g., typing input updates model).
                      Verify interactions between components and data bindings               | Vue Test Utils      |
| E2E Tests         | Simulate full user interaction flow (UI input to list changes)         | Cypress, Playwright |

## Test Priorities

| Priority | Feature                        | Reason                                                         |
| -------- | ------------------------------ | -------------------------------------------------------------- |
| High     | Adding a Todo                  | Core functionality; critical path for app usability            |
| High     | Deleting a Todo                | Direct impact on data integrity                                |
| High     | Input Validation (empty todos) | Prevent user error, important for UX                           |
| Medium   | Filtering (short/long)         | Important for usability but not blocking                       |
| Low      | Error Message Rendering        | UI feedback; not business-critical but important for UX polish |

## Test Environment

* Vue 3 with `<script setup>`
* Node.js environment
* Browser compatibility: Chrome (latest), Firefox, Edge
* Test runners: Vitest for unit/integration, Cypress for E2E

## Success Criteria

* All high-priority tests pass
* No critical bugs in the main flow (add/delete/filter)
* Good coverage of edge cases (e.g., empty input, special characters)

## Detailed Test Cases

### Test Case 1: Add Valid Todo Item
- **Description:** Ensure a valid todo item is added to the list.
- **Preconditions:** App is loaded.
- **Steps to Reproduce:**
  1. Type "Buy milk" in the input field.
  2. Press Enter.
- **Expected Result:** "Buy milk" appears in the todo list.

### Test Case 2: Add Empty Todo Item
- **Description:** Ensure an empty todo cannot be added.
- **Preconditions:** App is loaded.
- **Steps to Reproduce:**
  1. Leave the input field empty.
  2. Press Enter.
- **Expected Result:** Error message "Todo cannot be empty" is displayed.

### Test Case 3: Delete Todo Item
- **Description:** Ensure an item is removed from the list when deleted.
- **Preconditions:** At least one todo is added.
- **Steps to Reproduce:**
  1. Click "Delete" on a todo item.
- **Expected Result:** The item is removed from the list.

### Test Case 4: Filter Short Todos
- **Description:** Show only todos with 10 characters or less.
- **Preconditions:** Multiple todos with varying lengths exist.
- **Steps to Reproduce:**
  1. Select "Short" from the filter dropdown.
- **Expected Result:** Only todos with text length ≤ 10 are displayed.

### Test Case 5: Filter Long Todos
- **Description:** Show only todos with more than 10 characters.
- **Preconditions:** Multiple todos with varying lengths exist.
- **Steps to Reproduce:**
  1. Select "Long" from the filter dropdown.
- **Expected Result:** Only todos with text length > 10 are displayed.
