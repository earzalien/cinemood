import { Link } from "react-router";
import "./NavBar.css";
import "./NavBar-mobile.css";
import { useState } from "react";
import { useLaunch } from "../../context/LaunchQuiz";
import SearchInput from "../SearchInput/SearchInput";

function NavBar() {
	const { setLaunch } = useLaunch();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<nav className="navbar">
				<Link to="/">
					<img
						src="/logo-cine-mood-black.png"
						alt="CinéMood"
						className={`logo ${isMenuOpen ? "" : "show-mobile"}`}
						onClick={() => {
							window.scrollTo({ top: 0, left: 0 });
						}}
						onKeyUp={() => {
							window.scrollTo({ top: 0, left: 0 });
						}}
					/>
				</Link>
				<div
					className="navbar-burger"
					onClick={toggleMenu}
					onKeyUp={toggleMenu}
				>
					☰
				</div>
				<ul className={`navbar-list ${isMenuOpen ? "show-mobile" : ""}`}>
					<li className="navbar-item">
						<Link
							to="/apropos"
							onClick={() => {
								toggleMenu();
								window.scrollTo({ top: 0, left: 0 });
							}}
							className="nav-button"
						>
							À propos
						</Link>
					</li>
					<li className="navbar-item">
						<Link
							to="/profil"
							onClick={() => {
								toggleMenu();
								window.scrollTo({ top: 0, left: 0 });
							}}
							className="nav-button"
						>
							Mon profil
						</Link>
					</li>
					<li className="navbar-item">
						<Link
							to="/catalogue"
							className="nav-button"
							onClick={() => {
								toggleMenu();
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							Catalogue
						</Link>
					</li>
					<li className="navbar-item">
						<SearchInput />
					</li>
					<li className="navbar-item">
						<Link
							to="/quiz"
							className="primary-button quiz-nav-button"
							onClick={() => {
								setLaunch(true);
								toggleMenu();
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							Lance le Quiz
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default NavBar;
