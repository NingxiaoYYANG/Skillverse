import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BigButton from '../components/BigButton';

const Input = (props) => {
    const [position, setPosition] = useState("")
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const filtered_Input = `what skills do I need to learn if I want to become a ${position}? Answer in tree data structure format without any extra words, if learning skill1 depending on skill2 then skill 2 should be parent node of skill 1.\n\
  Answer in the following format:\n\
Skill, SkillID, Parent, ParentID| Here is an example to follow:\n\
HTML, 1, None, 0|CSS, 2, None, 0|JavaScript, 3, None, 0|DOM Manipulation, 4, JavaScript, 3|CSS Frameworks, 5, CSS, 2|Bootstrap, 6, CSS Frameworks, 5|JavaScript Libraries, 7, JavaScript, 3|jQuery, 8, JavaScript Libraries, 7|React, 9, JavaScript Libraries, 7|Redux, 10, React, 9|Angular, 11, JavaScript Libraries, 7`
    const [message, setMessage] = useState(null)
    const [content, setContent] = useState([])
    const [skillArrays, setSkillArrays] = useState([])

    const navigate = useNavigate();

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

    const getPositions = () => {
        // TO-DO
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
        navigate(`/monster-output?position=${position}&message=${encodeURIComponent(message)}&skillArrays=${encodeURIComponent(JSON.stringify(skillArrays))}`);
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
                    <input value={position} onChange={(e) => setPosition(e.target.value)}/>
                    <BigButton id='confirm' onClick={getSkillInfos}> Confirm </BigButton>
                    
                    <select value={position} onChange={handlePositionChange}>
                        <option value="">Select an option</option>
                        <option value="Frontend developer">Frontend developer</option>
                        <option value="Backend developer">Backend developer</option>
                        <option value="Game developer">Game developer</option>
                    </select>
                </div>
            </section>
        </div>
    );
};

export default Input;