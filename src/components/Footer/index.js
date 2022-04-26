import styles from "./Footer.module.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
    return (
        <div className={styles.footer}>
            <p><a href="https://www.ironhack.com/en">IronHack</a>
            &#169; Gonçalo Estrelado 
            <a href="https://www.linkedin.com/in/goncalo-estrelado/"><FaLinkedin /></a>
            <a href="https://github.com/ST4R20RD"><FaGithub /></a>
            & Raúl Alonso 
            <a href="https://www.linkedin.com/in/raulalonsomerino/"><FaLinkedin /></a>
            <a href="https://github.com/RaAlMer"><FaGithub /></a>
            </p>
        </div>
    )
}