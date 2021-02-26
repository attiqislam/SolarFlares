import React, { Component } from "react";
import TableForRegionsWithMostSolarFlares from "./TableForRegionsWithMostSolarFlares";
import TableForAllSolarFlares from "./TableForAllSolarFlares";

class RegionsWithMostSolarFlares extends Component {
  constructor(propos) {
    super(propos);
    this.state = {
      solarFlares: [],
      solarFlareRegionsWithOccurances: [],
      mostCommonClassTypes: "",
      numOfOccurancesOfClassType: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <TableForRegionsWithMostSolarFlares
          solarflareregionswithnumofoccurances={
            this.state.solarFlareRegionsWithOccurances
          }
          mostCommonClassTypes={this.state.mostCommonClassTypes}
          numOfOccurancesOfClassType={this.state.numOfOccurancesOfClassType}
        ></TableForRegionsWithMostSolarFlares>
        <br></br>
        <h1>All the solar flares of the given date range:</h1>
        <TableForAllSolarFlares solarFlares={this.state.solarFlares} />
      </React.Fragment>
    );
  }

  async componentDidMount() {
    // TODO, replace hard coded values
    const startDate = "2016-01-01";
    const endDate = "2016-12-31";
    const apiKey = "";

    // fetch(
    //   "https://api.nasa.gov/DONKI/FLR?startDate=" +
    //     startDate +
    //     "&endDate=" +
    //     endDate +
    //     "&api_key=" +
    //     apiKey
    // )
    //   .then((response) => response.json())
    //   .then((data) =>{ return data;});

    let solarFlares;

    solarFlares = await fetch(
      "https://api.nasa.gov/DONKI/FLR?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&api_key=" +
        apiKey
    )
      .then((r) => r.json())
      .then((data) => {
        return data;
      });

    //#region Code for calling methods to get Regions with the most solar flares
    let uniqueFlareRegions = this.getUniqueFlareRegions(solarFlares);

    //console.log("unique flare regions", uniqueFlareRegions);

    const solarFlareRegionsWithOccurances = this.getSolarFlareRegionsWithOccurances(
      solarFlares,
      uniqueFlareRegions
    );

    //#endregion

    //#region Code for calling methods to get The most common class type of solar flares
    const uniqueFlareClassTypes = this.getUniqueFlareClassTypes(solarFlares);

    const solarFlareClassTypesWithOccurances = this.getSolarFlareClassTypesWithOccurances(
      solarFlares,
      uniqueFlareClassTypes
    );

    let maxNumOfOccurances = this.getMaxNumberOfOccurances(
      solarFlareClassTypesWithOccurances
    );

    let mostCommonClassTypes = this.getMostCommonClassTypes(
      solarFlareClassTypesWithOccurances,
      maxNumOfOccurances
    );

    this.setState({
      solarFlareRegionsWithOccurances: solarFlareRegionsWithOccurances.sort(
        (a, b) =>
          b.NumberOfOccurances > a.NumberOfOccurances
            ? 1
            : a.NumberOfOccurances > b.NumberOfOccurances
            ? -1
            : 0
      ),
      numOfOccurancesOfClassType: maxNumOfOccurances,
      mostCommonClassTypes: mostCommonClassTypes.map(
        (classType) => classType["ClassType"]
      ),
      solarFlares,
    });

    //#endregion
  }

  //#region Code for getting The most common class type of solar flare
  getMostCommonClassTypes = (
    solarFlareClassTypesWithOccurances,
    maxNumOfOccurance
  ) => {
    return solarFlareClassTypesWithOccurances.filter(
      (classType) => classType.NumberOfOccurances == maxNumOfOccurance
    );
  };

  getMaxNumberOfOccurances = (solarFlareClassTypesWithOccurances) => {
    return solarFlareClassTypesWithOccurances.reduce(
      (max, ct) => (ct.NumberOfOccurances > max ? ct.NumberOfOccurances : max),
      solarFlareClassTypesWithOccurances[0].NumberOfOccurances
    );
  };

  getSolarFlareClassTypesWithOccurances = (
    solarFlares,
    uniqueFlareClassTypes
  ) => {
    let solarFlareClassTypesWithOccurances = [];

    uniqueFlareClassTypes.map((uniqueFlareClassType) => {
      let numberOfOccurances = solarFlares.filter(
        (solarFlare) => solarFlare.classType == uniqueFlareClassType.ClassType
      ).length;
      solarFlareClassTypesWithOccurances.push({
        ClassType: uniqueFlareClassType.ClassType,
        NumberOfOccurances: numberOfOccurances,
      });
    });

    return solarFlareClassTypesWithOccurances;
  };

  getUniqueFlareClassTypes = (solarFlares) => {
    const uniqueFlareClassTypes = [];
    const map = new Map();
    for (const item of solarFlares) {
      //if (item.activeRegionNum !== null) {
      if (!map.has(item.classType)) {
        map.set(item.classType, true); // set any value to Map
        uniqueFlareClassTypes.push({
          ClassType: item.classType,
        });
      }
      //}
    }

    return uniqueFlareClassTypes;
  };

  //#endregion

  //#region Code for getting Regions with the most solar flares

  getSolarFlareRegionsWithOccurances = (solarFlares, uniqueFlareRegions) => {
    let solarFlareRegionsWithOccurances = [];

    uniqueFlareRegions.map((uniqueFlareRegion) => {
      let numberOfOccurances = solarFlares.filter(
        (solarFlare) =>
          solarFlare.activeRegionNum == uniqueFlareRegion.RegionName
      ).length;
      solarFlareRegionsWithOccurances.push({
        RegionName: uniqueFlareRegion.RegionName,
        NumberOfOccurances: numberOfOccurances,
      });
    });

    return solarFlareRegionsWithOccurances;
  };

  getUniqueFlareRegions = (solarFlares) => {
    const uniqueFlareRegions = [];
    const map = new Map();
    for (const item of solarFlares) {
      //if (item.activeRegionNum !== null) {
      if (!map.has(item.activeRegionNum)) {
        map.set(item.activeRegionNum, true); // set any value to Map
        uniqueFlareRegions.push({
          RegionName: item.activeRegionNum,
        });
      }
      //}
    }
    //#endregion

    return uniqueFlareRegions;
  };
}

export default RegionsWithMostSolarFlares;
