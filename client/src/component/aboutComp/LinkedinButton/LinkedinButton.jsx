import LinkedinButtonCSS from './LinkedinButton.css';

export default function LinkedinButton() {
	return (
		<a
			href="https://www.linkedin.com/in/amitbg/"
			className={LinkedinButtonCSS.button}
			target="_blank"
			rel="noreferrer"
		>
			Linkedin
		</a>
	);
}
