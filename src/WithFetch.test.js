import React from "react";
import ReactDOM from "react-dom";
import WithFetch from "./components/hocs/WithFetch";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render } from "enzyme";
import PhotoGrid from "./components/PhotoGrid";

configure({ adapter: new Adapter() });

const photosMock = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796"
  }
];

it("renders a list of photos", () => {
  const PhotoGridWithFetch = WithFetch(PhotoGrid)(
    "https://jsonplaceholder.typicode.com/photos"
  );

  const wrapper = mount(<PhotoGridWithFetch />);

  expect(wrapper.state().isLoading).toBe(true);
  //expect(wrapper.prop("data")).toEqual({})

  wrapper.unmount();
});

it("calls google and returns data to me", async () => {
  const PhotoGridWithFetch = WithFetch(PhotoGrid)(
    "https://jsonplaceholder.typicode.com/photos"
  );

  /* 
 const fake = jest
    .spyOn(PhotoGridWithFetch.prototype, "doFetch")
    .mockImplementation(function() {
      this.setState({ isLoading: false, data: photosMock });
    });
*/

  const doFetch = jest.fn(() => console.log("LALALAL ALALLSDLASDL ASLDA"));

  const wrapper = mount(<PhotoGridWithFetch actions={doFetch} />);
  wrapper.instance().doFetch = await doFetch;
  wrapper.update();

  expect(wrapper.state().isLoading).toBe(true);
  console.log(wrapper.state());
  //expect(wrapper.state().data).toHaveLength(2);

  //expect(wrapper.prop("data")).toEqual({})

  //expect(fake).toHaveBeenCalled();

  wrapper.unmount();
});
