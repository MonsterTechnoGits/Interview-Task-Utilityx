
## 🔧 Backend API Design 
### 🔌 API Overview

We'll expose a RESTful API to manage Boards, Stages, and Tasks. All endpoints are assumed to use JSON.

---

### 📘 **Board APIs**

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/boards`     | Get list of all boards          |
| GET    | `/boards/:id` | Get details of a specific board |
| POST   | `/boards`     | Create a new board              |
| PUT    | `/boards/:id` | Update board title/description  |
| DELETE | `/boards/:id` | Delete a board                  |

---

### 📗 **Stage (Column) APIs**

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| POST   | `/boards/:boardId/stages` | Create a new stage in a board |
| PUT    | `/stages/:id`             | Update stage title or order   |
| DELETE | `/stages/:id`             | Delete a stage and its tasks  |

---

### 📙 **Task APIs**

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/stages/:stageId/tasks` | Create a new task in a stage            |
| PUT    | `/tasks/:id`             | Edit task title, description, assignees |
| DELETE | `/tasks/:id`             | Delete a task                           |
| PUT    | `/tasks/:id/move`        | Move task to a new stage/order position |

#### 🔁 Task Movement (Drag & Drop)

**Reordering Within Same Stage**

* `PUT /tasks/:id/move`

  ```json
  {
    "stageId": "same_stage_id",
    "newOrder": 2
  }
  ```

**Moving Between Stages**

* `PUT /tasks/:id/move`

  ```json
  {
    "stageId": "new_stage_id",
    "newOrder": 0
  }
  ```

Backend logic will:

* Update the `stage_id` and `order` of the moved task.
* Recalculate the `order` values for all affected tasks in both the source and destination stages.

---
