import {Link} from 'react-router-dom'

function Home(props) {


    return(
        <>
    <div>
    ID:
    {"  "+props.user.id}
    <br/>
    USERNAME: 
    {"  "+props.user.username}
    </div>
    <p>
            There once was a llama named greg <br/>
            who loved to chew on a peg <br/>
            And then one night <br/>
            his peg gave a cry <br/>
            and greg a great fright <br/>
            when turned down to find <br/>
            that it wasn't wood but a leg
    </p>
    </>
    )
}

export default Home;