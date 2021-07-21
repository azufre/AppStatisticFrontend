import axios from 'axios';
import {React, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";

const empty_statistic = {
    "continent": "",
    "country": "",
    "population": "",       
    "case_new": "",
    "case_active": "",
    "case_critical": "",
    "case_recovered": "",
    "case_1M_pop": "",
    "case_total": "",
    "death_new": "",
    "death_1M_pop": "",
    "death_total": "",
    "test_1M_pop": "",
    "test_total": "",
    "day": "",
    "time": "",
}

function AddStatistic(props) {
    
    const [Item, setItem] = useState(empty_statistic);
    const history = useHistory();

    const onSubmitHandler = (e) => {
        
        const statistic = {
            "continent": Item.continent,
            "country": Item.country,
            "population": Item.population,
            "cases": {
                "new": Item.case_new,
                "active": Item.case_active,
                "critical": Item.case_critical,
                "recovered": Item.case_recovered,
                "1M_pop": Item.case_1M_pop,
                "total": Item.case_total,
            },
            "deaths": {
                "new": Item.death_new,
                "1M_pop": Item.death_1M_pop,
                "total": Item.death_total,
            },
            "tests": {
                "1M_pop": Item.test_1M_pop,
                "total": Item.test_total,
            },
            "day": Item.day,
            "time": Item.time,
        }

        const token = localStorage.getItem('auth_token');
        const url_statistics = `${process.env.REACT_APP_API_BACKEND}/statistic`;
        const headers = {
            'Content-Type': 'application/json',
            'x-token': token
          }
        
        axios.post(url_statistics, statistic, {headers: headers}).then(res => {
            
            history.push(`/statictic/detail/${statistic.country}`);
        
        }).catch(error => {

            if(error.response.status && error.response.status === 401){

                localStorage.removeItem('current_user');
                localStorage.removeItem('auth_token');        
                props.setCurrentUser('');
                history.push('/login');

            }
            if(error.response.status && error.response.status === 400){
                alert('Oops! Something went wrong.');          
            }            
        });
        
        e.preventDefault();
    }

    const onChangeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <div style={{
            margin: '15px'
            }}>
            <div className="card" style={style}>
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="card-text" style={span_style}>
                                    <strong>
                                        * Enter data
                                    </strong>
                                </span>

                                <label>continent:</label>
                                <input type="text" required className="form-control" name="continent" value={Item.continent} onChange={onChangeHandler}/>

                                <label>country:</label>
                                <input type="text" required className="form-control" name="country" value={Item.country} onChange={onChangeHandler}/>

                                <label>population:</label>
                                <input type="number" required className="form-control" name="population" value={Item.population} onChange={onChangeHandler}/>

                                <label>Day:</label>
                                <input type="text" required className="form-control" name="day" value={Item.day} onChange={onChangeHandler}/>
                                
                                <label>time:</label>
                                <input type="text" required className="form-control" name="time" value={Item.time} onChange={onChangeHandler}/>
                                
                                <hr /> 

                                <span className="card-text" style={span_style}>
                                    <strong>
                                        * Cases
                                    </strong>
                                </span>

                                <label>new:</label>
                                <input type="text" required className="form-control" name="case_new" value={Item.case_new} onChange={onChangeHandler}/>

                                <label>active:</label>
                                <input type="number" required className="form-control" name="case_active" value={Item.case_active} onChange={onChangeHandler}/>

                                <label>critical:</label>
                                <input type="number" required className="form-control" name="case_critical" value={Item.case_critical} onChange={onChangeHandler}/>

                                <label>recovered:</label>
                                <input type="number" required className="form-control" name="case_recovered" value={Item.case_recovered} onChange={onChangeHandler}/>
                                
                                <label>1M_pop:</label>
                                <input type="String" required className="form-control" name="case_1M_pop" value={Item.case_1M_pop} onChange={onChangeHandler}/>
                                
                                <label>total:</label>
                                <input type="number" required className="form-control" name="case_total" value={Item.case_total} onChange={onChangeHandler}/>

                            </div>

                            <div className="col-md-6">
                                <span className="card-text" style={span_style}>
                                    <strong>
                                        * Deaths
                                    </strong>
                                </span>

                                <label>new:</label>
                                <input type="text" required className="form-control" name="death_new" value={Item.death_new} onChange={onChangeHandler}/>

                                <label>1M_pop:</label>
                                <input type="text" required className="form-control" name="death_1M_pop" value={Item.death_1M_pop} onChange={onChangeHandler}/>

                                <label>total:</label>
                                <input type="number" required className="form-control" name="death_total" value={Item.death_total} onChange={onChangeHandler}/>

                                <hr />  

                                <span className="card-text" style={span_style}>
                                    <strong>
                                        * Tests
                                    </strong>
                                </span>

                                <label>1M_pop:</label>
                                <input type="text" required className="form-control" name="test_1M_pop" value={Item.test_1M_pop} onChange={onChangeHandler}/>

                                <label>total:</label>
                                <input type="number" required className="form-control" name="test_total" value={Item.test_total} onChange={onChangeHandler}/>
                            </div>

                        </div>
                        <hr />
                        <button className="btn btn-dark">Save</button>
                    </form>                   
                </div>
            </div>
        </div>
    );

}

const style = {
    padding: '30px',
    display: 'block',
}

const span_style = {
    'display' : 'block'
}

export default withRouter(AddStatistic);