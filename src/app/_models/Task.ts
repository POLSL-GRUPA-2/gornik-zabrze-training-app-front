// interface for tasks
export interface Task {
    id?: number
    deadline: string
    coachId?: string
    playerId?: string
    teamId?: string
    description?: string
    done: boolean
}