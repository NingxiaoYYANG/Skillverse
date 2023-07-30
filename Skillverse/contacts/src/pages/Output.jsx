import React, { useEffect, useState, useRef  } from 'react';
import PropTypes from 'prop-types';
import '../pages/Output.css';
import skillIcon from '../Monster/purple_icon.png';
import Tree from 'react-d3-tree';


const Output = (props) => {
  const [prevSkill, setPrevSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillArrays, setSkillArrays] = useState([]);
  const [learnedSkills, setLearnedSkills] = useState({});

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
                  ParentID: InfoArray[3],
                  isLearned: false            
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
      const isLearned = learnedSkills[skill.SkillID] || false; // Set isLearned to true if the skillID exists in learnedSkills, otherwise set it to false
      const children = createSkillTree(skill.SkillID);
      return { ...skill, children: children || [], isLearned }; // Ensure children is an array, otherwise set it to an empty array
    });
  };
  

  useEffect(() => {
    getSkillInfos();

    if (props.userInput && skillArrays.length > 0) {
      const tree = createSkillTree('0');
      setPrevSkill(tree);
      setLoading(false);
  
      // Initialize the learnedSkills state
      const initialLearnedSkills = {};
      skillArrays.forEach((skill) => {
        // Set the initial learned state for all skills except the root
        if (skill.ParentID !== "0") {
          initialLearnedSkills[skill.SkillID] = false;
        }
      });
      setLearnedSkills(initialLearnedSkills);
    }
  }, []);

  useEffect(() => {
    if (props.userInput && skillArrays.length > 0) {
      const tree = createSkillTree('0');
      setPrevSkill(tree);
      setLoading(false);
  
      // Initialize the learnedSkills state
      const initialLearnedSkills = {};
      skillArrays.forEach((skill) => {
        // Set the initial learned state for all skills except the root
        if (skill.ParentID !== "0") {
          initialLearnedSkills[skill.SkillID] = false;
        }
      });
      setLearnedSkills(initialLearnedSkills);
    }
  }, [props.userInput, skillArrays]);

  const createReactD3TreeData = (node) => {
    return {
      name: node.Skill,
      children: node.children.map(createReactD3TreeData),
    };
  };

    // Use useRef to store the latest value of learnedSkills
    const learnedSkillsRef = useRef(learnedSkills);
    useEffect(() => {
      learnedSkillsRef.current = learnedSkills;
    }, [learnedSkills]);

    const markSkillAsLearned = (node, skillId) => {
      if (node.SkillID === skillId) {
        // Create a new object with the updated isLearned property
        return { ...node, isLearned: true };
      } else if (node.children && Array.isArray(node.children)) {
        // Recursively search for the skill to be marked as learned in children
        const updatedChildren = node.children.map((child) =>
          markSkillAsLearned(child, skillId)
        );
        return { ...node, children: updatedChildren };
      }
      // If the current node is not the skill we are looking for or has no children,
      // just return the original node unchanged
      return node;
    };
    
  
  
  const clickSkillNode = (nodeDatum) => {
    // Access the latest learnedSkills value using learnedSkillsRef.current
    const isLearned = learnedSkillsRef.current[nodeDatum.SkillID];
    if (!isLearned) {
      // Prompt the user for an answer to the question
      const answer = prompt("1 + 1 = ?");
  
      // Check if the answer is correct
      if (answer && answer.trim() === "2") {
        // If the answer is correct, show an alert with a success message
        alert("Correct! You answered 1 + 1 = 2");
  
        // Mark the skill as learned in the state
        setLearnedSkills((prevState) => ({
          ...prevState,
          [nodeDatum.SkillID]: true,
        }));
        console.log(nodeDatum);
        console.log("Updated learnedSkills state:", learnedSkills);
        // Update the tree data structure with the learned skill
        setPrevSkill((prevTree) => markSkillAsLearned(prevTree, nodeDatum.SkillID));
      } else {
        // If the answer is incorrect or empty, show an alert with an error message
        alert("Incorrect answer. Please try again.");
      }
    }
  };
  
  

  const SkillNode = ({ nodeDatum }) => {
    const isLearned = learnedSkills[nodeDatum.SkillID];
    const iconTransform = isLearned ? "rotate(90)" : "";

    return (
      <g transform={`translate(-15,-25)`}>
        <image
          xlinkHref={skillIcon}
          alt="Skill Icon"
          className="icon"
          width="30"
          height="30"
          onClick={() => clickSkillNode(nodeDatum)}
          style={{ transform: iconTransform }}
        />
      </g>
    );
  };
  
  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <SkillNode nodeDatum={nodeDatum} />
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
