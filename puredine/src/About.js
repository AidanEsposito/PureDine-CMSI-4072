import { useNavigate } from 'react-router-dom';
import './About.css';
import Aidan from './Images/Aidan.jpeg';

function About() {

    const navigate = useNavigate();

    return (
            <div>
                <button className="Back-Button" onClick={() => navigate("/")}>Back</button>
                <div className="About-Text">
                    <h1>About</h1>
                    <p>PureDine is a system made specifically for the Spring 2025 CMSI 4072 class at Loyola Marymount University.</p>
                    <p>The main lead of this project is Aidan Esposito, a senior student who aims to graduate in the Spring 2025 semester.</p>
                    <p>PureDine was made with to not only have a working project in the semester, but also to provide a close friend a resource to help their own allergies.</p>
                    <img src={Aidan} alt="Aidan Esposito" style={{width: 200, height: 200}} />


                    <h2>What is PureDine?</h2>
                    <p>PureDine is a system that allows users to search for restaurants in their area, and filter the results based on the user's allergies.</p>
                    <p>To use PureDine, one must start by typing a Restaurant, City, or Zip Code into the main page search bar.</p>
                    <p>After the user has entered their search, they can then filter the results based on their resturants and their menus.</p>
                    <p>Once a menu is found, a user can select allergies from checkboxes and the program will sort the menu to provide basic allergy guides on what is safe and not safe to eat.</p>

                    <h4>Note</h4>
                    <p>* PureDine may not currently be 100% functional in every aspect</p>
                    <p>* Allergy recommendations are provided by the Edamam API and may not be 100% accurate</p>
                </div>
            </div>
    );

}

export default About;