import { useState, useEffect } from "react";

const Clock = () => {
    const vko_paiva = new Array("sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai")
    const kuukausi = new Array("tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta")
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div>
            <h2>{time.toLocaleTimeString()}</h2>
            <p>Tänään on {vko_paiva[time.getDay()]},<br />{time.getDate()}. {kuukausi[time.getMonth()]}<br />vuonna {time.getFullYear()}</p>
        </div>
    )
}

export default Clock;
