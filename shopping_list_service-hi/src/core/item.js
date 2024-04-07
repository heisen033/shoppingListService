//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
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

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    let { id, name, completed } = props;
    const [ value, setValue ] = useState(completed);
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    //@@viewOff:render
    return (
      <Uu5Elements.ListItem>
        <div>
        <Uu5Forms.Checkbox.Input
            icon={value ? "uugds-check" : undefined} 
            onClick={(e) => {
              typeof onClick === "function" && onClick(e);
              setValue((v) => !v);
            }}
          />
          &nbsp;
          {name}
        </div>
      </Uu5Elements.ListItem>
    );
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports
