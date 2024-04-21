//@@viewOn:imports
import { createVisualComponent, useState, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useUser } from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item.js";
import { useEffect } from "uu5g05";
import { USERS } from "./user.js";
import ItemEdit from "./item-edit.js";
import Uu5TilesElements from "uu5tilesg02-elements";
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

    const { ShoppingListReceived } = props;
    console.log(props.author)
    //@@viewOn:private
    //@@viewOff:private
    const user = useUser();
    const initialState = {
      id: "3887237",
      name: "James Shopping List",
      author: "James",
      authorId: "123",
      archived: false,
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

    const addItem = (name) => {
      const newItem = {
        id: Date.now().toString(),
        name: name,
        completed: false
      };
      setEditList(prevState => ({
        ...prevState,
        items: [...prevState.items, newItem]
      }));
    };

    const deleteItem = (id) => {
      setEditList(prevState => ({
        ...prevState,
        items: prevState.items.filter(item => item.id !== id)
      }));
    };

    const addMember = (user) => {
      if (user) {
        setEditList(prevState => ({
          ...prevState,
          members: [...prevState.members, user]
        }));
      } else {
        alert("No user data to add");
      }
    };

    const getFilteredUsers = () => {
      const memberIds = new Set(editList.members.map(member => member.id));
      memberIds.add(editList.authorId);

      return USERS.filter(user => !memberIds.has(user.id));
    };

    const deleteMember = (id) => {
      setEditList(prevState => ({
        ...prevState,
        members: prevState.members.filter(member => member.id !== id)
      }));
    };

    const handleOpenModal = () => {
      setEditList(shoppingList); // Синхронизация editList с текущим shoppingList при открытии модального окна
      setOpen(true);
    };

    const handleCloseModal = () => {
      setOpen(false);
    };

    const handleCancel = () => {
      setEditList(shoppingList); // Восстановление editList из shoppingList при отмене
      handleCloseModal();
    };

    const handleSubmit = () => {
      setShoppingList(editList); // Сохранение изменений из editList в shoppingList
      handleCloseModal();
    };

    const updateItemName = (itemId, newName) => {
      setEditList(prevList => ({
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
    // console.log(user.id, shoppingListExample.authorId);
    const [shoppingList, setShoppingList] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [editList, setEditList] = useState(initialState);
    const [openMemberAddField, setOpenMemberAddField] = useState(false);
    const [newMemberData, setNewMemberData] = useState(null);
    const [newMemberId, setNewMemberId] = useState('');
    const editAvailability = user.id === shoppingList.authorId;

    useEffect(() => {
      setHasAccess(shoppingList.members.some(member => member.id === user.id) || user.id === shoppingList.authorId);
    }, [user, shoppingList]);

    //@@viewOff:private
    return (
      <div>
      <Uu5Elements.Button href="home">Home</Uu5Elements.Button>
        {hasAccess ? (
          <>
            <Uu5Elements.Block
              header={shoppingList.name}
              headerType="title"
              card="full"
              actionList={[
                editAvailability ? {
                  children: "Edit",
                  onClick: handleOpenModal,
                } : {}
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
                  {user.id === shoppingList.authorId && 
                  <Uu5Elements.Button 
                  children={shoppingList.archived ? "Archived" : "Archive"}
                  colorScheme={"neutral"} 
                  onClick={() => {
                    console.log(shoppingList.archived)
                    setShoppingList((prevList) => ({
                      ...prevList,
                      archived: !prevList.archived,
                    }));
                  }}
                  />}
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Uu5Elements.Modal
                open={open}
                onClose={handleCancel}
                header="Edit Shopping list"
                footer={
                  <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "end" })}>
                    <Uu5Forms.SubmitButton onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }} />
                    <Uu5Forms.CancelButton onClick={handleCancel} />
                  </div>
                }
              >
                <Uu5Forms.Form.View gridLayout="">
                  <Uu5Forms.FormText
                    name="shoppingListName"
                    label="Name" value={editList.name}
                    initialValue={editList.name}
                    onChange={(e) => setEditList({ ...editList, name: e.target.value })}
                    required
                  />
                  <h4 />
                  <Uu5Forms.FormText disabled name="author" label="Author" initialValue={editList.author} />
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
                          setNewMemberId(''); // Reset on cancel to discard changes
                        },
                      },
                      {
                        children: "Submit",
                        onClick: () => {
                          if (newMemberId) {
                            fetchUserData(newMemberId).then(user => {
                              addMember(user);
                              setOpenMemberAddField(false);
                              setNewMemberId(''); // Clear input after successful addition
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
                    {editList.members.map(member => (
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
                    {editList.items.map(item => (
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
        ) : (
          <Uu5Elements.Block
            header="Sorry, you don't have access to this shopping list."
            headerType="title"
            card="full" />
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
