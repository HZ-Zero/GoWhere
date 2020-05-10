import React, { useMemo, memo } from 'react';
import 'dayjs/locale/zh-cn';
import './Nav.css';
// import classnames from "classnames";
import dayjs from 'dayjs';
const Nav = memo(function Nav(props) {
    const { date, prev, next, isPrevDisabled, isNextDisabled } = props;
    const currentString = useMemo(() => {
        const d = dayjs(date);
        return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
    }, [date]);
    return (
        <div className="nav">
            <span
                onClick={prev}
                className={
                    isPrevDisabled ? 'nav-prev   nav-disabled' : 'nav-prev'
                }
            >
                前一天
            </span>
            <span className="nav-current">{currentString}</span>
            <span
                onClick={next}
                className={
                    isNextDisabled ? 'nav-next nav-disabled' : 'nav-next'
                }
            >
                后一天
            </span>
        </div>
    );
});

export default Nav;
