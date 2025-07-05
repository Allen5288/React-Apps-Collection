import { useState } from 'react'
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';

const LoginWrapper = styled.div`
    max-width: 400px;
    margin: 120px auto;
    padding: 32px;
    background: #f4f6f8;
    border-radius: 8px;
`

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 12px;
`;

const Login = () => {

    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!username || !password) {
        setError('Please fill in all fields')
        return
      }
      // Handle login logic here
    }

  return (
    <LoginWrapper>
      <Title>Login</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </LoginWrapper>
  )
}

export default Login