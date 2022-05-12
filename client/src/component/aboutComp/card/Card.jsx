import React from 'react';
import CardCss from './Card.css';
import Image from '../img/Image';
import Intro from '../intro/Intro';
import LinkedinButton from '../LinkedinButton/LinkedinButton';
import Text from '../Text/Text';
import Footer from '../footer/Footer';

export default function Card() {
	return (
		<section className={CardCss.card}>
			{/* <Image /> */}
			<Intro />
			<LinkedinButton />
			<Text />
			<Footer />
		</section>
	);
}
