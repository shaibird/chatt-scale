//create form for user registration
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import myLogo from "./scalelogo.svg"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        userName: "",
        apeIndex: 0,
        height: 0

    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("scale_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/profile")
                }
            })
    }

    const handleRegister = (evt) => {
        evt.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    //can not have a duplicate email.
                    window.alert("Account with that email already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main className="containers" style={{ textAlign: "center" }}>
            <img className="nav-logo" src={myLogo} alt={"Chatt.Scale Logo"} />
            <form className="form--login" onSubmit={handleRegister}>
            
                <h1 className="h3 mb-3 font-weight-normal">Register for Scale.Chatt</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="fullName" className="form-control"
                        placeHolder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input onChange={updateCustomer}
                        type="text" id="userName" className="form-control"
                        placeHolder="Choose your username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="fullName"> Email address </label>
                    <input onChange={updateCustomer}
                        type="text" id="email" className="form-control"
                        placeHolder="Enter your email address" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
