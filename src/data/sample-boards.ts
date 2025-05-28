import type { Board } from "../types";

export const sampleBoards: Board[] = [
  {
    id: "1",
    title: "Project Alpha",
    description: "Main development project",
    createdBy: "1",
    createdAt: new Date(),
    members: ["1", "2", "3"],
    stages: [
      {
        id: "todo",
        title: "To Do",
        order: 1,
        tasks: [
          { id: "t1", title: "Design wireframes", createdAt: new Date(), assignedTo: "1" },
          { id: "t2", title: "Set up database", createdAt: new Date(), assignedTo: "2" },
        ],
      },
      {
        id: "doing",
        title: "In Progress",
        order: 2,
        tasks: [
          { id: "t3", title: "Implement authentication", createdAt: new Date(), assignedTo: "1" },
        ],
      },
      {
        id: "done",
        title: "Done",
        order: 3,
        tasks: [{ id: "t4", title: "Project setup", createdAt: new Date(), assignedTo: "3" }],
      },
    ],
  },
  {
    id: "2",
    title: "Marketing Campaign",
    description: "Q4 Marketing initiatives",
    createdBy: "2",
    createdAt: new Date(),
    members: ["1", "2"],
    stages: [
      {
        id: "todo2",
        title: "To Do",
        order: 1,
        tasks: [
          {
            id: "t5",
            title: "Create social media content",
            createdAt: new Date(),
            assignedTo: "2",
          },
        ],
      },
      { id: "doing2", title: "In Progress", order: 2, tasks: [] },
      { id: "done2", title: "Done", order: 3, tasks: [] },
    ],
  },
];
