import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Firstname</th>
          <th scope="col" className="hideInSM">Lastname</th> 
          <th scope="col" className="hideInSM">Company Name</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
          <th scope="col" className="hideInSM">Zip</th>
          <th scope="col" className="hideInMD">Email</th>
          <th scope="col" className="hideInMD">Web</th>
          <th scope="col">Age</th> 
        </tr>                 
      </thead>
      <tbody>
        {props.users.map((user, index) => {
          return (
                <tr key={index}>
                  <td scope="row"><Link to={`/user/${user.id}`}>{user.first_name}</Link></td>
                  <td className="hideInSM">{user.last_name}</td> 
                  <td className="hideInSM">{user.company_name}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td className="hideInSM">{user.zip}</td>
                  <td className="hideInMD">{user.email}</td>
                  <td className="hideInMD">{user.web}</td>
                  <td>{user.age}</td>
                </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}