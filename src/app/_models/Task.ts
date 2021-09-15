// interface for tasks
export interface Task {
  id?: number
  task_date?: string
  deadline: string
  coachId?: string
  playerId?: string
  teamId?: string
  description?: string
  done: boolean
}