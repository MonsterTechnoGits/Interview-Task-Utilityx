export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    assignedTo?: string;
    dueDate?: Date;
}

export interface Stage {
    id: string;
    title: string;
    tasks: Task[];
    order: number;
}

export interface Board {
    id: string;
    title: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    stages: Stage[];
    members: string[];
}