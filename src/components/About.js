import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a=useContext(noteContext);
  // use as componentDidMount
  useEffect(()=>{
    a.updateState();
    // eslint-disable-next-line
  },[]) 
  return (
    <div>
      This is about {a.state.name} and he is in class {a.state.class}
    </div>
  )
}

export default About
