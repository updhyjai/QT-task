import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';
import { getCountryData } from '../utils/apicalls';
import { isLoggedIn } from '../utils/AuthService';
import Pagination from "./Pagination";
import { createHistory } from "history/createBrowserHistory";
import { UnmountClosed } from "react-collapse";

class Countries extends Component {

    constructor() {
        super()
        
        this.state = {
            allCountries: [],
            currentCountries: [],
            currentPage: null,
            totalPages: null,
            isOpen:false,
            isEdit:false,
            country:{
                name: "",
                capital: "",
                region: "",
                timezones: "",
                callingCodes: ""
            }
        };
        this.getCountriesArray = this.getCountriesArray.bind(this);
        let countryFromWS = this.getCountriesArray();
        
    }

    getEmptyCountry(){

        const country = {
            name: "",
            capital: "",
            region: "",
            timezones: "",
            callingCodes: ""
        };
        return country;
    }

    getCountriesArray() {
        getCountryData().then((countriesList) => {

            console.log("in function");
            console.log(countriesList);
            this.setState({ allCountries: countriesList });
        });
    }

    componentDidMount() {
        //this.getCountriesArray();
        console.log("after get countriesarray");
        console.log(this.state.allCountries);
    }
    onPageChanged = data => {
        const { allCountries } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCountries, totalPages });
    };

    onDeleteCountry(country,e) {
        e.preventDefault();
        if(!this.state.isEdit && !this.state.isOpen)
        {
            let allCountries = this.removeCountryFromList(country);

            const { currentPage, totalPages } = this.state;
            console.log(currentPage);
            const pageLimit = 10;
            const offset = (currentPage - 1) * pageLimit;
            console.log(offset);
            const currentCountries = allCountries.slice(offset, offset + pageLimit);
            console.log(currentCountries);

            this.setState({ allCountries, currentCountries });
        }
        else
        {
            window.alert("Unable to delete "+ country.name + ". Please finish the current operation and try again.");
        }
       
      
    }

    removeCountryFromList(country){
        let allCountries = this.state.allCountries;
        allCountries.forEach(element => {
            if (element.name === country.name) {
                let index = allCountries.indexOf(element);
                console.log(index);
                let isDelete = window.confirm("Do you really want to delete the country : " + country.name);
                if (isDelete) {
                    allCountries.splice(index, 1);

                    window.alert(country.name + " is deleted successfully!");


                }


            }

        });
        return allCountries;
    }
    
    onAddCountry(country, e) {
        if(!this.state.isEdit)
        {const isOpen = !this.state.isOpen;
        this.setState({isOpen});
        //window.alert("Currently not handled, unable to find endpoints")
        }
    }
    onEditCountry(country, e) {
        if(!this.state.isOpen)
        {
            const isEdit = this.state.isEdit;
            if(isEdit)
                country = this.getEmptyCountry();
            this.setState({ isEdit: !isEdit, country: country });
        }
        
    }

    onChangeCountryName(e){
        let country =  this.state.country;
        country.name = e.target.value;
        this.setState({country});
        console.log(this.state.country);
    }
    onChangeCapital(e) {
        let country = this.state.country;
        country.capital = e.target.value;
        this.setState({ country });
        console.log(this.state.country);
        
    }
    onChangeRegion(e) {
        let country = this.state.country;
        country.region = e.target.value;
        this.setState({ country });
        console.log(this.state.country);
        
    }
    onChangeTimezone(e) {
        let country = this.state.country;
        country.timezones = e.target.value;
        this.setState({ country });
        console.log(this.state.country);
    }
    onChangeCallingCode(e) {
        let country = this.state.country;
        country.callingCodes = e.target.value;
        this.setState({ country });
        console.log(this.state.country);
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.isEdit)
        {
            const emptyCountry = this.getEmptyCountry();
            const isEdit = this.state.isEdit;
            this.setState({ isEdit: !isEdit, country: emptyCountry })
        }
        else
        {
            const countryToAdd = this.state.country;


            let allCountries = this.state.allCountries;
            this.addCountryToList(allCountries, countryToAdd);
        }
      
    }

    addCountryToList(allCountries,country){
        const { currentPage, totalPages } = this.state;
        const updatedTotalPage = totalPages + 1
        allCountries.push(country);
        allCountries.sort();

        console.log(currentPage);
        const pageLimit = 10;
        const offset = (currentPage - 1) * pageLimit;
        console.log(offset);
        const currentCountries = allCountries.slice(offset, offset + pageLimit);
        console.log(allCountries);
        const open = !this.state.isOpen;
        const emptyCountry = this.getEmptyCountry();
        this.setState({ allCountries: allCountries, currentCountries: currentCountries, currentPage: currentPage, TotalPages: updatedTotalPage, isOpen: open, country: emptyCountry });

    }

    handleEdit(e){
        e.preventDefault();
        
       // let allCountries = this.removeCountryFromList(country);
       // this.addCountryToList(allCountries,this.state.country)
        
    }
    render() {

        const {
            allCountries,
            currentCountries,
            currentPage,
            totalPages
        } = this.state;
        const totalCountries = allCountries.length;

        if (totalCountries === 0) return null;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        return (
            <div>
              
            <div className="container mb-5">
                <div className="row d-flex flex-row py-5">
                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <h2 className={headerClass}>
                                <strong className="text-secondary">{totalCountries}</strong>{" "}
                                Countries
              </h2>
                            {currentPage && (
                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                    Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                                    <span className="font-weight-bold">{totalPages}</span>
                                </span>
                            )}
                        </div>
                           
                    </div>
                        <button className="btn btn-primary " onClick={this.onAddCountry.bind(this)}>Add a country</button>
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                                totalRecords={totalCountries}
                                pageLimit={30}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />
                        </div>
                        <UnmountClosed isOpened={this.state.isOpen || this.state.isEdit}>
                            <div> 
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group"iv>
          <input type="text" value={this.state.country.name} required placeholder= "Country Name" onChange={this.onChangeCountryName.bind(this)} />
                                    </div>
                                    <div className="form-group"> 
                                        
          <input type="text" value={this.state.country.capital} required placeholder="Country Capital" onChange={this.onChangeCapital.bind(this)} />
                                    </div>
                                    <div className="form-group"> 
                                        
          <input type="text" value={this.state.country.region} requied placeholder="Country Region" onChange={this.onChangeRegion.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        
          <input type="text" value={this.state.country.timezones} placeholder="Country timezone" onChange={this.onChangeTimezone.bind(this)} />
                                    </div>
                                    <div className="form-group">
          <input type="number" value={this.state.country.callingCodes} placeholder="Country calling code" onChange={this.onChangeCallingCode.bind(this)} />
                                   </div>

                                    <div className="form-group"><input  className="btn btn-info" type="submit" value="Submit" /></div>
                                </form>
                            </div>
                        </UnmountClosed>  
                       
                    {currentCountries.map(country => (
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"> <span >{country.name}</span></h3>
                            </div>
                            <div className="panel-body">
                                <p>Capital : {country.capital} </p>
                                
                                <p>Region : {country.region} </p>
                                <p>Timezone : {country.timezones} </p>
                                
                                <p>Calling codes : {country.callingCodes} </p>
                               
                            </div>
                            <div>
                                   
                                    <button className="btn btn-info " onClick={this.onEditCountry.bind(this, country)}>Edit</button>
                                    <button className="btn btn-danger" onClick = {this.onDeleteCountry.bind(this,country)}>Delete</button>
                                </div>
                               
                               

                        </div>

                    ))}
                </div>
            </div>
            </div>
        );

    }
}

export default Countries;