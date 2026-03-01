import mockMembers from "../data/members"

export const useMembers = () => {
  return {
    data: mockMembers,
    loading: false,
    error: null,
  }
}
