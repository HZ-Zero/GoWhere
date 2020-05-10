import React, { memo, useState,useEffect } from 'react';
import './Account.css';
const Account = memo(function(props) {
    const { price = 0, length } = props;
    const [expanded, setExpanded] = useState(false);
    const [showMsg, setshowMsg] = useState('提交订单');
    useEffect(()=>{
        console.log(showMsg)
    },[showMsg])
    const show=(Msg)=>{
        if (Msg=='提交订单')
            setshowMsg('提交成功')
        else
            setshowMsg('提交订单')
    }
    return (
        <div className="account">
            <div
                className={expanded ? 'price expanded' : 'price'}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="money">{length * price}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button" onClick={()=>show(showMsg)}>{showMsg}</div>
            <div
                className={expanded ? 'layer' : 'layer hidden'}
                onClick={() => setExpanded(false)}
            ></div>
            <div className={expanded? 'detail' : 'detail hidden'}>
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
