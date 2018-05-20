import React from 'react';
import axios from 'axios';

import Table from './usersTable';

class Users extends React.Component {

  state = {
    pages: 0,
    currentPage: 0,
    users: [],
    usersToshow: [],
    filterText: '',
    sortField: 'age',
    sortOrder: 'a',
    currentScroll: 1
  }

  changePage = (event) => {
    let page = parseInt(event.target.innerHTML);
    this.setState((prevState) => {
      return { usersToshow: prevState.users.slice( (page - 1) * 5 , page * 5), currentPage: page, currentScroll: page }
    })

    sessionStorage.setItem('PageNum', page);
  }

  filterUsers = (event) => {
    let  val = event.target.value.toLowerCase();
    let users;
    sessionStorage.setItem('fiterText', val);
    if (val) {
      users = JSON.parse(sessionStorage.getItem('Users')).filter(user => {
        return user.first_name.toLowerCase().indexOf(val) != -1;
      })
    }else {
      users = JSON.parse(sessionStorage.getItem('Users'));
      sessionStorage.setItem('PageNum', 1);
    }

    if (this.state.sortField === 'age' || this.state.sortField === 'zip') {
      if (this.state.sortOrder === 'a')
        users = users.sort(this.compareNumericalA)
      else
        users = users.sort(this.compareNumericalD)
    }else {
      if (this.state.sortOrder === 'a') {
        users = users.sort((a,b) => {return (a[this.state.sortField].toLowerCase() > b[this.state.sortField].toLowerCase()) ? 1 : ((b[this.state.sortField].toLowerCase() > a[this.state.sortField].toLowerCase()) ? -1 : 0)});;
      }else {
        users = users.sort((a,b) => {return (a[this.state.sortField].toLowerCase() > b[this.state.sortField].toLowerCase()) ? -1 : ((b[this.state.sortField].toLowerCase() > a[this.state.sortField].toLowerCase()) ? 1 : 0)});;
      }
    }
    this.setState(() => {
      return {
        pages: Math.ceil(users.length / 5),
        users,
        currentPage: 1,
        usersToshow: users.slice(0, 5),
        filterText: val
      }
    })
  }

  compareNumericalA= (a,b) => {

    if (a.age - b.age < 0)
      return -1;
    else if (a.age - b.age > 0)
      return 1;
    else
      return 0;
    
  }

  compareNumericalD = (a,b) => {
    if (a.age - b.age > 0)
      return -1;
    else if (a.age - b.age < 0)
      return 1;
    else
      return 0;     
  }


