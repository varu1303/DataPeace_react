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
      <div class="jumbotron">
        <h1 class="display-4">{this.state.first_name} {this.state.last_name}</h1>
        <p class="lead">Age - {this.state.age}</p>
        <hr class="my-4" />
        <p class="lead">Email - {this.state.email}</p>
        <hr class="my-4" />
        <p class="lead">Works At - {this.state.company_name}</p>
        <hr class="my-4" />
        <p class="lead">Web - {this.state.web}</p>
        <hr class="my-4" />
        <p class="lead">City - {this.state.city}</p>
        <hr class="my-4" />
        <p class="lead">State - {this.state.state}</p>
        <hr class="my-4" />
        <p class="lead">ZIP - {this.state.zip}</p>

      </div>
    )
  }
}


export default User;