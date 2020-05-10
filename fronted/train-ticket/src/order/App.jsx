import './App.css';
import { connect } from 'react-redux';
import React, { useCallback, useEffect, useMemo } from 'react';
import URI from 'urijs';
import Header from '../common/Header';
import dayjs from 'dayjs';
import Detail from '../ticket/Detail';
import Ticket from './Ticket';
import Account from './Account';
import Passengers from './Passengers';
import Choose from './Choose';
import Menu from './Menu';
import { bindActionCreators } from 'redux';
import {
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setSeatType,
    setDepartDate,
    setSearchParsed,
    fetchInitial,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    hideMenu,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
} from './action';

function App(props) {
    const {
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,
        dispatch,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const passengersCbs = useMemo(() => {
        return bindActionCreators(
            {
                createAdult,
                createChild,
                removePassenger,
                updatePassenger,
                showGenderMenu,
                showFollowAdultMenu,
                showTicketTypeMenu,
            },
            dispatch
        );
    }, []);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);

        const { trainNumber, dStation, aStation, type, date } = queries;

        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));
        dispatch(setSearchParsed(true));
    }, []);

    useEffect(() => {
        if (!searchParsed) {
            return;
        }

        const url = 'http://127.0.0.1:8890/rest/order'
            // .setSearch('dStation', departStation)
            // .setSearch('aStation', arriveStation)
            // .setSearch('type', seatType)
            // .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            // .toString();
        dispatch(fetchInitial(url));
    }, [searchParsed, departStation, arriveStation, seatType, departDate]);
    const menuCbs = useMemo(() => {
        return bindActionCreators(
            {
                hideMenu,
            },
            dispatch
        );
    }, []);
    const chooseCbs = useMemo(() => {
        return bindActionCreators(
            {
                updatePassenger,
            },
            dispatch
        );
    }, []);

    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack} />
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
                    <span
                        style={{ display: 'block' }}
                        className="train-icon"
                    ></span>
                </Detail>
                <Ticket price={price} type={seatType} />
                <Passengers passengers={passengers} {...passengersCbs} />
                {passengers.length > 0 && (
                    <Choose passengers={passengers} {...chooseCbs} />
                )}
                <Account length={passengers.length} price={price}></Account>
                <Menu show={isMenuVisible} {...menu} {...menuCbs} />
            </div>
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
