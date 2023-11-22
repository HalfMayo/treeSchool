import {useState} from 'react'

const infos = ["Account", "Preferences", "Settings"]

export default function Login({user}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return(
        <nav>
            <img className="small-pic" src="https://picsum.photos/200" alt="logo"/>

            <div className="login">
                <div className={`${isLoggedIn ? "visible" : "invisible"}`}>
                    <img className="small-pic" src="https://picsum.photos/200" alt="avatar"/>
                    <h3 className="hover-sub">{user}</h3>
                    <ul>
                        {infos.map((x) =>
                            <li className="hover-sub" key={x}>{x}</li>
                            )}
                    </ul>
                </div>
                <button onClick={() => setIsLoggedIn((prev) => !prev)}>{`${isLoggedIn ? "Logout" : "Login"}`}</button>
            </div>
        </nav>
    )
}