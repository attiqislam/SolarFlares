import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const TableForRegionsWithMostSolarFlares = ({
  solarflareregionswithnumofoccurances,
  mostCommonClassTypes,
  numOfOccurancesOfClassType,
}) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Regions with the most solar flares</th>
          <th>Num. Of Solar flares</th>
        </tr>
      </thead>
      <tbody>
        {solarflareregionswithnumofoccurances.length > 0 ? (
          solarflareregionswithnumofoccurances.map((region, index) => {
            return (
              <tr key={index}>
                <td>{region.RegionName}</td>
                <td>{region.NumberOfOccurances}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="2">Loading ....</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td>
            The most common class type of solar flares:
            {mostCommonClassTypes}
          </td>
          <td>{numOfOccurancesOfClassType} (number of findings)</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableForRegionsWithMostSolarFlares;
