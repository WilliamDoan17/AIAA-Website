import { useMembers } from '../../hooks/useMembers'
import styles from './index.module.css'

const PresidentCard = ({ president }) => {
  return (
    <div
      className={styles.PresidentCard}
    ></div>
  )
}

const MemberCard = ({ member }) => {
  return (
    <div
      className={styles.MemberCard}
    ></div>
  )
}

const MemberContainer = ({ members }) => {
  if (members.length === 0) return null
  return (
    <div
      className={styles.MemberContainer}
    ></div>
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

