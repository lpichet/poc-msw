import { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addUser, getUsers } from './api'
import { User } from './User'
import { worker } from './mocks/browser'
import { getUsersFail, setGetUser } from './mocks/handlers'



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = { email: event.target.email.value }
    const response = await addUser(user);
    if(!response) {
      setHasError(true);
      return;
    }
    setCount(count + 1);
    event.target.email.value = '';
  }
  const handleFail = () => {
    setHasError(false);
    worker.resetHandlers(setGetUser(getUsersFail));
    setCount(count + 1);
  }
  const handleFix = () => {
    setHasError(false);
    worker.resetHandlers();
    setCount(count + 1);
  }
  const handleRefresh = () => {
    setHasError(false);
    setCount(count + 1);
  }

  useEffect(() => {
    async function fetchUsers(): void {
      const data = await getUsers();
      if(data === null) {
        setHasError(true);
        setUsers([])
        return;
      }
      setUsers(data);
    }
    fetchUsers();
  }, [count])
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      {hasError && <div data-testid="error-message">Une erreur est survenue</div>}
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
        <input type='text' name="email" placeholder='Enter an email' autoFocus data-testid="email-input" style={{fontSize: "2rem"}}></input>
        <button type="submit" style={{backgroundColor: 'lightblue'}} data-testid="submit-input">Add user</button>
      </form>
      <div  style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
      <button style={{backgroundColor: 'salmon', width: "100%"}} data-testid="fail-button" onClick={handleFail}>Fail</button>
      <button style={{backgroundColor: 'lightgreen', width: "100%"}} data-testid="fix-button" onClick={handleFix}>Fix</button>
      </div>
      <div  style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
      <button style={{backgroundColor: 'green', width: "100%"}} data-testid="refresh-button" onClick={handleRefresh}>Refresh</button>
      </div>
      <ul data-testid="user-list">
        {users.map((user, index) => <li key={index}><h2>{user.email}</h2></li>)}
      </ul>
    </div>
  )
}

export default App
