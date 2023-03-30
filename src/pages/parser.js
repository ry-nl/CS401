import { useState, useEffect } from "react";
import Papa from "papaparse"; // csv parser

const init_areas = "California";

function Parser() {

    const [rowState, setRowState] = useState({
        area_message: "Please wait for data to load",
        cum_or_inc: "Cumulative",
        data_loading: true,
        areas: init_areas,
        width: 0,
        height: 0,
        arealist: [],
        case_data: [],
        death_data: [],
        death_list: [],
        case_preds: [],
        case_pred_list: [],
        death_preds: [],
        death_pred_list: [],
        dataType: "case",
        case_data_plot: [],
        death_data_plot: [],
        case_preds_plot: [],
        death_preds_plot: [],
        data_date: [],
        pred_date: [],
        to_plot: [],
        data_list: [],// newly added
    });

    // variables for displaying tables
    const [data, setData] = useState([]);
    const [columnArray, setColumn] = useState([]);
    const [values, setValues] = useState([]);
    
    const handleFile = (event) => {
        Papa.parse((event.target.files[0]), {
            worker: true,
            complete: ( (results) => {
                // console.log(results.data)
                let thislist = [];
                for (let i = 1; i < results.data.length; i++) {
                    if (results.data[i].length > 2) thislist[i - 1] = results.data[i][1];
                }
                // console.log("displaying thislist: " + thislist);

                // for displaying tables
                const columnArray = [];
                const valueArray = [];
                results.data.map( (d) => {
                    columnArray.push(Object.keys(d));
                    valueArray.push(Object.values(d));
                });
                setData(results.data);
                setColumn(columnArray[0]);
                setValues(valueArray);
                
                setRowState({ ...rowState, data_list: thislist});
            })
        })
    }

    return (
        <div>
            <h2
                style={ {display:"flex", margin:"30px auto", paddingLeft:"100px" }}>
                Upload files here
            </h2>
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={handleFile}
                style={ {display:"block", margin:"10px auto" }}
            ></input>

            <br/>   

            <p
                style={ {display:"flex", margin:"30px auto", paddingLeft:"100px" }}>
                File uploaded:
            </p>

            <table style={{borderCollapse:"collapse", border:"1px solid red", margin:"5px auto"}}>
                <thead>
                    <tr>
                        {columnArray.map((col, i) => (
                            <th style={{border:"1px solid red"}} key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {values.map((v, i) => (
                        <tr key={i}>
                            {v.map((value, i) => (
                                <td style={{border:"1px solid red"}} key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )


}

export default Parser;