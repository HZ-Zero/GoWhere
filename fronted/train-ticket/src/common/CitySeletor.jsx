import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import './CitySeletor.css';

const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
});

const toAlpha = alpha=>{
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
}

const CityItem = memo(
    function CityItem(props){
        const {name,onSelect} =props
        
        return (
            <li className="city-li" onClick={()=>onSelect(name)} >
                {name}
            </li>
        )
    }
)

const CitySection = memo(
    function CitySection(props){
        const {title,cities = [],onSelect,} = props
        return (
            <ul className="city-ul">
                <li className="city-li" key="title" data-cate={title}>
                    {title}
                </li>
                {
                    cities.map(city=>{
                        return <CityItem key={city.name} name={city.name} onSelect={onSelect}/>
                    })
                }
            </ul>
        )
    }
    
)

const AlphaIndex = memo(function AlphaIndex(props) {
    const { alpha, onClick } = props;

    return (
        <i className="city-index-item" onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    );
});

const CityList = memo(
    function CityList(props){
        const {sections,onSelect,toAlpha} = props
        return (
            <div className="city-list">
                <div className="city-cate">
                    {
                        sections.map(section=>{
                            return (
                                <CitySection title={section.title} cities={section.citys} key={section.title} onSelect={onSelect} ></CitySection>
                            )
                        })
                    }
                </div>
                <div className="city-index">
                    {
                        
                        alphabet.map((item,key)=>{
                            return (
                                <AlphaIndex key={key} alpha={item} />
                                // <div>{item}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
)



const CitySelector=memo(
    function CitySelector(props){
        const {show,cityData,isLoading,onBack,
            fetchCityData,
            onSelect,}=props
        const [searchKey,setSearchKey]=  useState('')
        useEffect(()=>{
            if(show){
                fetchCityData()
            }
            },[show,cityData,isLoading])
        const outputCitySections = () =>{
            if(isLoading){
                return <div>Loading</div>
            } 
            if(cityData){
                return (<CityList onSelect={onSelect} sections={cityData.cityList} toAlpha={toAlpha}></CityList>)
            }
        }
        return (
            <div className={show?"city-selector":"city-selector hidden"}>
                <div className="city-search">
                    <div className="search-back" onClick={() => onBack()}>
                        <svg width="42" height="42">
                            <polyline
                                points="25,13 16,21 25,29"
                                stroke="#fff"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                    </div>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            value={searchKey}
                            className="search-input"
                            placeholder="城市、车站的中文或拼音"
                            onChange={e => setSearchKey(e.target.value)}
                        />
                    </div>
                    <i
                        onClick={() => setSearchKey('')}
                        className={searchKey.length==0?'search-clean hidden':'search-clean'}
                    >
                        &#xf063;
                    </i>
                </div>
                {/* {Boolean(key) && (
                    <Suggest searchKey={key} onSelect={key => onSelect(key)} />
                )} */}
                {outputCitySections()}
            </div>
        )
    }
)

export default CitySelector;
