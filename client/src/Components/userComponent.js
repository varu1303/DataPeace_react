import React from 'react';

class User extends React.Component {

    state = {
      id: '',
      first_name: '',
      last_name: '',
      company_name: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      web: '',
      age: ''
    }

    componentDidMount() {
      if (!sessionStorage.getItem('Users')) {
        axios.get('https://demo9197058.mockable.io/users')
        .then(data => {
          sessionStorage.setItem('Users', JSON.stringify(data.data));
          this.setState(() => {
            let user = JSON.parse(sessionStorage.getItem('Users'))[(this.props.match.params.id) - 1];
            return user;
          })
        })
        .catch(error => {
          console.log(error);
        })
      }else {
        this.setState(() => {
          let user = JSON.parse(sessionStorage.getItem('Users'))[(this.props.match.params.id) - 1];
          return user;
        })  
      }
    }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">{this.state.first_name} {this.state.last_name}</h1>
        <p className="lead">Age - {this.state.age}</p>
        <hr className="my-4" />
        <p className="lead">Email - {this.state.email}</p>
        <hr className="my-4" />
        <p className="lead">Works At - {this.state.company_name}</p>
        <hr className="my-4" />
        <p className="lead">Web - {this.state.web}</p>
        <hr className="my-4" />
        <p className="lead">City - {this.state.city}</p>
        <hr className="my-4" />
        <p className="lead">State - {this.state.state}</p>
        <hr className="my-4" />
        <p className="lead">ZIP - {this.state.zip}</p>

      </div>
    )
  }
}


export default User;