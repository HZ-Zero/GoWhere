import './App.css';
import { connect } from 'react-redux';
import React, { useCallback, useEffect, lazy, Suspense } from 'react';
import Header from '../common/Header';
import URI from 'urijs';
import Candidate from './Candidate';
// import Schedule  from './Schedule'
import useNav from '../common/useNav';
import { h0 } from '../common/fp';
import dayjs from 'dayjs';
import Nav from '../common/Nav';
import Detail from './Detail';
import { TrainContext } from './context';
import {
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setDepartDate,
    setSearchParsed,
    prevDate,
    nextDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,
    toggleIsScheduleVisible,
} from './action';

const Schedule = lazy(() => import('./Schedule.jsx'));
function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { aStation, dStation, date, trainNumber } = queries;

        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setSearchParsed(true));
    }, []);
    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );
    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

    useEffect(() => {
        if (!setSearchParsed) return;
        const url = new URI('/rest/ticket')
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString();
        fetch(url)
            .then(res => res.json())
            .then(result => {
                const { detail, candidates } = result;

                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                } = detail;
                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setTickets(candidates));
            });
    }, [setSearchParsed]);

    return (
        <div className="app">
            <div className="detail-wrapper">
                <Header title={trainNumber} onBack={onBack}></Header>
            </div>
            <div className="nav-wrapper">
                <Nav
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}
                    next={next}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                >
                    <span className="left"></span>
                    <span
                        className="schedule"
                        onClick={() => dispatch(toggleIsScheduleVisible())}
                    >
                        时刻表
                    </span>
                    <span className="right"></span>
                </Detail>
            </div>
            <TrainContext.Provider
                value={{
                    trainNumber,
                    departStation,
                    arriveStation,
                    departDate,
                }}
            >
                <Candidate tickets={tickets} />
            </TrainContext.Provider>
            {isScheduleVisible ? (
                <div
                    className="mask"
                    onClick={() => dispatch(toggleIsScheduleVisible())}
                >
                    <Suspense fallback={<div>loading</div>}>
                        <Schedule
                            date={departDate}
                            trainNumber={trainNumber}
                            departStation={departStation}
                            arriveStation={arriveStation}
                        />
                    </Suspense>
                </div>
            ) : null}
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
