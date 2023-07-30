import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from '../components/BigButton';
import PropTypes from 'prop-types';
import './Input.css';

const Input = (props) => {
    const [position, setPosition] = useState('')
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const navigate = useNavigate();

    const navigateToOutput = () => {
        navigate(`/monster-output`);
    };

    // handle change when user selects an option for area of interest
    const handleInterestChange = (event) => {
        setAreaOfInterest(event.target.value);
        setPosition('');
    };

    // handle change when user selects an option for area of Position
    const handlePositionChange = (event) => {
        setPosition(event.target.value);
        props.setUserInputFn(event.target.value);
        localStorage.setItem('userInput', event.target.value);
    };
    
    const InterestOptions = [
        {value: 'art', label: 'Art'},
        {value: 'iT', label: 'IT'},
        {value: 'engineering', label: 'Engineering'},
        {value: 'science', label: 'Science '},
        {value: 'design', label: 'Design '},
    ];
    

    const ArtPositions = [
        {value: 'Fine Artist', label: 'Fine Artist'},
        {value: 'Art Illustrator', label: 'Art Illustrator'},
        {value: 'Graphic Designer', label: 'Graphic Designer'},
    ];

    const ITPositions = [
        {value: 'Software Development', label: 'Software Development'},
        {value: 'Web Development', label: 'Web Development'},
        {value: 'Systems Administration', label: 'Systems Administration'},
        {value: 'Network Engineering', label: 'Network Engineering'},
        {value: 'Cybersecurity', label: 'Cybersecurity'},
        {value: 'Data Science and Analytics', label: 'Data Science and Analytics'},
        {value: 'Cloud Computing', label: 'Cloud Computing'},
        {value: 'IT Consulting', label: 'IT Consulting'},
    ];

    const EngineeringPositions = [
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

    const SciencePositions = [
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

    const DesignPositions = [
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
    
    let positions = []
    if (areaOfInterest === 'art') {
        positions = ArtPositions;
    } else if (areaOfInterest === 'iT') {
        positions = ITPositions;
    } else if (areaOfInterest === 'engineering') {
        positions = EngineeringPositions;
    } else if (areaOfInterest === 'science') {
        positions = SciencePositions;
    } else if (areaOfInterest === 'design') {
        positions = DesignPositions;
    }

    return (
        <div>
          <div className="Interest_question">
            <h1>What is your area of interest?</h1>
            <div class="select-wrapper">
              <select value={areaOfInterest} onChange={handleInterestChange}>
                <option value="">Select an interest</option>
                {InterestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
      
          {areaOfInterest && positions && (
            <div className="career_question">
              <h1>What is your career goal?</h1>
              <div class="select-wrapper">
                <select value={position} onChange={handlePositionChange}>
                  <option value="">Select a position</option>
                  {positions.map((position) => (
                    <option key={position.value} value={position.value}>
                      {position.label}
                    </option>
                  ))}
                </select>
                <BigButton id='confirm' onClick={navigateToOutput}> Confirm </BigButton>
              </div>
            </div>
          )}
        </div>
    );
};

Input.protoTypes = {
    setUserInputFn: PropTypes.func
}

export default Input;
