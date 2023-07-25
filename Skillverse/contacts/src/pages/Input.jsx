import React from 'react';
import { useState, useEffect } from 'react'
import BigButton from '../components/BigButton';
import './Input.css'

/*const Output = (props) => {
    */
function Career() {
    const [position, setPosition] = useState('')
    const [areaOfInterest, setAreaOfInterest] = useState('');
    /*const filtered_Input = `what skills do I need to learn if I want to become a ${position}? Answer in tree data structure format without any extra words, if learning skill1 depending on skill2 then skill 2 should be parent node of skill 1.\n\
  Answer in the following format:\n\
Skill, SkillID, Parent, ParentID| Here is an example to follow:\n\
HTML, 1, None, 0|CSS, 2, None, 0|JavaScript, 3, None, 0|DOM Manipulation, 4, JavaScript, 3|CSS Frameworks, 5, CSS, 2
|Bootstrap, 6, CSS Frameworks, 5|JavaScript Libraries, 7, JavaScript, 3|jQuery, 8, JavaScript Libraries, 7|React, 9, JavaScript Libraries, 7
|Redux, 10, React, 9|Angular, 11, JavaScript Libraries, 7`
    const [message, setMessage] = useState(null)
    const [content, setContent] = useState([])
    const [skillArrays, setSkillArrays] = useState([])*/

    // handle change when user selects an option for area of interest
    const handleInterestChange = (event) => {
        setAreaOfInterest(event.target.value);
        setAreaOfInterest('');
    };

    // handle change when user selects an option for area of Position
    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };
    
    const InterestOptions = [
        {value: 'art', label: 'Art'},
        {value: 'iT', label: 'IT'},
        {value: 'engineering', label: 'Engineering'},
        {value: 'science', label: 'Science '},
        {value: 'design', label: 'Design '},
    ];
    

    const ArtOptions = [
        {value: 'Fine Artist', label: 'Fine Artist'},
        {value: 'Illustrator', label: 'Illustrator'},
        {value: 'Graphic Designer', label: 'Graphic Designer'},
    ];

    const ITOptions = [
        {value: 'Software Development', label: 'Software Development'},
        {value: 'Web Development', label: 'Web Development'},
        {value: 'Systems Administration', label: 'Systems Administration'},
        {value: 'Network Engineering', label: 'Network Engineering'},
        {value: 'Cybersecurity', label: 'Cybersecurity'},
        {value: 'Data Science and Analytics', label: 'Data Science and Analytics'},
        {value: 'Cloud Computing', label: 'Cloud Computing'},
        {value: 'IT Consulting', label: 'IT Consulting'},
    ];

    const EngineeringOptions = [
        {value: 'Civil Engineering', label: 'Civil'},
        {value: 'Mechanical Engineering', label: 'Mechanical'},
        {value: 'Electrical Engineering', label: 'Electrical'},
        {value: 'Aerospace Engineering', label: 'Aerospace'},
        {value: 'Computer Engineering', label: 'Computer'},    
        {value: 'Chemical Engineering', label: 'Chemical'},    
        {value: 'Environmental Engineering', label: 'Environmental'},    
        {value: 'Biomedical Engineering', label: 'Biomedical'},    
        {value: 'Industrial Engineering', label: 'Industrial'},    
        {value: 'Software Engineering', label: 'Software'},    
        {value: 'Materials Engineering', label: 'Materials'}, 
        {value: 'Petroleum Engineering', label: 'Petroleum'},
        {value: 'Nuclear Engineering', label: 'Nuclear'},
        {value: 'Renewable Energy Engineering', label: 'Renewable Energy'},
    ];

    const ScienceOptions = [
        {value: 'Research Scientist', label: 'Research'},
        {value: 'Medical Scientist', label: 'Medical'},
        {value: 'Biotechnologist', label: 'Biotechnologist'},
        {value: 'Pharmacist', label: 'Pharmacist'},
        {value: 'Environmental Scientist', label: 'Environmental'},
        {value: 'Geoscientist', label: 'Geoscientist'},
        {value: 'Astrophysicist/Astronomer', label: 'Astrophysicist'},
        {value: 'Neuroscientist', label: 'Neuroscientist'},
        {value: 'Forensic Scientist', label: 'Forensic'},
        {value: 'Science Educator', label: 'Educator'},
        {value: 'Science Communicator', label: 'Communicator'},
        {value: 'Science Policy Analyst', label: 'Analyst'},
        {value: 'Food Scientist', label: 'Food'},
        {value: 'Zoologist/Botanist', label: 'Zoologist'},
        {value: 'Biomedical Researcher', label: 'Biomedical'},
        {value: 'Materials Scientist', label: 'Materials'},
        {value: 'Science Illustrator', label: 'Illustrator'},
    ];

    const DesignOptions = [
        {value: 'Graphic Design', label: 'Graphic'},
        {value: 'Web Design and Development', label: 'WebDesign'},
        {value: 'UX/UI Design', label: 'UX/UI'},
        {value: 'Industrial Design', label: 'Industrial'},
        {value: 'Interior Design', label: 'Interior'},
        {value: 'Fashion Design', label: 'Fashion'},
        {value: 'Animation and Motion Graphics', label: 'Animation'},
        {value: 'Architectural Design', label: 'Architectural'},
        {value: 'Game Design', label: 'GameDesign'},
        {value: 'Multimedia Design', label: 'Multimedia'},
        {value: 'User Experience Research', label: 'User Experience'},
        {value: 'Advertising and Branding Design', label: 'Advertising'},
    ];
   
    let options = [];
    if (areaOfInterest === 'art') {
        options = ArtOptions;
    } else if (areaOfInterest === 'iT') {
        options = ITOptions;
    } else if (areaOfInterest === 'engineering') {
        options = EngineeringOptions;
    } else if (areaOfInterest === 'science') {
        options = ScienceOptions;
    } else if (areaOfInterest === 'design') {
        options = DesignOptions;
    }

    return (
        <div>
          <h1>Dropdown Menu</h1>
    
          <div>
            <label>Select an interest:</label>
            <select value={areaOfInterest} onChange={handleInterestChange}>
              <option value="">Select an interest</option>
              {InterestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
    
          {areaOfInterest && (
            <div>
              <label>Select a position:</label>
              <select value={position} onChange={handlePositionChange}>
                <option value="">Select a position</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
    
          {position && (
            <p>Selected item: {position}</p>
          )}
        </div>
    );
};
export default Career;
/*
    useEffect(() => {
        if (position && message && skillArrays) {
            setContent(skillArrays)
        }
    }, [message, skillArrays])  

    const [positions, setPositions] = useState([])

    const getPositions = async () => {
        // TO-DO
        const response = await fetch(`http://localhost:8000/positions?area=${encodeURIComponent(areaOfInterest)}`);

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();

        // Assuming data is an array of positions, e.g., ['Frontend developer', 'Backend developer', 'Game developer']
        setPositions(data);
    }


    const getSkillInfos = async () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify ({
                message: filtered_Input,
            })
        }
        try {
            const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json()
            setMessage(data.choices[0].message)
            const MsgContent = data.choices[0].message.content

            // Split message into skillInfos
            const skillInfos = MsgContent.split("|")
            for (const InfoString of skillInfos) {
                const InfoArray = InfoString.split(", ")
                setSkillArrays( prevs => (
                    [...prevs,   
                        {
                            Skill: InfoArray[0],
                            SkillID: InfoArray[1],
                            Parent: InfoArray[2],
                            ParentID: InfoArray[3]             
                        }
                    ]
                ))
                console.log(InfoArray)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const [open, setOpen]=useState(false)
    return (
        <div className="app">
            <section className='input-container'>
                <div className='interest-input'>
                    <h1>What is your area of interest?</h1>
                    <select value={areaOfInterest} onChange={handleInterestChange}>
                        <option value="">Select an option</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Creative Arts">Creative Arts</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                    <BigButton id='confirm' onClick={getPositions}> Confirm </BigButton>
                </div>
                <br/>
                <div className='position-input'>
                    <h1>What is your career goal?</h1>
                    
                    <select value={position} onChange={handlePositionChange}>
                        <option value="">Select an option</option>
                        {positions.map((pos, index) => <option key={index} value={pos}>{pos}</option>)}
                    </select>
                    <BigButton id='confirm' onClick={getSkillInfos}> Confirm </BigButton>
                    
                    <select value={position} onChange={handlePositionChange}>
                        <option value="">Select an option</option>
                        <option value="Frontend developer">Frontend developer</option>
                        <option value="Backend developer">Backend developer</option>
                        <option value="Game developer">Game developer</option>
                    </select>
                </div>
            </section>
            <section className={open?"main-structure active":"main-structure"}>
                <header>
                    <a href="#">
                        <div className="logo">Knowledge</div>
                    </a>
                    <div className="menu-logo" onClick={()=>{
                        setOpen(!open)
                    }}></div>
                </header> 
                <div className="content">
                <video className="active" src="/assets/videos/island.mp4" autoPlay muted loop></video>
                <div className="video-overlay"></div>
                <section className="text-description">
                    <h1></h1>
                    <h2></h2>
                    <p>Hypothesis is always ahead of knowledge!!</p>
                    <a href="#"></a>
                </section>
                </div>
                <footer>
                    <a href="#"><img src="/assets/icons/facebook.svg" alt="facebook"/></a>
                    <a href="#"><img src="/assets/icons/instagram.svg" alt="instagram"/></a>
                    <a href="#"><img src="/assets/icons/twitter.svg" alt="twitter"/></a>
                </footer>

            </section>

            <section className='output-container'>
                <ul className='feed'>
                    {content?.map((skillInfo, idx) => <li key={idx}>
                        <p>{`Skill: ${skillInfo.Skill}`}</p>
                        <p>{`SkillID: ${skillInfo.SkillID}`}</p>
                        <p>{`Parent: ${skillInfo.Parent}`}</p>
                        <p>{`ParentID: ${skillInfo.ParentID}`}</p>
                    </li>)}
                </ul>
            </section>
        </div>
    );*/


