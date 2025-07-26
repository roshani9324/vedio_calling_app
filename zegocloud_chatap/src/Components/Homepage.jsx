import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Homepage() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate(`/room/${input}`);
    }
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Enter Your name"
      />
      <button onClick={handleClick}> Join</button>
    </div>
  );
}

export default Homepage