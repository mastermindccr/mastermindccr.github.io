import './Footer.css';

import { MdEmail } from 'react-icons/md';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-section">
					<p>All the features are Ads-free and open source, so feel free to use!</p>
					<p>but memes are not :(</p>
				</div>

				<div className="footer-profile">
					<div className="footer-provider">
						<h3>Sing-Yu Chen</h3>
					</div>

					<div className="footer-social">
						<a href="mailto:borachen0621@gmail.com" className="email-link">
							<MdEmail className="email-icon" />
							Email
						</a>
						<a href="https://www.facebook.com/mastermindccr">
							<FaFacebook className="social-icon" />
							Facebook
						</a>
						<a href="https://www.linkedin.com/in/singyu-chen-9315b2259/">
							<FaLinkedin className="social-icon" />
							LinkedIn
						</a>
					</div>
				</div>
				
			</div>
		</footer>
	);
};

export default Footer;