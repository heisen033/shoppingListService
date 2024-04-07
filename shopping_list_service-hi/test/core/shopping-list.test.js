import ShoppingListService from "shopping_list_service-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`ShoppingListService.Core.ShoppingList`, () => {
  testProperties(ShoppingListService.Core.ShoppingList, CONFIG);
});
