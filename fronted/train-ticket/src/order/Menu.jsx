import React, { memo } from 'react';
import './Menu.css';
const MenuItem = memo(function(props) {
    const { onPress, title, value, active } = props;
    return (
        <li
            className={active ? 'active' : ''}
            onClick={() => {
                onPress(value);
            }}
        >
            {title}
        </li>
    );
});
const Menu = memo(function(props) {
    const { show, options, onPress, hideMenu } = props;
    return (
        <div>
            {show && (
                <div className="menu-mask" onClick={() => hideMenu()}></div>
            )}
            <div className={show ? 'menu show' : 'menu'}>
                <div className="menu-title"></div>
                <ul>
                    {options &&
                        options.map(option => {
                            return (
                                <MenuItem
                                    key={option.value}
                                    {...option}
                                    onPress={onPress}
                                ></MenuItem>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
});
export default Menu;
