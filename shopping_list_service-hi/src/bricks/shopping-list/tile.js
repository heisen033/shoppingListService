//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import { useUser } from "../../core/user.js";
import Uu5Elements from "uu5g05-elements";
import { useEffect } from "uu5g05";
import { useRoute  } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  item: () => Config.Css.css({
    display: "flex",
    justifyContent: "start",
    gap: "10px",
    margin: "10px",
    paddingBottom: "3px",
    marginBottom: "3px",
    ":last-child": {
      paddingBottom: 0,
      marginBottom: 0
    }
  }),
  buttonsContainer: () => Config.Css.css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ shoppingListTile, onDelete }) {
    //@@viewOn:private


    // const { shoppingList, onDelete } = props;
    // const shoppingList = props.shoppingListTile;
    // const onDelete = props.onDelete;

    const [hasAccess, setHasAccess] = useState(false);

    const [route, setRoute] = useRoute();
    const user = useUser();
    const [open, setOpen] = useState(false);
    //@@viewOff:private
    const isOwner = shoppingListTile.authorId === user.id;
    //@@viewOn:interface
    //@@viewOff:interface
    useEffect(() => {
      setHasAccess(shoppingListTile.members.some(member => member.id === user.id) || user.id === shoppingListTile.authorId);
    }, [user, shoppingListTile]);
    //@@viewOn:render

    return (
      <>
        {hasAccess ? (
          <>
            <Uu5Elements.Tile
              width={200}
              aspectRatio="1x1"
              className={Css.item()}
            >
              <h4 />
              <Uu5Elements.Header title={shoppingListTile.name} subtitle="" />
              <h4 />
              <Uu5Elements.InfoItem subtitle="Owner" title={shoppingListTile.author} />
              <h4 />
              <div className={Css.buttonsContainer()}>
                {/* <Link to={{
                  pathname: `/detail/${shoppingList.id}`,
                  state: { shoppingList }
                }}>
                  Detail
                </Link> */}
                <Uu5Elements.Button 
                onClick={() => setRoute("detail", { id: shoppingListTile.id })}>Detail</Uu5Elements.Button>
                {isOwner ? (
                  <Uu5Elements.Button icon="uugds-delete" onClick={() => setOpen(true)} colorScheme="negative" />
                ) : null}
              </div>
            </Uu5Elements.Tile>
            <Uu5Elements.Dialog
              open={open}
              onClose={() => { setOpen(false) }}
              header={`Are you sure that you want to delete ${shoppingListTile.name}?`}
              actionList={[
                {
                  children: "Cancel",
                  onClick: () => setOpen(false),
                },
                {
                  children: "Delete",
                  onClick: () => onDelete(shoppingListTile.id),
                  colorScheme: "negative",
                  significance: "highlighted",
                },
              ]}
            >
            </Uu5Elements.Dialog></>
        ) : (null)}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
