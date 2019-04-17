import { Container } from "unstated";

class SearchContainer extends Container {
  state = {
    search: "",
    users: [],
    photos: []
  };

  async getUsers(query) {
    const response = await fetch(`https://api.github.com/search/users${query}`);
    const data = await response.json();
    console.log("DATA RESPONSE: ", data);
    return data;
  }

  search = () => {};

  map = () => {};

  handlerChange = async (value, history) => {
    console.log("PATH> ", history.location.pathname);
    console.log("query> ", history.location.search);
    const data = await this.getUsers(history.location.search);
    console.log("USERS>> ", data.items);

    await this.setState({ search: value, users: data.items });
  };
}

export default SearchContainer;
