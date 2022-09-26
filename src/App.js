import React, { useState, useEffect } from 'react'
import { View } from './components/View';


// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('users');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}

export const App = () => {

  // main array of objects state 
  const [users, setUsers] = useState(getDatafromLS());

  // input field states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // form submit event
  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    // creating an object
    let user = {
      name,
      email,
      phone,
      address
    }
    setUsers([...users, user]);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  }

  // delete from LS
  const deleteUser = (phone) => {
    const filteredUsers = users.filter((element, index) => {
      return element.phone !== phone
    })
    setUsers(filteredUsers);
  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users])

  return (
    <div className='wrapper'>
      <h1>User Register</h1>
      <p>Add your details to unlock all features & services</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
            onSubmit={handleAddBookSubmit}>
            <label>Name</label>
            <input type="text" className='form-control' required
              onChange={(e) => setName(e.target.value)} value={name}></input>
            <br></br>
            <label>Email</label>
            <input type="text" className='form-control' required
              onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label>Phone</label>
            <input type="text" className='form-control' required
              onChange={(e) => setPhone(e.target.value)} value={phone}></input>
            <br></br>
            <label>Address</label>
            <input type="text" className='form-control' required
              onChange={(e) => setAddress(e.target.value)} value={address}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
          <div className='view-container'>
            {users.length > 0 && <>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View users={users} deleteUser={deleteUser} />
                  </tbody>
                </table>
              </div>
              <button className='btn btn-danger btn-md'
                onClick={() => setUsers([])}>Remove All</button>
            </>}
            {users.length < 1 && <div>No Users are added yet</div>}
          </div>
        </div>



      </div>
    </div>
  )
}

export default App
