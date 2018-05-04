import React from "react";
import fs from "fs";
import { render } from "react-dom";
import csv from "parse-csv";
import info from "./new_sales_data.csv";
import Row from "./row";
const res = csv.toJSON(info, { headers: { included: true } });
import "./styles.css";
import { Parser } from "json2csv";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: res
    };
    this.changeData = this.changeData.bind(this);
    this.exportData = this.exportData.bind(this);
  }

  exportData(e) {
    e.preventDefault();
    console.log("exportData");
    const newLine = "\r\n";
    const fields = Object.keys(this.state.data[0]);
    const parser = new Parser({ fields, header: true });
    const csv = parser.parse(this.state.data) + newLine;
    console.log(`exportData ${csv}`);
    fs.writeFile("data.csv", csv, function(err) {
      if (err) throw err;
    });
  }

  changeData(idx, attr, newVal) {
    let newData = Object.assign(this.state.data);
    newData[idx][attr] = newVal.toString();
    this.setState({ data: newData });
  }

  render() {
    let keys = Object.keys(this.state.data[0]);
    return (
      <div>
        <button onClick={e => this.exportData(e)}>Export Data</button>
        <table border="1">
          <thead>
            <tr>
              {keys.map(key => (
                <th key={key}>
                  <div>{key.toUpperCase()}</div>{" "}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data, idx) => (
              <Row
                key={idx}
                changeVal={this.changeData}
                index={idx}
                data={data}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
