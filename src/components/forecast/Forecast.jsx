import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./Forecast.css";

const Week_Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({data}) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = Week_Days.slice(dayInAWeek, Week_Days.length).concat(Week_Days.slice(0, dayInAWeek));

    return(
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                                    <label className="label">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Pressure:</label>
                                    <label htmlFor="">{item.main.pressure}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Humidity:</label>
                                    <label htmlFor="">{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Clouds:</label>
                                    <label htmlFor="">{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Wind Speed:</label>
                                    <label htmlFor="">{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Sea Level:</label>
                                    <label htmlFor="">{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label className="grid-title">Feels Like:</label>
                                    <label htmlFor="">{Math.round(item.main.feels_like)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

export default Forecast;