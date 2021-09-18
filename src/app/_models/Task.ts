// interface for tasks
export interface Task {
  id?: number
  task_date?: string
  deadline: string
  coach_id?: string
  player_id?: number
  team_id?: number
  description?: string
  done: boolean
}