import { useMembers } from '../../hooks/useMembers'
import styles from './index.module.css'

const PresidentCard = ({ president }) => {
  return (
    <div
      className={styles.PresidentCard}
    >
      <div className={styles.PresidentCardImage}>
        {president.photo
          ? <img src={president.photo} alt={president.name} />
          : <div className={styles.PresidentCardImagePlaceholder} />
        }
      </div>
      <div className={styles.PresidentCardContent}>
        <h3>{president.name}</h3>
        <p>PRESIDENT</p>
      </div>
    </div>
  )
}

const formatRole = (role) => role.replace(/_/g, ' ').toUpperCase()

const MemberCard = ({ member }) => {
  return (
    <div className={styles.MemberCard}>
      <div className={styles.MemberCardImage}>
        {member.photo
          ? <img src={member.photo} alt={member.name} />
          : <div className={styles.MemberCardImagePlaceholder} />
        }
      </div>
      <h3>{member.name}</h3>
      <p>{formatRole(member.role)}</p>
    </div>
  )
}

const MemberContainer = ({ members }) => {
  if (members.length === 0) return null
  return (
    <div
      className={styles.MemberContainer}
    >
      {
        members.map(member => {
          return (
            <MemberCard
              key={member.id}
              member={member}
            ></MemberCard>
          )
        })
      }
    </div>
  )
}

const Members = () => {
  const { data = [], loading, error } = useMembers();
  const president = data.find(member => member.role === 'president');
  const crews = data.filter(member => member.role !== 'president');

  return (
    <div
      className={styles.Members}
    >
      <h1>
        Members
      </h1>
      {
        president
        &&
        <PresidentCard
          president={president}
        ></PresidentCard>
      }
      <MemberContainer
        members={crews}
      ></MemberContainer>
    </div>
  )
}

export default Members

