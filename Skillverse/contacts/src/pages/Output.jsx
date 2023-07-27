import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../pages/Output.css';

const Output = (props) => {
  const [prevSkill, setprevSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillArrays, setSkillArrays] = useState([]);

  useEffect(() => {
    if (props.userInput && skillArrays){  
      setprevSkill(skillArrays); 
    }
  }, [skillArrays]); 

  useEffect(() => {
    getSkillInfos();
  }, [])


  const getSkillInfos = async () => {
    const filtered_Input = `what skills do I need to learn if I want to become a ${props.userInput}? Answer in tree data structure format without any extra words, if learning skill1 depending on skill2 then skill 2 should be parent node of skill 1.\n
  Answer in the following format:\n\
Skill, SkillID, Parent, ParentID|\n\
Here is an example to follow:\n\
HTML, 1, None, 0|CSS, 2, None, 0|JavaScript, 3, None, 0|DOM Manipulation, 4, JavaScript, 3|CSS Frameworks, 5, CSS, 2|Bootstrap, 6, CSS Frameworks, 5|JavaScript Libraries, 7, JavaScript, 3|jQuery, 8, JavaScript Libraries, 7|React, 9, JavaScript Libraries, 7|Redux, 10, React, 9|Angular, 11, JavaScript Libraries, 7`;

    const options = {
      method: 'POST',
      headers: {
        "Content-type": 'application/json',
      },
      body: JSON.stringify({
        message: filtered_Input,
      })
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      const MsgContent = data.choices[0].message.content;
      // Split message into skillInfos
      const skillInfos = MsgContent.split("|");
      for (const InfoString of skillInfos) {
        const InfoArray = InfoString.split(", ");
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
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <section className="output-container">
        {loading && !skillArrays ? (
          <div id='loading'>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className="tree">
            {prevSkill?.map((skillInfo, idx) => 
              <li key={idx} className={skillInfo.ParentID === '0' ? 'parent' : ''}>
                <div className="node">
                  <p>{`Skill: ${skillInfo.Skill}`}</p>
                  <p>{`SkillID: ${skillInfo.SkillID}`}</p>
                  <p>{`Parent: ${skillInfo.Parent}`}</p>
                  <p>{`ParentID: ${skillInfo.ParentID}`}</p>
                </div>
              </li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
};

Output.propTypes = {
  userInput: PropTypes.any,
  userWalletAddress: PropTypes.string
}

export default Output;
