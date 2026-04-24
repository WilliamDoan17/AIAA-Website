export type ProjectStatus = 'not_started' | 'in_progress' | 'paused' | 'completed'
export type ProjectCategory = 'competition' | 'research'

export interface Project {
  id: string
  created_at: string
  updated_at: string
  name: string
  summary: string
  description: string
  cover_image: string | null
  status: ProjectStatus
  category: ProjectCategory
}
