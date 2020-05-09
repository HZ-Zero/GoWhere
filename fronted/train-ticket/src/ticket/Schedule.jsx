import React, { memo, useState, useEffect } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import './Schedule.css';

const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,
        arriveTime,
        departTime,
        stay,
        isStartStation,
        isEndStation,
        isDepartStation,
        isArriveStation,
        beforeDepartStation,
        afterArriveStation,
    } = props;
    return (
        <li>
            <div
                className={isDepartStation || isArriveStation?'icon icon-red':'icon  '}
            >
                {isDepartStation? '出': isArriveStation? '到': index}
            </div>
            <div
                className={beforeDepartStation || afterArriveStation?'row  grey':'row '}
            >
                <span
                    className={isArriveStation || isDepartStation?'station  red':'station' }
                >
                    {station}
                </span>
                <span
                    className={isArriveStation?'arrtime red':'arrtime'}
                >
                    {isStartStation ? '始发站' : arriveTime}
                </span>
                <span
                    className={isDepartStation?'deptime red':'deptime'}
                >
                    {isEndStation ? '终到站' : departTime}
                </span>
                <span className="stoptime">
                    {isStartStation || isEndStation ? '-' : stay + '分'}
                </span>
            </div>
        </li>
    );
})

const Schedule = memo(function Schedule(props) {
    const { date, trainNumber, departStation, arriveStation } = props;

    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        const url = new URI('/rest/schedule')
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation)
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
            .toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let departRow;
                let arriveRow;

                for (let i = 0; i < data.length; ++i) {
                    if (!departRow) {
                        if (data[i].station === departStation) {
                            departRow = Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: true,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        } else {
                            Object.assign(data[i], {
                                beforeDepartStation: true,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    } else if (!arriveRow) {
                        if (data[i].station === arriveStation) {
                            arriveRow = Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: true,
                            });
                        } else {
                            Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    } else {
                        Object.assign(data[i], {
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: true,
                            isArriveStation: false,
                        });
                    }

                    Object.assign(data[i], {
                        isStartStation: i === 0,
                        isEndStation: i === data.length - 1,
                    });
                }

                setScheduleList(data);
            });
    }, [date, trainNumber, departStation, arriveStation]);

    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="deptime">到达</span>
                    <span className="arrtime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {scheduleList.map((schedule, index) => {
                        return (
                            <ScheduleRow
                                key={schedule.station}
                                index={index + 1}
                                {...schedule}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
});

export  default Schedule