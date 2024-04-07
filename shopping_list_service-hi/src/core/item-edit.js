//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ItemEdit = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemEdit",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { id, name } = props;

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    //@@viewOff:render
    return (
      <Uu5Elements.ListItem actionList={[
        { icon: "uugds-delete",  
        onClick: () => {
        }}
      ]}>
        <div>
          {name}
        </div>
      </Uu5Elements.ListItem>
    );
  },
});

//@@viewOn:exports
export { ItemEdit };
export default ItemEdit;
//@@viewOff:exports
