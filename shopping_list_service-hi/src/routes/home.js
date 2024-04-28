//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useEffect, useState, useDataList} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ShoppingListsMain from "../core/shopping-lists-main.js";
import Calls from "../calls.js";
import { RouteController } from "uu_plus4u5g02-app";
import ShoppingListDetail from "../core/shopping-list-detail.js";
import ListProvider from "../bricks/shopping-list/list-provider.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // const shoppingListDataList = useDataList({
    //   pageSize: 8,
    //   handlerMap: {
    //     load: handleLoad,
    //     create: handleCreate,
    //   },
    //   itemHandlerMap: {
    //   },
    // });
    
    // function handleLoad(dtoIn) {
    //   return Calls.shoppingList.list(dtoIn);
    // }
    
    // function handleCreate(values) {
    //   return Calls.shoppingList.create(values);
    // }

    // const { state, data, newData, errorData, pendingData, handlerMap } = shoppingListDataList;
    // const shoppingListMock = props.shoppingListDataList.data.filter((item) => item !== undefined);
    // console.log(state, data, newData, errorData, pendingData, handlerMap)

    const { identity } = useSession();
    //@@viewOff:private

    // useEffect(() => {
    //   setShoppingList(shoppingList);
    // }, [shoppingList]);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
      {/* <RouteBar /> */}
        <ListProvider>
          {(shoppingListDataList) => (
            <RouteController routeDataObject={shoppingListDataList}>
              <div>
              <ShoppingListsMain shoppingListDataList={shoppingListDataList} />
              </div>
            </RouteController>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
