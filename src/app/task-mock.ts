import { Task } from "./_models/Task"

export const TASKS: Task[] = [
    {   //personal task
        id: 1,
        deadline: "21.09.2021",
        coachId: "coach-id",
        playerId: "player-id1",
        description: "description of player task 1",
        done: false,
    },
    {   //personal task
        id: 1,
        deadline: "23.09.2021",
        coachId: "coach-id",
        playerId: "player-id1",
        description: "description of player task 2",
        done: true,
    },
    {   //team task
        id: 2,
        deadline: "21.09.2021",
        teamId: "team-id",
        description: "description of team task 1",
        done: false,
    }
]