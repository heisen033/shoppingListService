//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const shoppingListDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
      },
      pageSize: 3,
    });

    function handleLoad(dtoIn) {
      return Calls.ShoppingList.list(dtoIn);
    }

    function handleCreate(values) {
      return Calls.ShoppingList.create(values);
    }
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(shoppingListDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports