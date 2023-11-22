const cities = ["Minas Tirith", "Edoras", "Hobbiton"]

export default function CitiesList() {
    return (
        <div className="cities">
            <h2>See the forecasts</h2>
            <ul>
            {cities.map((x) => 
                <li key={x}>
                    {x}
                </li>)}
            </ul>
        </div>
    )
}