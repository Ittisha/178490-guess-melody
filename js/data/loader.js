const SERVER_URL = `https://es.dump.academy/guess-melody`;

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((res) => res.json());
  }
}

export default Loader;
