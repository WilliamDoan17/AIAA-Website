import { useState, useMemo } from 'react'
import Footer from '../../components/Footer.jsx'
import useProjects from '../../hooks/useProjects.js'
import Navbar from '../../components/Navbar.jsx'
import styles from './index.module.css'

const ProjectCard = ({ project, filterOptions }) => {
  return (
    <div className={styles.ProjectCard}>
      <div className={styles.ProjectCardImage}>
        {project.cover_image
          ? <img src={project.cover_image} alt={project.name} />
          : <div className={styles.ProjectCardImagePlaceholder} />
        }
      </div>
      <div className={styles.ProjectCardContent}>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className={styles.filterTagContainer}>
          {Object.keys(filterOptions).map(key => (
            <div key={key} className={styles.FilterTag}>
              {project[key]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const ProjectContainer = ({ projects, filterOptions }) => {
  if (projects.length === 0) return <p>No projects found.</p>
  return (
    <div className={styles.ProjectContainer}>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          filterOptions={filterOptions}
        />
      ))}
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
      {Object.entries(filterOptions).map(([key, options]) => (
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
      ))}
    </div>
  )
}

const Projects = () => {
  const { data = [] } = useProjects();

  const filterOptions = useMemo(() => ({
    category: ['all', ...new Set(data.map(p => p.category))],
    status: ['all', ...new Set(data.map(p => p.status))],
  }), [data])

  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
  })

  const filtered = useMemo(() => data
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => filters.status === 'all' || p.status === filters.status)
    , [data, filters])

  return (
    <div className={styles.Projects}>
      <Navbar />
      <div className={styles.PageHeader}>
        <h1>Projects</h1>
        <p>Explore what we're working on</p>
      </div>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
      />
      <ProjectContainer
        projects={filtered}
        filterOptions={filterOptions}
      />
      <Footer />
    </div>
  )
}

export default Projects
