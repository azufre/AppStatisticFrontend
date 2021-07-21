import { Navbar, Nav, Container } from 'react-bootstrap'
import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class BarNavegation extends Component {
           
     logout = () => {
                
        localStorage.removeItem('current_user');
        localStorage.removeItem('auth_token');
          
        this.props.setCurrentUser('');
        
       
    }

    logged_out_nav = (current_user) => (
        <>
        <Link to="/" className="nav-link">Welcome {current_user}</Link>
        <Link to="/statictic/add" className="nav-link">Add statictic</Link>
        <Link to="/" onClick={this.logout} className="nav-link">Logout</Link>
        </>
    );
    
    logged_in = (
      <>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/singup" className="nav-link">Sing up</Link>
      </>
    );
    
    render () {

      return <>    
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>    
                <Container>
                    <LinkContainer to="/">
                      <Navbar.Brand>App Statistics Covid19</Navbar.Brand>
                    </LinkContainer>            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                          {this.props.current_user ? this.logged_out_nav(this.props.current_user) : this.logged_in }                  
                        </Nav>                             
                    </Navbar.Collapse>                     
                </Container>
            </Navbar>
            </>;
    }
    

}

export default BarNavegation;
