import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

//To fix matchMedia error
beforeAll(() => {
  //Set up Enzyme adapter
  configure({ adapter: new Adapter() });

  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {}
      };
    };
});
