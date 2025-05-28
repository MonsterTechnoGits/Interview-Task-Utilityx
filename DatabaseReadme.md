## 🗄️ Database Design

### 📌 **Data Modeling**

To support boards, stages (columns), tasks (cards), and users, we'll use a relational model. Each entity is represented by a table, with foreign keys to establish relationships.

---

### 📋 **Tables to Create**

1. **`users`**

   * `id` (PK)
   * `name`
   * `email`
   * `avatar_url` (nullable)

2. **`boards`**

   * `id` (PK)
   * `title`
   * `description` (nullable)
   * `created_by` (FK → `users.id`)
   * `created_at`

3. **`stages`**

   * `id` (PK)
   * `board_id` (FK → `boards.id`)
   * `title`
   * `order` (integer) – determines column position
   * `created_at`

4. **`tasks`**

   * `id` (PK)
   * `stage_id` (FK → `stages.id`)
   * `title`
   * `description` (nullable)
   * `order` (integer) – determines card order within a stage
   * `created_at`

5. **`task_assignees`**

   * Composite table for many-to-many between tasks and users
   * `task_id` (FK → `tasks.id`)
   * `user_id` (FK → `users.id`)

---

### 🔁 **Table Relationships**

* A `board` can have **many stages**.
* A `stage` belongs to **one board**.
* A `stage` can have **many tasks**.
* A `task` belongs to **one stage**.
* A `task` can be assigned to **multiple users**.
* A `user` can be assigned to **multiple tasks**.

---
