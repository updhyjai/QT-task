import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';
import { getCountryData } from '../utils/apicalls';
import { isLoggedIn } from '../utils/AuthService';
import Pagination from "./Pagination";

class Home extends Component {

    constructor() {
        super();
        
    }
    render() {

        return (
            <div>
              
                

                <div className="col-sm-12">
                    {isLoggedIn() ?
                        <div className="jumbotron text-center">
                            <h2>View Countries List</h2>
                            <Link className="btn btn-lg btn-success" to='/countries'> Countries</Link>
                        </div> : <div className="jumbotron text-center"><h2>Get Access to Countries List By Logging In</h2></div>
                    }
                </div>
            </div>
        );
    }
  
}

export default Home;