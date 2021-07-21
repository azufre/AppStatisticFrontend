
import {React, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';

function Home({setCurrentUser}) {

    const [statistics, setstatistics] = useState([]);
    const [searchValue, setsearchValue] = useState('')    

    const history = useHistory();

    const _usebackgetStatistic = useCallback(
        () => {
            const token = localStorage.getItem('auth_token');
            const url_statistics = `${process.env.REACT_APP_API_BACKEND}/statistic`;

            axios.get(url_statistics, {headers: {'x-token': token}}).then(res => {
            
                setstatistics(res.data.data)
            
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
        [setCurrentUser, history],
    )

    useEffect(() => {

        _usebackgetStatistic();

    }, [_usebackgetStatistic])

    const handlerChangeSearch = (event) => {
        setsearchValue(event.target.value);
    };    
    
    let data = statistics;
            
    if(searchValue !== ''){
        const expRegx = new RegExp(searchValue, 'i');
        data = data.filter(q => q.country.match(expRegx));
    }

    return (
        <div>
            <div style={{
                margin:'7px'
            }}>
                <span style={{
                    fontSize:'20px',
                    
                }}>Current Statistics Covid19</span>
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" placeholder="search by country" className="form-control" value={searchValue} onChange={handlerChangeSearch}/>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-dark">Search</button>
                    </div>
                </div>
            </div>
            <div style={card_style}>
                
                {data.map(item => {
                    let link_to_detail = `/statictic/detail/${item.country}`;
                    return (
                        <div className="card" style={style} key={item._id}>
                            <div className="card-body">
                                <h5 className="card-title">{item.continent} - {item.country}</h5>
                                <span className="card-text" style={span_style}>Population: {item.population}</span>
                                <span className="card-text" style={span_style}>Cases total: {item.cases.total}</span>
                                <span className="card-text" style={span_style}>Deaths total: {item.deaths.total}</span>
                                <span className="card-text" style={span_style}>Tests total: {item.tests.total}</span>
                                <hr />
                                <Link to={link_to_detail} className="btn btn-primary">See more...</Link>                                
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const style = {
    width: '400px',
    height: '250px',
    display: 'block',
}

const span_style = {
    'display' : 'block'
}

const card_style = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    margin: '7px'
}

export default withRouter(Home);