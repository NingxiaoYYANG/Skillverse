import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../pages/Output.css';
import skillIcon from '../Monster/purple_icon.png';
import learnIcon from '../Monster/red_icon.png';
import iniEgg from '../Monster/egg.png';
import Open from '../Background/Open.png';  
import Loading from '../Background/loading.gif';
import monsterNFT from '../Monster/AIGC-image-SkillVerse/robotic_white.png';
import BigButton from '../components/BigButton';
import Tree from 'react-d3-tree';

// web3 related
import { ethers } from 'ethers';
import AIGC_NFT_ABI from '../contractABI/AIGC_NFT_ABI.json';

const Output = (props) => {
  const [prevSkill, setPrevSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillArrays, setSkillArrays] = useState([]);
  const [learnedSkills, setLearnedSkills] = useState({});
  const [isCollected, setIsCollected] = useState(false);
  const [isStudyProgressOpen, setIsStudyProgressOpen] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false); // Control whether to show all skills
  const [filteredSkillArrays, setFilteredSkillArrays] = useState([]); // Filtered skills (2 levels)
  const [allSkillArrays, setAllSkillArrays] = useState([]); // All original skills

  // For connecting to NFT solidity contract
  const contractAddress = '0x31e6c3b577a73afb176d925c7a6319c40128fc27'; // Replace with the actual contract address

  // Initialize the contract instance
  // Provider for sending transactions (using MetaMask)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  // Initialize the contract instance using the ABI and the provider
  const contract = new ethers.Contract(contractAddress, AIGC_NFT_ABI, provider.getSigner());

  // Filter function: Keep only 2 levels depth
  const filterToTwoLevels = (skills) => {
    return skills.filter(skill => {
      const parentID = skill.ParentID;
      // Keep root node (ParentID=0)
      if (parentID === '0' || parentID === 0) return true;
      // Keep skills whose parent is root node (first level children)
      const parentSkill = skills.find(s => s.SkillID === parentID);
      return parentSkill && (parentSkill.ParentID === '0' || parentSkill.ParentID === 0);
    });
  };

  // Calculate skill depth
  const getSkillDepth = (skill, allSkills, depth = 1) => {
    const parentID = skill.ParentID;
    if (parentID === '0' || parentID === 0) return depth;
    const parent = allSkills.find(s => s.SkillID === parentID);
    if (!parent) return depth;
    return getSkillDepth(parent, allSkills, depth + 1);
  };

  // For getting response from AI
  const getSkillInfos = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:36',message:'getSkillInfos called',data:{userInput:props.userInput,hasUserInput:!!props.userInput},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    const filtered_Input = `List only the CORE ESSENTIAL skills needed to become a ${props.userInput}. 
