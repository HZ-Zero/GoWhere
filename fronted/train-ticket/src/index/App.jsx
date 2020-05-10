import './App.css';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';
import CitySeletor from '../common/CitySeletor';
import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
} from './action';
import { bindActionCreators } from 'redux';
import DateSeletor from '../common/DateSeletor';
import { h0 } from '../common/fp';

function App(props) {
    const {
        from,
        to,
        dispatch,
        isCitySelectorVisible,
        cityData,
        isDateSelectorVisible,
        departDate,
        highSpeed,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);
    const citySeletor = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideCitySelector,
                fetchCityData,
                onSelect: setSelectedCity,
            },
            dispatch
        );
    }, []);

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);
    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, []);

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey
                    from={from}
                    to={to}
                    exchangeFromTo={() => dispatch(exchangeFromTo())}
                    showCitySelector={m => dispatch(showCitySelector(m))}
                />
                <DepartDate time={departDate} {...departDateCbs} />
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
                <Submit />
            </form>
            <CitySeletor
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isDateSelectorVisible}
                {...citySeletor}
            />
            <DateSeletor
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />
        </div>
    );
}
export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
