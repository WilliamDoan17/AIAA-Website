import { useQuery } from '@tanstack/react-query'
import { getAllEvents } from '../services/events.js'


export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents,
  })
}



