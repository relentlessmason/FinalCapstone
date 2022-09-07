import {Link} from 'react-router-dom'
import QuickLook from './QuickLook';
import Details from './Details';
import {useState} from 'react';
import './Home.css'

function Home(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);

    const showDetailsHandle = (dayStr) => {
        setData(dayStr);
        setShowDetails(true);
    };

    return(
        <>
            <div>
            ID:
            {"  "+props.user.id}
            <br/>
            USERNAME: 
            {"  "+props.user.username}
            </div>
  
    
      <QuickLook showDetailsHandle={showDetailsHandle} />
      <br />
      {/* {showDetails && <Details data={data} />}    */}
    </>
    )
}

export default Home;