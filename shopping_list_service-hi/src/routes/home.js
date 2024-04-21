//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useEffect, useState} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ShoppingListsMain from "../core/shopping-lists-main.js";
import ShoppingListDetail from "../core/shopping-list-detail.js";

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
    const { identity } = useSession();
    //@@viewOff:private
    const [shoppingLists, setShoppingLists] = useState([
      {
        id: "3887237",
        name: "James Shopping List",
        author: "James",
        authorId: "123",
        archive: false,
        members: [
          { id: "234", name: "Amelia" },
          { id: "345", name: "John" },
        ],
        items: [
          { id: "20382083", name: "Bread", completed: false },
          { id: "20352083", name: "Butter", completed: true },
          { id: "20382183", name: "Milk", completed: true },
        ],
      },
      {
        id: "3887236",
        name: "Chloe Shopping List",
        author: "Chloe",
        authorId: "456",
        archive: false,
        members: [
          { id: "123", name: "James" },
          { id: "345", name: "John" },
        ],
        items: [
          { id: "20382083", name: "Bread", completed: false },
          { id: "20352083", name: "Butter", completed: true },
          { id: "20382183", name: "Milk", completed: true },
        ],
      }
    ]);

    // useEffect(() => {
    //   setShoppingList(shoppingList);
    // }, [shoppingList]);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <ShoppingListsMain shoppingListObjects={shoppingLists} setShoppingLists={setShoppingLists} />
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
