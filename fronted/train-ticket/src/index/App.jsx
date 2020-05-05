import './App.css'
import React, { useCallback,useMemo } from 'react'
import {connect} from 'react-redux'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import CitySeletor from '../common/CitySeletor'
import {exchangeFromTo,showCitySelector,hideCitySelector,fetchCityData,setSelectedCity} from './action'
import { bindActionCreators } from 'redux'
function App (props){
    const {from,to,dispatch,isCitySelectorVisible,cityData,isDateSelectorVisible,setSelectedCity} = props;
    const onBack = useCallback(()=>{
        window.history.back()
    },[])
    const citySeletor = useMemo(()=>{
        return bindActionCreators(
            {
                onBack:hideCitySelector,fetchCityData,onSelect:setSelectedCity
            },dispatch
        )
        })
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}/>
            </div>
            <form>
                <Journey from={from} to={to} exchangeFromTo={()=>dispatch(exchangeFromTo())} showCitySelector={m=>dispatch(showCitySelector(m))} />
                <DepartDate/>
                <HighSpeed/>
                <Submit/>
            </form>
            <CitySeletor
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isDateSelectorVisible}
                {...citySeletor}
                />
        </div>
    )
}
export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);

