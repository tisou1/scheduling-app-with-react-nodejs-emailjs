export interface Schedule {
  day: string
  startTime: string
  endTime: string
}

export interface Database {
  id: string
  username: string
  password: string
  email: string
  timezone: {}
  schedule: Schedule[]
}
