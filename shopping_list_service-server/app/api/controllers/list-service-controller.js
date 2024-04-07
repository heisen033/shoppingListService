"use strict";
const ListServiceAbl = require("../../abl/list-service-abl.js");

class ListServiceController {
  init(ucEnv) {
    return ListServiceAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ListServiceAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ListServiceAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ListServiceController();
