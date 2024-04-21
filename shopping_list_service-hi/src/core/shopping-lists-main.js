//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import { useUser } from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { useEffect } from "uu5g05";
import ShoppingListTile from "./shopping-list-tile.js";
import { USERS } from "./user.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  itemContainer: () => Config.Css.css({
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "10px",
    paddingBottom: "10px"
  }),
  item: () => Config.Css.css({
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "10px",
    paddingBottom: "3px",
    marginBottom: "3px",
    ":last-child": {
      paddingBottom: 0,
      marginBottom: 0
    }
  }
  ),
  columnsCss: () => Config.Css.css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 336px)",
    gap: "10px",
    margin: "10px",
  })
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

  render({ shoppingListObjects, setShoppingLists }) {
    // const shoppingListObjects = props.shoppingListObjects;

    //@@viewOn:private
    // const { children } = props;
    const user = useUser();

    // const [shoppingLists, setShoppingLists] = useState(shoppingListObjects);
    const [open, setOpen] = useState(false);
    const [newShoppingList, setNewShoppingList] = useState({
      name: "",
      archive: false,
      members: [],
      items: []
    });

    const [openMemberAddField, setOpenMemberAddField] = useState(false);
    const [newMemberId, setNewMemberId] = useState('');

    const handleDelete = (id) => {
      setShoppingLists(prevItems => prevItems.filter(shoppingList => shoppingList.id !== id));
    }

    const getFilteredUsers = () => {
      const memberIds = new Set(newShoppingList.members.map(member => member.id));
      memberIds.add(user.id);
      return USERS.filter(user => !memberIds.has(user.id));
    };

    const addMember = (newMember) => {
      setNewShoppingList(prevState => ({
        ...prevState,
        members: [...prevState.members, newMember]
      }));
    };

    const addItem = (name) => {
      const newItem = {
        id: Date.now().toString(),
        name: name,
        completed: false
      };
      setNewShoppingList(prevState => ({
        ...prevState,
        items: [...prevState.items, newItem]
      }));
    };

    const deleteItem = (id) => {
      setNewShoppingList(prevState => ({
        ...prevState,
        items: prevState.items.filter(item => item.id !== id)
      }));
    };

    const updateItemName = (itemId, newName) => {
      setNewShoppingList(prevList => ({
        ...prevList,
        items: prevList.items.map(item =>
          item.id === itemId ? { ...item, name: newName } : item
        )
      }));
    };


    function fetchUserData(userId) {
      return new Promise((resolve, reject) => {
        const user = USERS.find(user => user.id === userId);
        if (user) {
          resolve(user);
        } else {
          reject("User not found");
        }
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedList = {
        ...newShoppingList,
        id: Utils.String.generateId(),
        author: user.name,
        authorId: user.id
      };
      setShoppingLists(prev => [...prev, updatedList]);
      setOpen(false);
      setNewShoppingList({
        name: "",
        archive: false,
        members: [],
        items: []
      })
    };
    // useEffect(() => {
    //   setHasAccess(shoppingList.members.some(member => member.id === user.id) || user.id === shoppingList.authorId);
    // }, [user, shoppingList]);

    //@@viewOff:private
    return (
      <>
        <Uu5Elements.Block
          header="Shopping Lists"
          headerType="title"
          card="full"
          actionList={[{ icon: "uugds-plus", children: "Add", onClick: () => setOpen(true) }]}
        >
          {shoppingListObjects.map((shoppingList) => (
            <ShoppingListTile
              key={shoppingList.id}
              onDelete={handleDelete}
              shoppingListTile={shoppingList}
              className={Css.columnsCss()}
            >
            </ShoppingListTile>
          ))}
        </Uu5Elements.Block>
        <Uu5Forms.Form.Provider key={open} onSubmit={handleSubmit} >
          <Uu5Elements.Modal
            open={open}
            onClose={() => setOpen(false)}
            header="Add Shopping list"

            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "end" })}>
                <Uu5Forms.SubmitButton />
                <Uu5Forms.CancelButton onClick={() => {
                  setOpen(false);
                  setNewShoppingList({
                    name: "",
                    archive: false,
                    members: [],
                    items: []
                  })
                  }} />

              </div>
            }
          >
            <Uu5Forms.Form.View gridLayout="">
              <Uu5Forms.FormText
                name="shoppingListName"
                label="Name"
                onChange={(e) => setNewShoppingList({ ...newShoppingList, name: e.target.value })}
                required
              />
              <h4 />
              <Uu5Forms.FormText
                disabled
                name="author"
                label="Author"
                initialValue={user.name}
              />
              <h4 />
              <div className={Css.itemContainer()}>
                <Uu5Forms.Label>Members</Uu5Forms.Label>
                <Uu5Elements.Button
                  title="Add"
                  icon="uugds-plus"
                  onClick={() => setOpenMemberAddField(true)} />
              </div>
              <Uu5Elements.Dialog
                open={openMemberAddField}
                onClose={() => {
                  setOpenMemberAddField(false);
                  setNewMemberId('');
                }}
                header="Add member"
                info="You need to select new member"
                actionDirection="horizontal"
                children={[
                  <Uu5Forms.Select
                    label="Select User"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.data.value)}
                    itemList={getFilteredUsers().map(user => ({
                      value: user.id,
                      children: user.name
                    }))}
                  />
                ]}
                actionList={[
                  {
                    children: "Cancel",
                    onClick: () => {
                      setOpenMemberAddField(false);
                      setNewMemberId('');
                    },
                  },
                  {
                    children: "Submit",
                    onClick: () => {
                      if (newMemberId) {
                        fetchUserData(newMemberId).then(user => {
                          addMember(user);
                          setOpenMemberAddField(false);
                          setNewMemberId('');
                        }).catch(error => {
                          console.error("Error fetching user:", error);
                          alert("User data could not be found.");
                          setOpenMemberAddField(true);
                        });
                      } else {
                        alert("Please enter a valid user ID");
                      }
                    },
                    colorScheme: "positive",
                    significance: "highlighted",
                  },
                ]}
              />

              <div>
                {newShoppingList.members.map(member => (
                  <div key={member.id} className={Css.item()}>
                    <Uu5Forms.FormText
                      name={`member-${member.id}`}
                      value={member.name}
                      initialValue={member.name}
                    />
                    <Uu5Elements.Button icon="uugds-close" onClick={() => deleteMember(member.id)} />
                  </div>
                ))}
              </div>
              <h4 />
              <div className={Css.itemContainer()}>
                    <Uu5Forms.Label>Items</Uu5Forms.Label>
                    <Uu5Elements.Button title="Add" icon="uugds-plus" onClick={() => addItem("New Item")} />
                  </div>
                  <div>
                    {newShoppingList.items.map(item => (
                      <div key={item.id} className={Css.item()}>
                        <Uu5Forms.FormText
                          name={`item-${item.id}`}
                          value={item.name}
                          initialValue={item.name}
                          onChange={(e) => updateItemName(item.id, e.target.value)}
                        />
                        <Uu5Elements.Button icon="uugds-delete" colorScheme="red" onClick={() => deleteItem(item.id)} />
                      </div>
                    ))}
                  </div>
            </Uu5Forms.Form.View>
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
  }
});

//@@viewOn:exports
export { ShoppingListsMain };
export default ShoppingListsMain;
//@@viewOff:exports
