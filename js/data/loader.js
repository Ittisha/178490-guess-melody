/** @constant {string} */
const SERVER_URL = `https://es.dump.academy/guess-melody`;

/** @constant {string} */
const DEFAULT_NAME = `anna178490`;

/** Class representing game model*/
class Loader {
  /**
   * Load game data
   * @return {Promise}
   */
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((response) => {
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
    return fetch(`${SERVER_URL}/stats/${name}`).then((response) => {
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
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}

export default Loader;
