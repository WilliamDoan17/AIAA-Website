import mockEvents from '../data/events.js'

const useEvents = () => {
  return {
    data: mockEvents,
    loading: false,
    error: null,
  }
}

export default useEvents
