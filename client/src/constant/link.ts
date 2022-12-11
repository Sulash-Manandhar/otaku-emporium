import { AiFillHeart, AiFillInstagram, AiTwotoneHome } from "react-icons/ai";
import { GiFeatherNecklace, GiRolledCloth } from "react-icons/gi";
import { IoLogoWhatsapp, IoMdPerson } from "react-icons/io";
import { BsFacebook, BsFillCartFill } from "react-icons/bs";
import { LINK_SCHEMA } from "../Schema/link.schema";
import urls from "../routes/urls";

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

export const SOCIAL_LINK: LINK_SCHEMA = [
  {
    id: 1,
    name: "Instagram",
    icon: AiFillInstagram,
    path: urls.instagram,
  },
  {
    id: 2,
    name: "WhatsApp",
    icon: IoLogoWhatsapp,
    path: urls.whatsapp,
  },
  {
    id: 3,
    name: "Facebook",
    icon: BsFacebook,
    path: urls.facebook,
  },
];