  handleSortFieldChange = (event) => {

    let field = event.target.value;
    sessionStorage.setItem('SF', field);
    if (field === 'age' || field === 'zip') {
      this.setState((prevState) => {
        let users;
        if (prevState.sortOrder === 'a')
          users = prevState.users.sort(this.compareNumericalA);
        else 
          users = prevState.users.sort(this.compareNumericalD);  
        return {
          sortField: field,
          users,
          usersToshow: users.slice((prevState.currentPage - 1) * 5, prevState.currentPage * 5) 
        }
      })      
    }else {
      this.setState((prevState) => {
        let users;
        if (prevState.sortOrder === 'a')
          users = prevState.users.sort((a,b) => {return (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : ((b[field].toLowerCase() > a[field].toLowerCase()) ? -1 : 0)} );
        else 
          users = prevState.users.sort((a,b) => {return (a[field].toLowerCase() > b[field].toLowerCase()) ? -1 : ((b[field].toLowerCase() > a[field].toLowerCase()) ? 1 : 0)});  
        return {
          sortField: field,
          users,
          usersToshow: users.slice((prevState.currentPage - 1) * 5, prevState.currentPage * 5) 
        }
      })       
    }
  }

  handleSortOrderChange = (event) => {
    let order = event.target.value;
    sessionStorage.setItem('SO', order);
    if (order === 'a') {
      this.setState((prevState) => {
        let users;
        if (prevState.sortField === 'age' || prevState.sortField === 'zip')
          users = prevState.users.sort(this.compareNumericalA);
        else 
          users = prevState.users.sort((a,b) => {return (a[prevState.sortField].toLowerCase() > b[prevState.sortField].toLowerCase()) ? 1 : ((b[prevState.sortField].toLowerCase() > a[prevState.sortField].toLowerCase()) ? -1 : 0)});  
        return {
          sortOrder: order,
          users,
          usersToshow: users.slice((prevState.currentPage - 1) * 5, prevState.currentPage * 5) 
        }
      })
    }else if (order === 'd') {
      this.setState((prevState) => {
        let users;
        if (prevState.sortField === 'age' || prevState.sortField === 'zip')
          users = prevState.users.sort(this.compareNumericalD);
        else 
          users = prevState.users.sort((a,b) => {return (a[prevState.sortField].toLowerCase() > b[prevState.sortField].toLowerCase()) ? -1 : ((b[prevState.sortField].toLowerCase() > a[prevState.sortField].toLowerCase()) ? 1 : 0)});  
        return {
          sortOrder: order,
          users,
          usersToshow: users.slice((prevState.currentPage - 1) * 5, prevState.currentPage * 5) 
        }
      })
    }
  } 


  componentDidMount() {
    if (!sessionStorage.getItem('Users')) {
      axios.get('https://demo9197058.mockable.io/users')
      .then(data => {
        sessionStorage.setItem('Users', JSON.stringify(data.data));
        let currentPage = 1;
        let filterText = '';
        if (sessionStorage.getItem('PageNum'))
          currentPage = parseInt(sessionStorage.getItem('PageNum'));
        if (sessionStorage.getItem('fiterText'))
          filterText = sessionStorage.getItem('fiterText');
        this.setState(() => {
          let NoOfPages = Math.ceil( data.data.length / 5 );
          let users = data.data;
          let sortField = 'age';
          let sortOrder = 'a';
          if (filterText) {
            users = users.filter(user => {
              return user.first_name.toLowerCase().indexOf(filterText) != -1;
            })
            NoOfPages = Math.ceil(users.length / 5);
          }
          if (sessionStorage.getItem('SF'))
            sortField = sessionStorage.getItem('SF');
          if (sessionStorage.getItem('SO'))
            sortOrder = sessionStorage.getItem('SO');

          if (sortField === 'age' || sortField === 'zip') {
            if (sortOrder === 'a') {
              users = users.sort(this.compareNumericalA);
            }else {
              users = users.sort(this.compareNumericalD);
            }
          }else {
            if (sortOrder === 'a') {
              users = users.sort((a,b) => {return (a[sortField].toLowerCase() > b[sortField].toLowerCase()) ? 1 : ((b[sortField].toLowerCase() > a[sortField].toLowerCase()) ? -1 : 0)});;
            }else {
              users = users.sort((a,b) => {return (a[sortField].toLowerCase() > b[sortField].toLowerCase()) ? -1 : ((b[sortField].toLowerCase() > a[sortField].toLowerCase()) ? 1 : 0)});;
            }
          }

          return {
            pages: NoOfPages,
            currentPage,
            users,
            usersToshow: users.slice((currentPage - 1) * 5, currentPage * 5),
            filterText,
            sortField,
            sortOrder,
            currentScroll: currentPage
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
    }else {
      let currentPage = 1;
      let filterText = '';
      if (sessionStorage.getItem('PageNum'))
        currentPage = parseInt(sessionStorage.getItem('PageNum'));
      if (sessionStorage.getItem('fiterText'))
        filterText = sessionStorage.getItem('fiterText');
      this.setState(() => {
        let NoOfPages = Math.ceil( JSON.parse(sessionStorage.getItem('Users')).length / 5 )
        let users = JSON.parse(sessionStorage.getItem('Users'));
        let sortField = 'age';
        let sortOrder = 'a';
        if (filterText) {
          users = users.filter(user => {
            return user.first_name.toLowerCase().indexOf(filterText) != -1;
          })
          NoOfPages = Math.ceil(users.length / 5);
        }
        if (sessionStorage.getItem('SF'))
        sortField = sessionStorage.getItem('SF');
        if (sessionStorage.getItem('SO'))
          sortOrder = sessionStorage.getItem('SO');
        if (sortField === 'age' || sortField === 'zip') {
          if (sortOrder === 'a') {
            users = users.sort(this.compareNumericalA);
          }else {
            users = users.sort(this.compareNumericalD);
          }
        }else {
          if (sortOrder === 'a') {
            users = users.sort((a,b) => {return (a[sortField].toLowerCase() > b[sortField].toLowerCase()) ? 1 : ((b[sortField].toLowerCase() > a[sortField].toLowerCase()) ? -1 : 0)});;
          }else {
            users = users.sort((a,b) => {return (a[sortField].toLowerCase() > b[sortField].toLowerCase()) ? -1 : ((b[sortField].toLowerCase() > a[sortField].toLowerCase()) ? 1 : 0)});;
          }
        }
        return {
          pages: NoOfPages,
          currentPage,
          users,
          usersToshow: users.slice((currentPage - 1) * 5, currentPage * 5),
          filterText,
          sortField,
          sortOrder,
          currentScroll: currentPage
        }
      })  
    }
  }

  render() {

    return (
      <div>
        <p className="containP">
          <input className="searchBox" type="text" placeholder="Find by First Name..." onChange={this.filterUsers} value={this.state.filterText} />
        </p>
          <div>
        <p className="containP">SORT
          <select
            className="filterBox"
            value={this.state.sortField} 
            onChange={this.handleSortFieldChange}
          >
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="company_name">Company Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
            <option value="zip">Zip</option>
            <option value="email">Email</option>
            <option value="web">Web</option>
            <option value="age">Age</option>
          </select>
          IN  
          <select
            className="filterBox"
            value={this.state.sortOrder} 
            onChange={this.handleSortOrderChange}
          >
            <option value="a">Ascending</option>
            <option value="d">Descending</option>
          </select>
          ORDER
        </p>
        </div>
        <Table users={this.state.usersToshow}/>
        <p className="containP">
            <span onClick={ () => {this.setState((prevState) => ({ currentPage: 1, currentScroll: 1, usersToshow: prevState.users.slice(0, 5)}))} }> FIRST  </span>
            <span onClick={ () => {if (this.state.currentScroll - 1 < 1) {this.setState((prevState) => ({ currentScroll: prevState.currentScroll - 5}))}} } className="dir"> <i className="fas fa-angle-left"></i>  </span>
              {this.state.pages && [...Array(this.state.pages)].map((e, i) => {
                if ( i + 1 < this.state.currentScroll + 3 && i + 1 >= this.state.currentScroll - 2 )
                  return (<span key={i} onClick={ this.changePage } className={this.state.currentPage === i + 1 ? 'current' : null}> {i + 1}  </span>)
              }
              )
            }
            <span onClick={ () => {if (this.state.currentScroll + 1 < Math.ceil(this.state.users / 5)) {this.setState((prevState) => ({ currentScroll: prevState.currentScroll + 5}))}} } className="dir"> <i className="fas fa-angle-right"></i>  </span>
            <span onClick={ () => {this.setState((prevState) => ({ currentPage: prevState.pages, currentScroll: prevState.pages, usersToshow: prevState.users.slice((prevState.pages - 1) * 5, prevState.pages * 5)}))} }> LAST  </span>
        </p>
      </div>
    )
  }
}

export default Users;