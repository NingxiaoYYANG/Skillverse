import React from 'react';
import { useState, useEffect } from 'react'
import BigButton from '../components/BigButton';

const Output = (props) => {
    const [position, setPosition] = useState("")
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const filtered_Input = `what skills do I need to learn if I want to become a ${position}? Answer in tree data structure format without any extra words, if learning skill1 depending on skill2 then skill 2 should be parent node of skill 1.\n\
  Answer in the following format:\n\
Skill, SkillID, Parent, ParentID| Here is an example to follow:\n\
HTML, 1, None, 0|CSS, 2, None, 0|JavaScript, 3, None, 0|DOM Manipulation, 4, JavaScript, 3|CSS Frameworks, 5, CSS, 2|Bootstrap, 6, CSS Frameworks, 5|JavaScript Libraries, 7, JavaScript, 3|jQuery, 8, JavaScript Libraries, 7|React, 9, JavaScript Libraries, 7|Redux, 10, React, 9|Angular, 11, JavaScript Libraries, 7`
    const [message, setMessage] = useState(null)
    const [content, setContent] = useState([])
    const [skillArrays, setSkillArrays] = useState([])

    // handle change when user selects an option for area of interest
    const handleInterestChange = (event) => {
        setAreaOfInterest(event.target.value);
    };

    // handle change when user selects an option for area of interest
    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };
    
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
                    {/* Just to show */}
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
    );
};

export default Output;