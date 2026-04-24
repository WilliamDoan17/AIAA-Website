import mockMembers from "../data/members"

const useMembers = () => {
  return {
    data: mockMembers,
    loading: false,
    error: null,
  }
}

export default useMembers
