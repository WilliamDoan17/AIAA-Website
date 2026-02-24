import mockProjects from "../data/projects";

const useProjects = () => {
  return {
    data: mockProjects,
    loading: false,
    error: null,
  }
}

export default useProjects;
