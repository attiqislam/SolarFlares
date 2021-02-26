import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class TableForAllSolarFlares extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Flr ID</th>
            <th>Class Type</th>
            <th>Active Region Num</th>
            <th>Begin Time</th>
            <th>End Time</th>
            <th>Peak Time</th>
          </tr>
        </thead>
        <tbody>
          {this.props.solarFlares.length > 0 ? (
            this.props.solarFlares.map((flare, index) => {
              return (
                <tr key={index}>
                  <td>{flare.flrID}</td>
                  <td>{flare.classType}</td>
                  <td>{flare.activeRegionNum}</td>
                  <td>{flare.beginTime}</td>
                  <td>{flare.endTime}</td>
                  <td>{flare.peakTime}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">Loading ....</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default TableForAllSolarFlares;
