import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'

const SigninForm = ({setUser}) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState([''])
    const [formData, setFormData] = useState({
        username: '',
        hashedPassword: '',
    })

    const updateMessage = (message) => {
        setMessage(message)
    }

    const handleChange = (event) => {
        updateMessage('')
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await authService.signin(formData)
            setUser(user)
            navigate('/')
        } catch (error) {
            updateMessage(error.message)
        }
    }

    return (
        <main>
            <h1>Log In</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
            <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.hashedPassword}
            name="hashedPassword"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
            </form>
        </main>
    )
}

export default SigninForm