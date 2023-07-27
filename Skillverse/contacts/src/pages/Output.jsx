import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../pages/Output.css';
import skillIcon from '../Monster/purple_icon.png';
import Tree from 'react-d3-tree';


const Output = (props) => {
  const [prevSkill, setPrevSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillArrays, setSkillArrays] = useState([]);

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

  const findChildrenSkills = (parentId) => {
    // Recursively find children skills of the given parent ID
    return skillArrays.filter((skill) => skill.ParentID === parentId);
  };

  const createSkillTree = (parentId) => {
    const childrenSkills = findChildrenSkills(parentId);
    return childrenSkills.map((skill) => {
      const children = createSkillTree(skill.SkillID);
      return { ...skill, children };
    });
  };

  useEffect(() => {
    getSkillInfos();
  }, []);

  useEffect(() => {
    if (props.userInput && skillArrays.length > 0) {
      const tree = createSkillTree('0');
      setPrevSkill(tree);
      setLoading(false);
    }
  }, [props.userInput, skillArrays]);

  const createReactD3TreeData = (node) => {
    return {
      name: node.Skill,
      children: node.children.map(createReactD3TreeData),
    };
  };

  const clickSkillNode = () => {
    alert("1+1 = 2");
  };

  const SkillNode = () => {
    return (
      <g transform={`translate(-15,-25)`}>
        <image xlinkHref={skillIcon} alt="Skill Icon" className="icon" width="30" height="30" onClick={clickSkillNode}/>
      </g>
    );
  };

  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <SkillNode/>
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div className="app">
      <section className="output-container">
        {loading ? (
          <div id='loading'>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="tree">
            <Tree 
              data={createReactD3TreeData({ Skill: props.userInput, children: prevSkill })}
              orientation="vertical"
              translate={{ x: 400, y: 200 }}
              renderCustomNodeElement={renderRectSvgNode}
            />
          </div>
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
