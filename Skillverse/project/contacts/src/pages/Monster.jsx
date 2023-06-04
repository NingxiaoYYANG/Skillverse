
const Monster = (props) => {
    //({ id, contract }) 
    const [monster, setMonster] = useState(null);
  
    useEffect(() => {
      const fetchMonsterDetails = async () => {
        if (!contract) {
          return;
        }
  
        try {
          const monsterDetails = await contract.methods.monsters(id).call();
          setMonster(monsterDetails);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMonsterDetails();
    }, [id, contract]);
  
    if (!monster) {
      return null;
    }
  
    return (
      <div className="monster">
        <ul>
          <li>ID: {monster.monsterID}</li>
          <li>Name: {monster.monsterName}</li>
          <li>Skills: {monster.skills.map((skill) => skill.skillID).join(", ")}</li>
        </ul>
      </div>
    );
  }
  
  export default Monster;
  