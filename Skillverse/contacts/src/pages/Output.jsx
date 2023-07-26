import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../pages/Output.css';
import skillIcon from '../Monster/purple_icon.png';

const Output = (props) => {
  const [prevSkill, setprevSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillArrays, setSkillArrays] = useState([]);

  // debug
  const [debug, setDebug] = useState("")

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
      setDebug(data.choices[0].message.content)
      const MsgContent = data.choices[0].message.content;
      // Split message into skillInfos
      const skillInfos = MsgContent.split("|");
      console.log(skillInfos.length)
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

  useEffect(() => {
    if (props.userInput && skillArrays){  
      getSkillInfos();
      setprevSkill(skillArrays); 
    }
  }, [skillArrays]); 

  console.log(debug)
  console.log(skillArrays.length)

  return (
    <div className="app">
      <section className="output-container">
        {loading ? (
          <div id='loading'>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className="tree">
            {prevSkill?.map((skillInfo, idx) => (
              <li key={idx} className={skillInfo.ParentID === '0' ? 'parent' : ''}>
                <div className="node">
                  {/* 使用图片图标 */}
                  <img src={skillIcon} alt="Skill Icon" className="icon" />
                  <p>{`Skill: ${skillInfo.Skill}`}</p>
                  <p>{`SkillID: ${skillInfo.SkillID}`}</p>
                  <p>{`Parent: ${skillInfo.Parent}`}</p>
                  <p>{`ParentID: ${skillInfo.ParentID}`}</p>
                </div>
                {/* 绘制连线 */}
                {skillInfo.ParentID !== '0' && (
                  <div className="line" />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

Output.propTypes = {
  userInput: PropTypes.any
}

export default Output;