Requirements:
- Maximum 2 levels recommended: root node (ParentID=0) and its direct children
- Total 5-8 skills for core view
- You can include deeper skills if necessary, but they will be shown separately
Format: Skill, SkillID, Parent, ParentID, isLearned|
Example: HTML, 1, None, 0, false|CSS, 2, None, 0, false|JavaScript, 3, None, 0, false|DOM Manipulation, 4, JavaScript, 3, false|Responsive Design, 5, CSS, 2, false`;
  
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
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:54',message:'Before fetch to backend',data:{url:'http://localhost:8000/completions',messageLength:filtered_Input.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion
    const response = await fetch('http://localhost:8000/completions', options);
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:55',message:'Backend response received',data:{status:response.status,ok:response.ok,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion
    const data = await response.json();
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:56',message:'Parsed response data structure',data:{hasData:!!data,hasChoices:!!data?.choices,choicesLength:data?.choices?.length,hasMessage:!!data?.choices?.[0]?.message,hasContent:!!data?.choices?.[0]?.message?.content,contentPreview:data?.choices?.[0]?.message?.content?.substring(0,100),error:data?.error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
    // #endregion
    
    // Check for API errors
    if (!response.ok || data.error || !data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:69',message:'API error detected in frontend',data:{status:response.status,error:data?.error,hasChoices:!!data?.choices,hasMessage:!!data?.choices?.[0]?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'R'})}).catch(()=>{});
      // #endregion
      const errorMessage = data.error || data.error?.message || 'Failed to generate skill tree. Please check your OpenAI API key and quota.';
      alert(errorMessage);
      setLoading(false);
      return;
    }
    
    const MsgContent = data.choices[0].message.content;
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:57',message:'Message content extracted',data:{contentLength:MsgContent?.length,hasContent:!!MsgContent,contentPreview:MsgContent?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    // Split message into skillInfos
    const skillInfos = MsgContent.split("|");
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:59',message:'SkillInfos split result',data:{skillInfosCount:skillInfos.length,firstSkill:skillInfos[0],lastSkill:skillInfos[skillInfos.length-1]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'K'})}).catch(()=>{});
    // #endregion
    const allParsedSkills = [];
    for (const InfoString of skillInfos) {
      const InfoArray = InfoString.split(", ");
      // #region agent log
      if (skillInfos.indexOf(InfoString) < 3) { // Only log first 3 to avoid too many logs
        fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:61',message:'Parsing skill info',data:{infoString:InfoString,infoArrayLength:InfoArray?.length,infoArray:InfoArray},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'L'})}).catch(()=>{});
      }
      // #endregion
      if (InfoArray.length >= 5) {
        allParsedSkills.push({
          Skill: InfoArray[0],
          SkillID: InfoArray[1],
          Parent: InfoArray[2],
          ParentID: InfoArray[3],  
          isLearned: InfoArray[4],      
        });
      }
    }
    
    // Save all skills
    setAllSkillArrays(allParsedSkills);
    // Filter to 2 levels depth
    const filtered = filterToTwoLevels(allParsedSkills);
    setFilteredSkillArrays(filtered);
    // Decide which array to display based on state
    setSkillArrays(showAllSkills ? allParsedSkills : filtered);
    
    setLoading(false);
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:74',message:'getSkillInfos completed successfully',data:{skillInfosCount:skillInfos.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'M'})}).catch(()=>{});
    // #endregion
    console.log(skillInfos);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:77',message:'Error in getSkillInfos',data:{errorMessage:error?.message,errorStack:error?.stack?.substring(0,300)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'N'})}).catch(()=>{});
    // #endregion
    console.log(error);
    setLoading(false);
  }
};

  // For generating the tree diagram
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

  const areAllSkillsLearned = (node) => {
    if (!node.children || node.children.length === 0) {
      // Leaf node, check if it is learned
      return learnedSkills[node.id];
    } else {
      // Non-leaf node, check if all children are learned
      return node.children.every(areAllSkillsLearned);
    }
  };

  const createReactD3TreeData = (node) => {
    return {
      name: node.Skill,
      id: node.SkillID,
      children: node.children.map(createReactD3TreeData),
    };
  };

  const toggleStudyProgress = () => {
    setIsStudyProgressOpen(!isStudyProgressOpen);
  };
  
  const clickSkillNode = (nodeDatum) => {
    if (nodeDatum.id === 0) {
      return; // Disable clicking on the root node
    }

    // Check if the skill is learned
    const isLearned = learnedSkills[nodeDatum.id];

    // If the skill is already learned, do not show the alert
    if (isLearned) {
      return;
    }

    // Prompt the user for an answer to the question
    const answer = prompt("1 + 1 = ?");

    // Check if the answer is correct
    if (answer && answer.trim() === "2") {
      // If the answer is correct, show an alert with a success message
      alert("Correct! You answered 1 + 1 = 2");

      // Update the learnedSkills state with the learned skill
      setLearnedSkills((prevLearnedSkills) => ({
        ...prevLearnedSkills,
        [nodeDatum.id]: true,
      }));
    } else {
      // If the answer is incorrect or empty, show an alert with an error message
      alert("Incorrect answer. Please try again.");
    }
  };

  // A Cheating function that learns all skills
  const completeAllQuiz = () => {
    // Create a copy of the learnedSkills object
    const updatedLearnedSkills = { ...learnedSkills };
  
    // Mark all skills as learned
    skillArrays.forEach(skill => {
      updatedLearnedSkills[skill.SkillID] = true;
    });
  
    // Update the learnedSkills state
    setLearnedSkills(updatedLearnedSkills);
  };
  
  const SkillNode = ({ nodeDatum }) => {
    // Check if the skill is learned
    const isLearned = learnedSkills[nodeDatum.id];

    // Check if the root node is clicked (id: 0)
    if (nodeDatum.id === 0) {
      // Change root node image based on the condition
      const iconImage = areAllSkillsLearned(nodeDatum) ? learnIcon : skillIcon;

      return (
        <g transform={`translate(-30,-25)`}>
          <image
            xlinkHref={iconImage}
            alt="Skill Icon"
            className="icon"
            onClick={nodeDatum.id === 0 ? undefined : () => clickSkillNode(nodeDatum)}
          />
        </g>
      );
    }

    // Change icon image for other nodes based on isLearned
    const iconImage = isLearned ? learnIcon : skillIcon;

    return (
      <g transform={`translate(-30,-25)`}>
        <image
          xlinkHref={iconImage}
          alt="Skill Icon"
          className="icon"
          onClick={() => clickSkillNode(nodeDatum)}
        />
      </g>
    );
  };
  
  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <SkillNode nodeDatum={nodeDatum} />
      <text className='text' fill="white" strokeWidth="1" x="20">  
        {nodeDatum.name}
      </text>
    </g>
  );

  // for collecting NFT to user's wallet
  const collectNft = async () => {
    try {
      // Transfer the NFT from contract to user's wallet using the signer (MetaMask wallet)
      // Only for demo, This will definetly get the robotic_white NFT by passing token ID 5
      const transaction = await contract.transferFrom(contractAddress, props.userWalletAddress, 5);

      // Set the isCollected to be true to hide the collect button
      setIsCollected(true);

      // Wait for the transaction to be mined and get the receipt
      await transaction.wait();

    } catch (error) {
      console.error('Error calling safeTransferFrom():', error);
    }
  };

  // For Initialisation

  useEffect(() => {
    getSkillInfos();
  }, []);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:233',message:'Tree creation useEffect triggered',data:{hasUserInput:!!props.userInput,userInput:props.userInput,skillArraysLength:skillArrays.length,skillArrays},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'O'})}).catch(()=>{});
    // #endregion
    if (props.userInput && skillArrays.length > 0) {
      const tree = createSkillTree('0');
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Output.jsx:236',message:'Skill tree created',data:{treeLength:tree?.length,firstTreeItem:tree?.[0]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'P'})}).catch(()=>{});
      // #endregion
      setPrevSkill(tree);
      setLoading(false);
    }
  }, [props.userInput, skillArrays]);


  return (
    <div className="app">
      <section className="output-container">
        {loading ? (
          <div className="loading">
            <br/>
            <img src={Loading} alt="Loading" />
            <p className='loading-text'> GENERATING SKILL BOARD... </p>
          </div>
        ) : (
          <div>
            <div className="tree">
              <Tree 
                data={createReactD3TreeData({ Skill: props.userInput, SkillID: 0, children: prevSkill })}
                orientation="vertical"
                translate={{ x: 550, y: 200 }}
                renderCustomNodeElement={renderRectSvgNode}
                zoomable={false}
                separation={{ siblings: 2, nonSiblings: 2 }}
              />
              <div className={`study_rogress ${isStudyProgressOpen ? 'open' : ''}`}>
                {isStudyProgressOpen && (
                  <div className="monster-content">
                    {areAllSkillsLearned(createReactD3TreeData({ Skill: props.userInput, SkillID: 0, children: prevSkill })) ? (
                      <div>
                        <p className='ini-egg-text'>Congratulations, You Got It!!!</p>
                        <img src={monsterNFT} alt="Monster NFT" className="monster-image" />
                        {isCollected ? 
                        (
                          <p className='ini-egg-text'> You have already collect it</p>
                        ) : (
                          <BigButton onClick={collectNft}> COLLECT NTF </BigButton>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className='ini-egg-text'>STUDY PROGRESS</p>
                        <br/>
                        <img src={iniEgg} alt="Initial Egg" className="ini-egg-image" />
                        <p className='ini-egg-text'>LIGHT UP ALL SKILLS TO UNLOCK YOUR MONSTER</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {showAllSkills && (
                <div className="filtered-skills-list">
                  <h3>Additional Skills (Deep Levels):</h3>
                  <ul>
                    {allSkillArrays
                      .filter(skill => {
                        // Find skills with depth > 2
                        const depth = getSkillDepth(skill, allSkillArrays);
                        return depth > 2;
                      })
                      .map((skill, index) => (
                        <li key={index}>
                          <strong>{skill.Skill}</strong> - Level {getSkillDepth(skill, allSkillArrays)}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              <div className='complete'>
                <BigButton onClick={completeAllQuiz}> Complete All Quiz</BigButton>
                <BigButton 
                  onClick={() => {
                    const newShowAll = !showAllSkills;
                    setShowAllSkills(newShowAll);
                    setSkillArrays(newShowAll ? allSkillArrays : filteredSkillArrays);
                  }}
                >
                  {showAllSkills ? 'Show Core Skills' : 'View All Skills'}
                </BigButton>
              </div>
            </div>
            <img
              src={Open}
              className={`toggle-button ${isStudyProgressOpen ? 'open' : ''}`}
              onClick={toggleStudyProgress}
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