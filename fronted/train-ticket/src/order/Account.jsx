import React, { memo, useState } from 'react';
import './Account.css';
const Account = memo(function(props) {
    const { price = 0, length } = props;
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="account">
            <div
                className={expanded ? 'price expanded' : 'price'}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="money">{length * price}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交按钮</div>
            <div
                className={expanded ? 'layer' : 'layer hidden'}
                onClick={() => setExpanded(false)}
            ></div>
            <div className={expanded ? 'detail' : 'detail hidden'}>
                <div className="title">金额详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>￥{price}</span>
                        <span>&#xD7;{length}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
});
export default Account;
