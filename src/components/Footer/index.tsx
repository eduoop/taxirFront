import { FaInstagram, FaLinkedinIn, FaGithub }  from "react-icons/fa";
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <ul className={styles.social_list}>
                    <li className={styles.item}> <a href="https://github.com/eduoop" target="_blank" rel="noreferrer"><FaGithub/></a> </li>
                    <li className={styles.item}> <a href="https://www.instagram.com/eduardo_omp/?hl=en" target="_blank" rel="noreferrer"><FaInstagram/></a> </li>
                    <li className={styles.item}> <a href="https://www.linkedin.com/in/eduardo-moraes-718a02219/" target="_blank" rel="noreferrer"><FaLinkedinIn/></a> </li>
                </ul>
                <p className={styles.copy}><span className={styles.copy_span}>TaxIr</span><span/> &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    )
}