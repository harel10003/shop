import React from 'react';
import TextCSS from './Text.css';

export default function Text() {
	return (
		<section className={TextCSS.text}>
			<div className={TextCSS.block}>
				<h2 className={TextCSS.block__title}>About</h2>
				<p className={TextCSS.block__paragraph}>
					I am a frontend developer with a particular interest in
					making things simple and automating daily tasks. I try to
					keep up with security and best practices, and am always
					looking for new things to learn.
				</p>
			</div>
			<div className={TextCSS.block}>
				<h2 className={TextCSS.block__title}>Interests</h2>
				<p className={TextCSS.block__paragraph}>
					Reading. Karate. Music. Programming. Neuroscience.
					Langueges. Learning.
				</p>
			</div>
		</section>
	);
}
