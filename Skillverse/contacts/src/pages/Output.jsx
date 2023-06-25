import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Output.css'

const Output = () => {
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState([]);
  const location = useLocation();

  const getSkillInfos = async () => {
    const filtered_Input = `what skills do I need to learn if I want to become a ${position}? Answer in tree data structure format without any extra words, if learning skill1 depending on skill2 then skill 2 should be parent node of skill 1.\n\
    Answer in the following format:\n\
    Skill, SkillID, Parent, ParentID| Here is an example to follow:\n\
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

      if (data.choices && data.choices.length > 0) {
        const firstChoice = data.choices[0];

        if (firstChoice.message) {
          setMessage(firstChoice.message);
          const MsgContent = firstChoice.message.content;

          // Split message into skillInfos
          const skillInfos = MsgContent.split("|");
          const skills = skillInfos.map((InfoString) => {
            const InfoArray = InfoString.split(", ");
            return {
              Skill: InfoArray[0],
              SkillID: InfoArray[1],
              Parent: InfoArray[2],
              ParentID: InfoArray[3]
            };
          });
          setContent(skills);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const outputPosition = searchParams.get('position');
    const outputMessage = searchParams.get('message');

    setPosition(outputPosition);
    setMessage(outputMessage);
    getSkillInfos();
  }, [location.search]);

  return (
    <div className="app">
      <section className="output-container">
        <ul className="tree">
          {content?.map((skillInfo, idx) => (
            <li key={idx} className={skillInfo.ParentID === "0" ? "parent" : ""}>
              <div className="node">
                <p>{`Skill: ${skillInfo.Skill}`}</p>
                <p>{`SkillID: ${skillInfo.SkillID}`}</p>
                <p>{`Parent: ${skillInfo.Parent}`}</p>
                <p>{`ParentID: ${skillInfo.ParentID}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Output;
