import {Link} from 'react-router-dom'

function Home(props) {

    return(
    <>
    ID:
    {"  "+props.user.id}
    <br/>
    USERNAME: 
    {"  "+props.user.username}
    </>
    )
}

export default Home;