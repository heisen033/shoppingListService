//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import { useUser } from "./user.js";
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

const ShoppingListsMain = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsMain",
  // nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    // const { children } = props;
    const user = useUser();

    const [shoppingLists, setShoppingLists] = useState([]);
    const [open, setOpen] = useState(false);
    const gridProps = {
      templateColumns: "repeat(4, 1fr)",
      columnGap: 8,
    };
    const gridContent = (
      <>
              <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content A</Uu5Elements.Box>
              <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content B</Uu5Elements.Box>
              <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content C</Uu5Elements.Box>
              <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content D</Uu5Elements.Box>
      </>
    );
    //@@viewOff:private
    return (
      <>
        <Uu5Elements.Block
          header="Shopping Lists"
          headerType="title"
          card="full"
          actionList={[{ icon: "uugds-plus", children: "Add", onClick: () => setOpen(true) }]}
        >
          {shoppingLists.map((shoppingList) => (
          <div key={shoppingList.id}>
            {shoppingList.name}
            <Uu5Elements.Button>Detail</Uu5Elements.Button>
          </div>
        ))}
        </Uu5Elements.Block>
        <Uu5Forms.Form.Provider key={open} onSubmit={(e) => {
          const shoppingList = e.data.value;
          setShoppingLists((shoppingLists) => [...shoppingLists, {...shoppingList, id: Utils.String.generateId()}]);
          setOpen(false);
        }} >
          <Uu5Elements.Modal 
          open={open}
          onClose={() => setOpen(false)}
          header="Add Shopping list"
          footer = {
            <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "end"})}>
              <Uu5Forms.SubmitButton />
              <Uu5Forms.CancelButton onClick={() => setOpen(false)} />

            </div>
          }
          >
            <Uu5Forms.Form.View gridLayout="">
              <Uu5Forms.FormText name="name" label="Name" />
              <Uu5Forms.FormText readOnly name="author" label="Author" initialValue={user.name}/>
            </Uu5Forms.Form.View>
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
  },
});

//@@viewOn:exports
export { ShoppingListsMain };
export default ShoppingListsMain;
//@@viewOff:exports
