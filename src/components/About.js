import React from 'react';
import './About.css'; // Optional: Add your own CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Welcome to our Recipe Sharing Platform! This platform is designed for food enthusiasts to come together and share their favorite recipes with a community of like-minded individuals.</p>

            <h2>Our Mission</h2>
            <p>We aim to create a space where anyone can explore, share, and enjoy culinary creations from around the world. Whether you're a seasoned chef or a cooking novice, we believe that everyone has something delicious to share!</p>

            <h2>Features</h2>
            <ul>
                <li>Share your favorite recipes with the community.</li>
                <li>Discover new and exciting dishes tailored to your taste.</li>
                <li>Engage with fellow food lovers through comments and feedback.</li>
            </ul>

            
        </div>
    );
}

export default About;
