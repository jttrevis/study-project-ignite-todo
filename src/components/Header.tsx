import styles from './Header.module.css'
import logo from '../assets/rocket.svg'
const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Rocket" />
      <h1>to<span>do</span></h1>
    </header>
  )
}

export default Header