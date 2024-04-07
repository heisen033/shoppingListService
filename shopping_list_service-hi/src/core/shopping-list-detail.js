//@@viewOn:imports
import { createVisualComponent, useState, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useUser } from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item.js";
import { useEffect } from "uu5g05";
import ItemEdit from "./item-edit.js";
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

const ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private
    let shoppingListExample = {
      id: "3887237",
      name: "James Shopping List",
      author: "James",
      authorId: "123",
      members: [
        { id: "234", name: "Amelia" },
        { id: "345", name: "John" },
      ],
      items: [
        { id: "20382083", name: "Bread", completed: false },
        { id: "20352083", name: "Butter", completed: true },
        { id: "20382183", name: "Milk", completed: true },
      ],
    };

    // const USERS = [
    //   { id: "123", name: "James" },
    //   { id: "234", name: "Amelia" },
    //   { id: "345", name: "John" },
    //   { id: "456", name: "Chloe" },
    // ];
    // function getUsernameById(memberId) {
    //   const user = USERS.find((member) => member.id === memberId);
    //   return user.name;
    // }
    //@@viewOn:interface
    //@@viewOff:interface
    const user = useUser();
    // console.log(user.id, shoppingListExample.authorId);

    const [shoppingList, setShoppingList] = useState(shoppingListExample);
    const [open, setOpen] = useState(false);
    const editAvailability = !(user.id === shoppingListExample.authorId);
    // const [selectedMembers, setSelectedMembers] = useState(shoppingList.members.map((member) => member.id));
    const [items, setItems] = useState(shoppingList.items);
    const [hasAccess, setHasAccess] = useState(false);
    console.log(items)
    useEffect(() => {
      setHasAccess(shoppingList.members.some((member) => member.id === user.id) || user.id === shoppingList.authorId);
    }, [user, shoppingList]);

    //shoppingList.members.some(member => member.id === user.id) || user.id ===  shoppingList.authorId
    //@@viewOff:private
    return (
      <div>
        {hasAccess ? (
          <>
            <Uu5Elements.Block
              header={shoppingList.name}
              headerType="title"
              card="full"
              actionList={[
                {
                  children: "Edit",
                  onClick: () => setOpen(true),
                },
              ]}
              footer={
                <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "end" })}>
                  {/* <Uu5Forms.SubmitButton />
              <Uu5Forms.CancelButton onClick={() => setOpen(false)} /> */}
                  {shoppingList.members.some((member) => member.id === user.id) && (
                    <Uu5Elements.Button
                      children="Leave"
                      onClick={() => {
                        setShoppingList((prevList) => ({
                          ...prevList,
                          members: prevList.members.filter((member) => member.id !== user.id),
                        }));
                        setHasAccess(false);
                      }}
                    />
                  )}
                  {user.id === shoppingList.authorId && <Uu5Elements.Button children="Delete" colorScheme={"red"} />}
                </div>
              }
            >
              <div>
                <Uu5Elements.InfoItem direction="vertical-reverse" subtitle="Owner" title={shoppingList.author} />
                <h4 />
                <Uu5Elements.InfoItem
                  direction="vertical-reverse"
                  subtitle="Members"
                  title={shoppingList.members.map((member) => member.name).join(", ")}
                />
                <h4 />
                <Uu5Elements.InfoItem
                  direction="vertical-reverse"
                  subtitle="Items"
                  title={shoppingList.items.map((item) => (
                    <Item key={item.id} {...item} />
                  ))}
                ></Uu5Elements.InfoItem>
              </div>
            </Uu5Elements.Block>
            <Uu5Forms.Form.Provider
              key={open}
              disabled={editAvailability}
              onSubmit={(e) => {
                let updatedName = e.data.value.shoppingListName;



                setShoppingList((prevList) => ({
                  ...prevList,
                  name: updatedName,

                }));

                setOpen(false);
              }}
            >
              <Uu5Elements.Modal
                open={open}
                onClose={() => setOpen(false)}
                header="Edit Shopping list"
                footer={
                  <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "end" })}>
                    <Uu5Forms.SubmitButton />
                    <Uu5Forms.CancelButton onClick={() => setOpen(false)} />
                  </div>
                }
              >
                <Uu5Forms.Form.View gridLayout="">
                  <Uu5Forms.FormText name="shoppingListName" label="Name" initialValue={shoppingList.name} required />
                  <h4 />
                  <Uu5Forms.FormText readOnly name="author" label="Author" initialValue={user.name} />
                  <h4 />
                  <Uu5Forms.FormText readOnly name="members" label="Members" initialValue={shoppingList.members.map((member) => member.name).join(", ")}/>
                  <h4 />
                  <div>Items</div>
                  <Uu5Elements.Block card="full">
                  {items.map((item) => (
                    <div key={item.id}>
                      {item.name}
                    </div>
                  ))}
                  </Uu5Elements.Block>
                </Uu5Forms.Form.View>
              </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>
          </>
        ) : (
          <Uu5Elements.Block 
          header="Sorry, you don't have access to this shopping list."
          headerType="title"
          card="full"/>
        )}
      </div>
    );
    //@@viewOn:render
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
