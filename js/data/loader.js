/** @constant {string} */
const DATA_URL = `http://musicgame.hamsterin.space/jsonrandom/`;

/** @constant {string} */
const STATS_URL = `https://es.dump.academy/guess-melody/stats/`;

/** @constant {string} */
const DEFAULT_NAME = `anna178490`;

/** Class representing game model*/
class Loader {
  /**
   * Load game data
   * @return {Promise}
   */
  static loadData() {
    return fetch(DATA_URL).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    });
  }

  /**
   * Load statistics
   * @param {string} name
   * @return {Promise}
   */
  static loadResult(name = DEFAULT_NAME) {
    return fetch(`${STATS_URL}${name}`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    });
  }

  /**
   * Save player result
   * @param {Object} data
   * @param {string} name
   * @return {Promise}
   */
  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${STATS_URL}${name}`, requestSettings);
  }
}

export default Loader;
