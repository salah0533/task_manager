import { uniqueId } from "lodash";
interface MenuitemsType {
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: string;
}

const Menuitems: MenuitemsType[] = [
    {
        navlabel: true,
        subheader: "HOME",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: "screencast-2-line-duotone",
        href: "/",
    },
    {
        id: uniqueId(),
        title: "Task page",
        icon: "window-frame-broken",
        href: "/task-page",
    }
];

export default Menuitems;
