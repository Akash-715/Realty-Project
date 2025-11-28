import React from "react";
import './style.css'





function TableComponent({ storeData }){

    return(
        <div>
            <table  className = "Table-content" >
                          <thead>
                        <tr>
                            <th>Url</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Minimum Price</th>
                            <th>Maximum Price</th>
                            <th>Average Price</th>
                            <th>ppSqFt</th>
                            <th>AreaSqFt</th>
                            <th>Location</th>
                            <th>City</th>
                            <th>Long Address</th>
                            <th>Building Status</th>
                            <th>Rera Status</th>
                            <th>Bedroom</th>
                            <th>Bathroom</th>
                            <th>Furnishing</th>
                            <th>Source</th>
                        </tr>
                    </thead>

                    <tbody>
                        {storeData.map((data , index) => (
                            <tr key = {index}>
                                <td>
                                <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
                                </td>
                                <td>{data.Title}</td>
                                <td>{data.description}</td>
                                <td>{data.minPrice}</td>
                                <td>{data.maxPrice}</td>
                                <td>{data.avgPrice}</td>
                                <td>{data.pricePersqft}</td>
                                <td>{data.areaSqft}</td>
                                <td>{data.Location}</td>
                                <td>{data.city}</td>
                                <td>{data.LongAddress}</td>
                                <td>{data.BuildingStatus}</td>
                                <td>{data.ReraStatus}</td>
                                <td>{data.Bedroom}</td>
                                <td>{data.Bathroom}</td>
                                <td>{data.Furnishing}</td>
                                <td>{data.Source}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
        </div>
    ); 
}

export default TableComponent;