import { execSync } from "child_process";
import { PATHS } from "./paths.js";

export default class Calculation {
  constructor(data) {
    this.data = data;
  }

  callSizeAndQuantity() {
    let data = [];
    let id = 0;
    for (let path of Object.values(PATHS)) {
      try {
        data.push({
          id: Number(id),
          size: this.#commandCountSize(path),
          quantity: this.#commandCountQuantity(path),
        });
      } catch (error) {
        data.push({ id: Number(id), size: 0, quantity: 0 });
      }
      id++;
    }
    return data;
  }

  callClean() {
    for (let item of this.data) {
      try {
        execSync(`rm -rf ${PATHS[item.id]}*`);
      } catch (error) {}
    }
  }

  #commandCountSize(path) {
    return Number(execSync(`du -sk ${path}`).toString("utf8").split("\t")[0]);
  }

  #commandCountQuantity(path) {
    return Number(execSync(`ls -A1 ${path} | wc -l`).toString("utf8").trim());
  }
}
