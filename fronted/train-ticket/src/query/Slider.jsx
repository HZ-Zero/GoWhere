import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import './Slider.css';
import useWinSize from './useWinSize';
const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChanged,
        onEndChanged,
    } = props;

    const winSize = useWinSize();

    const startHandle = useRef();
    const endHandle = useRef();

    const lastStartX = useRef();
    const lastEndX = useRef();

    const range = useRef();
    const rangeWidth = useRef();

    const prevCurrentStartHours = useRef(currentStartHours);
    const prevCurrentEndHours = useRef(currentEndHours);

    const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
    const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

    if (prevCurrentStartHours.current !== currentStartHours) {
        setStart((currentStartHours / 24) * 100);
        prevCurrentStartHours.current = currentStartHours;
    }

    if (prevCurrentEndHours.current !== currentEndHours) {
        setEnd((currentEndHours / 24) * 100);
        prevCurrentEndHours.current = currentEndHours;
    }

    const startPercent = useMemo(() => {
        if (start >= end) return end;
        if (start > 100) {
            return 100;
        }

        if (start < 0) {
            return 0;
        }

        return start;
    }, [start]);

    const endPercent = useMemo(() => {
        if (end <= start) return start;
        if (end > 100) {
            return 100;
        }

        if (end < 0) {
            return 0;
        }

        return end;
    }, [end]);

    const startHours = useMemo(() => {
        return Math.round((startPercent * 24) / 100);
    }, [startPercent]);

    const endHours = useMemo(() => {
        return Math.round((endPercent * 24) / 100);
    }, [endPercent]);

    const startText = useMemo(() => {
        return startHours + ':00';
    }, [startHours]);

    const endText = useMemo(() => {
        return endHours + ':00';
    }, [endHours]);

    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }

    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e) {
        const touch = e.targetTouches[0];
        let distance = 0;
        if (lastEndX.current <= touch.pageX) {
            distance = lastEndX.current - lastStartX.current;
            setStart(start => start + (distance / rangeWidth.current) * 100);
            lastStartX.current = lastEndX.current;
        } else {
            distance = touch.pageX - lastStartX.current;
            setStart(start => start + (distance / rangeWidth.current) * 100);
            lastStartX.current = touch.pageX;
        }
    }

    function onEndTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;

        setEnd(end => end + (distance / rangeWidth.current) * 100);
    }

    useEffect(() => {
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        );
    }, [winSize.width]);

    useEffect(() => {
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );
        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandle.current.addEventListener('touchmove', onEndTouchMove, false);

        return () => {
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            );
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            );
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            );
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            );
        };
    });

    useEffect(() => {
        onStartChanged(startHours);
    }, [startHours]);

    useEffect(() => {
        onEndChanged(endHours);
    }, [endHours]);

    return (
        <div className="option">
            <h3>{title}</h3>
            <div className="range-slider">
                <div className="slider" ref={range}>
                    <div
                        className="slider-range"
                        style={{
                            left: startPercent + '%',
                            width: endPercent - startPercent + '%',
                        }}
                    ></div>
                    <i
                        ref={startHandle}
                        className="slider-handle"
                        style={{
                            left: startPercent + '%',
                        }}
                    >
                        <span>{startText}</span>
                    </i>
                    <i
                        ref={endHandle}
                        className="slider-handle"
                        style={{
                            left: endPercent + '%',
                        }}
                    >
                        <span>{endText}</span>
                    </i>
                </div>
            </div>
        </div>
    );
});
export default Slider;
