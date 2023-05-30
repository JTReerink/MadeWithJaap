import styles from "./navbar.module.css"
import {useEffect, useRef, useState} from "react";

export default function Navbar() {
	const [isStuck, setIsStuck] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const cachedRef = ref.current;
		const observer = new IntersectionObserver(([element]) => setIsStuck(element.intersectionRatio < 1), {threshold: [1], rootMargin: '-1px 0px 0px 0px', root: document.getElementById("root")});

		observer.observe(cachedRef);

		return () => observer.unobserve(cachedRef);
	}, []);

	const [showHamburg, setShowHamburg] = useState(false);
	const click = (show) => setShowHamburg(show);

	return(
		<nav ref={ref} className={isStuck ? styles.navbar : `${styles.navbar} ${styles.floating}`}>
			<div className={styles.navbarInner}>
				<a href="#" className={styles.title}>MadeWithJaap</a>

				<a href="#about" className={styles.link}>About</a>
				<a href="#projects" className={styles.link}>Projects</a>

				{/*<a href="/blog" className={styles.button}>Blog</a>*/}
				<a href="#contact" onClick={() => click(false)} className={styles.button}>Contact</a>

				<button onClick={() => click(!showHamburg)} className={styles.hamburgButton}>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M4 17H20M4 12H20M4 7H20" stroke="#007c7c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				</button>
			</div>

			<div className={showHamburg ? `${styles.hamburgMenu} ${styles.hamburgMenuShown}` : styles.hamburgMenu}>
				<a onClick={() => click(false)} href="#about" className={styles.link}>About</a>
				<a onClick={() => click(false)} href="#projects" className={styles.link}>Projects</a>

				{/*<a href="/blog" className={styles.button}>Blog</a>*/}
				<a onClick={() => click(false)} href="#contact" className={styles.button}>Contact</a>
			</div>
		</nav>
	);
}