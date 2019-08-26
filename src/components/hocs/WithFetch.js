import React, { Component } from "react";
import { fetchData } from "../../services/photoServices";

const withFetch = WrappedComponent => url => {
  return class withFetch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: false
      };
    }

    async doFetch(url) {
      return fetchData(url);
    }

    async componentDidMount() {
      this.setState({ isLoading: true });
      const data = await this.doFetch(url);
      console.log("data:: ", JSON.stringify(data, null, 1));
      this.setState({
        data,
        isLoading: false
      });
    }

    render() {
      const { isLoading, data } = this.state;

      return (
        <WrappedComponent isLoading={isLoading} data={data} {...this.props} />
      );
    }
  };
};

export default withFetch;
