import { AiFillHeart, AiTwotoneHome } from "react-icons/ai";
import { GiFeatherNecklace, GiRolledCloth } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
import { LINK_SCHEMA } from "../Schema/link.schema";
import urls from "../route/urls";

export const PUBLIC_LINK: LINK_SCHEMA = [
  {
    id: 1,
    name: "Home",
    icon: AiTwotoneHome,
    path: urls.home,
  },
  {
    id: 2,
    name: "Apparels",
    icon: GiRolledCloth,
    path: urls.apparels,
  },
  {
    id: 3,
    name: "Accessories",
    icon: GiFeatherNecklace,
    path: urls.accessories,
  },
];

export const AUTH_LINK: LINK_SCHEMA = [
  {
    id: 1,
    name: "Profile",
    icon: IoMdPerson,
    path: urls.profile,
  },
  {
    id: 2,
    name: "Cart",
    icon: BsFillCartFill,
    path: urls.cart,
  },
  {
    id: 3,
    name: "Favourite",
    icon: AiFillHeart,
    path: urls.favourite,
  },
];
