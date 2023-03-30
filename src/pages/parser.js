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
    });
    
    const handleFile = (event) => {
        Papa.parse((event.target.files[0]), {
            worker: true,
            complete: ( (results) => {
                console.log("displaying data: ")
                console.log(results.data)
            })
        })
    }

    return (
        <div>
            <input
                type="file"
                name="file"
                accpet=".csv"
                onChange={handleFile}
                style={ {display:"block", margin:"10px auto" }}
            ></input>

        </div>
    )


}

export default Parser;