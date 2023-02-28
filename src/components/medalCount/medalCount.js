import React, { useEffect, useState } from "react";
import { medalApiEndpoint, sortMethod } from '../../constant';
import axios from 'axios';
import './medalCount.scss'
const MedalCount = (props) => {
    const sort = props.sort ? props.sort : sortMethod.GOLD
    const [medalData, setMedalData] = useState([]);
    const [sortValue, setSortValue] = useState(sort);
    const [isOnline, setIsOnline] = useState();


    const sortMedalData = (data, sortType) => {
        let sortedValue = data.sort((a, b) => b[sortType] - a[sortType]);
        setSortValue(sortType);
        setMedalData([...sortedValue]);
    }


    useEffect(() => {
        setIsOnline(navigator.onLine);
        navigator.onLine && axios.get(medalApiEndpoint).then(function (response) {
            sortMedalData(response.data, sort)
        });
    }, [])

    return (
        <>
            {isOnline ? <table className="medal-count">
                <thead>
                    <tr>
                        <th className="country">Medal Count</th>
                        <th className={(sortValue == sortMethod.GOLD) ? 'active' : ""} onClick={() => sortMedalData(medalData, sortMethod.GOLD)} aria-label="gold"><span className="circle gold"></span></th>
                        <th className={(sortValue == sortMethod.SILVER) ? 'active' : ""} onClick={() => sortMedalData(medalData, sortMethod.SILVER)} aria-label="silver"><span className="circle silver"></span></th>
                        <th className={(sortValue == sortMethod.BRONZE) ? 'active' : ""} onClick={() => sortMedalData(medalData, sortMethod.BRONZE)} aria-label="bronze"><span className="circle bronze"></span></th>
                        <th className={(sortValue == sortMethod.TOTAL) ? 'active' : ""} onClick={() => sortMedalData(medalData, sortMethod.TOTAL)}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {medalData.slice(0, 10).map((country, index) => (
                        <tr key={index}>
                            <td className="country"><div className="country-detail"><span>{index + 1}</span> <span className={country.code + " flag"}></span> <span>{country.code}</span></div></td>
                            <td>{country.gold}</td>
                            <td>{country.silver}</td>
                            <td>{country.bronze}</td>
                            <td>{country.total}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
                : <h2> Kindly check your Internet Connection</h2>
            }
        </>

    );

}

export default MedalCount;