import { useState } from 'react'
import Footer from '../../components/Footer'
import useProjects from '../../hooks/useProjects.js'
import Navbar from './../../components/Navbar.jsx'
import styles from './index.module.css'

const ProjectCard = ({ project }) => {
  return (
    <div
      className={styles.projectCard}
    >

    </div>
  )
}

const ProjectContainer = ({ projects }) => {
  return (
    <div
      className={styles.ProjectContainer}
    >

    </div>
  )
}

const FilterBar = ({ filters, setFilters, filterOptions }) => {
  const handleChangeFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className={styles.FilterBar}>
      {
        Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className={styles.FilterChoice}>
            <label htmlFor={`filter-${key}`}>
              {key}:
            </label>
            <select
              id={`filter-${key}`}
              value={filters[key]}
              onChange={(e) => handleChangeFilter(key, e.target.value)}
            >
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))
      }
    </div>
  )
}

const Projects = () => {
  const { data = [] } = useProjects();
  const filterOptions = {
    category: ['all', ...new Set(data.map(p => p.category))],
    status: ['all', ...new Set(data.map(p => p.status))],
  }
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
  })
  const filtered = data
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => filters.status === 'all' || p.status === filters.status);
  return (
    <>
      <div
        className={styles.Projects}
      >
        <Navbar>
        </Navbar>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
        />
        <ProjectContainer
          projects={filtered}
        ></ProjectContainer>
        <Footer>
        </Footer>
      </div>
    </>
  )
}

export default Projects
