import { useParams, useHistory, withRouter } from "react-router-dom";
import {React, useState, useEffect, useCallback} from 'react';
import axios from 'axios';


const empty_statistic = {
    "_id":"", 
    "continent": "",
    "country": "",
    "population": "",
    "cases": {
        "_id": "",
        "new": "",
        "active": "",
        "critical": "",
        "recovered": "",
        "1M_pop": "",
        "total": "",
    },
    "deaths": {
        "_id": "",
        "new": "",
        "1M_pop": "",
        "total": "",
    },
    "tests": {
        "_id": "",
        "1M_pop": "",
        "total": "",
    },
    "day": "",
    "time": "",
}

function StatisticDetail({setCurrentUser}) {
        
    const [item, setItem] = useState(empty_statistic);
    const [IsLoading, setIsLoading] = useState(true)

    let { id } = useParams();

    const history = useHistory();

    const _callbackgetStatisticDetail = useCallback(
        () => {
            const token = localStorage.getItem('auth_token');
            const url_statistics = `${process.env.REACT_APP_API_BACKEND}/statistic/${id}`;

            axios.get(url_statistics, {headers: {'x-token': token}}).then(res => {
                
                if(res.data.data.length > 0){

                    setItem(res.data.data[0]);
                
                }
                
                setIsLoading(false);
            
            }).catch(error => {
                if(error.response.status && error.response.status === 401){

                    localStorage.removeItem('current_user');
                    localStorage.removeItem('auth_token');        
                    setCurrentUser('');
                    history.push('/login');

                }
                if(error.response.status && error.response.status === 400){
                    alert('Oops! Something went wrong.');          
                }
            });
        },
        [id, history, setCurrentUser],
    )

    useEffect(() => {

        _callbackgetStatisticDetail();
        
    }, [_callbackgetStatisticDetail])
    
    const currentStateLoading = (
        <div>
            loading...
        </div>
    );

    return (
        <>
        {IsLoading ? currentStateLoading :
        <div style={{
            margin: '15px'
        }}>
            <div className="card" style={style} key={item._id}>
            <div className="card-body">
                <h5 className="card-title">{item.continent} - {item.country}</h5>
                <span className="card-text" style={span_style}>Population: {item.population}</span>
                <span className="card-text" style={span_style}>Day: {item.day}</span>
                <span className="card-text" style={span_style}>Time: {item.time}</span>
                
                <hr /> 

                <span className="card-text" style={span_style}>
                    <strong>
                        * Cases
                    </strong>
                </span>

                <span className="card-text" style={span_style}>new: {item.cases.new}</span>
                <span className="card-text" style={span_style}>active: {item.cases.active}</span>
                <span className="card-text" style={span_style}>critical: {item.cases.critical}</span>
                <span className="card-text" style={span_style}>recovered: {item.cases.recovered}</span>
                <span className="card-text" style={span_style}>1M_pop: {item.cases['1M_pop']}</span>
                <span className="card-text" style={span_style}>total: {item.cases.total}</span>

                <hr />  

                <span className="card-text" style={span_style}>
                    <strong>
                        * Deaths
                    </strong>
                </span>

                <span className="card-text" style={span_style}>new: {item.deaths.new}</span>
                <span className="card-text" style={span_style}>1M_pop: {item.deaths['1M_pop']}</span>
                <span className="card-text" style={span_style}>total: {item.deaths.total}</span>

                <hr />  

                <span className="card-text" style={span_style}>
                    <strong>
                        * Tests
                    </strong>
                </span>

                <span className="card-text" style={span_style}>1M_pop: {item.tests['1M_pop']}</span>
                <span className="card-text" style={span_style}>total: {item.tests.total}</span>


            </div>
        </div>
        </div>}
        </>
    );

}

const style = {
    width: '400px',
    height: '650px',
    display: 'block',
}

const span_style = {
    'display' : 'block'
}

export default withRouter(StatisticDetail);