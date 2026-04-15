# CHANGES.md

## Section 1 - Variable Renames

| Old Name | New Name            | Why                                                  |
| -------- | ------------------- | ---------------------------------------------------- |
| d        | confessionData      | 'd' gave no information about what the variable held |
| arr      | filteredConfessions | describes both the type (array) and its contents     |
| x        | confessionIdCounter | used to generate unique IDs, old name was unclear    |
| r        | requestParams       | represents route parameters, improves readability    |
| tmp      | newConfession       | clearly represents newly created confession object   |
| i        | confessionId        | indicates it stores an ID value from params          |
| handler  | confessionIndex     | represents index of confession in array              |
| stuff    | filteredConfessions | vague name replaced with descriptive one             |
| cat      | category            | improves clarity and readability                     |
| res2     | apiResponse         | better represents response data structure            |

---

## Section 2 - Function Splits

### handleAll() split into:

- createConfession() - handles creation of a new confession including validation and storage
- getAllConfessions() - retrieves all confessions sorted by newest first
- getConfessionById() - fetches a single confession based on ID
- getConfessionsByCategory() - filters confessions based on category
- deleteConfession() - deletes a confession after validating authorization token

### Additional Refactoring

- Introduced MVC architecture:
  - routes/ → handles HTTP endpoints
  - controllers/ → manages request and response flow
  - services/ → contains all business logic

- Moved business logic from controller to service layer to ensure separation of concerns

- Replaced hardcoded values with environment variables:
  - PORT → configurable server port
  - DELETE_TOKEN → secure authorization token

- Added inline comments to explain WHY certain logic exists, improving maintainability

### Why:

The original `handleAll()` function handled multiple responsibilities such as validation, data manipulation, and response formatting. This made the code difficult to understand, maintain, and test.

By splitting it into smaller, single-responsibility functions and introducing an MVC structure:

- Each function now does one specific task
- Code readability is improved
- Debugging and testing become easier
- Application becomes scalable and maintainable
