import React from "react";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import {
    Logo,
    Sidebar as MUI_Sidebar,
    Menu,
    MenuItem,
} from "react-mui-sidebar";

import Menuitems from "./MenuItems";
import { Icon } from "@iconify/react";
import Link from "next/link";
import theme from "@/utils/theme";

const renderMenuItems = (items: any[], pathDirect: string) => {



    return items.map((item) => {
        if (item.subheader) {
            // Display Subheader
            return (
                <Box sx={{ margin: "0 -24px" }} key={item.subheader}>
                    <Menu
                        subHeading={item.subheader}
                        key={item.subheader}

                        ><></>
                    </Menu>
                </Box>
            );
        }
        return (
            <MenuItem
                key={item.id}
                isSelected={pathDirect === item?.href}
                icon={
                    item.icon ? (
                        <Icon icon={"solar:" + item.icon} width="24" height="24" />
                    ) : (
                        <Icon icon="mdi:circle" width="6" height="6" />
                    )
                }
                component="div"
                link={item.href && item.href !== "" ? item.href : undefined}
            >

                <Link href={item.href} target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}>
                    <Typography color={pathDirect === item?.href ? '#fff' : 'inherit'}>
                        {item.title}</Typography>
                </Link>
            </MenuItem>


        );
    });
};

const SidebarItems = () => {
    const pathname = usePathname();
    const pathDirect = pathname;

    return (
        <Box sx={{ px: "20px", overflowX: 'hidden' }}>
            <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#0085db"} themeSecondaryColor={'#0085db1a'}>
                <Box sx={{ margin: "0 -24px", padding: "24px 24px 0" }}>
                    <Logo img="/" component={Link} href="/" >Task Manager</Logo>
                </Box>
                {renderMenuItems(Menuitems, pathDirect)}
            </MUI_Sidebar>
        </Box>
    );
};

export default SidebarItems;

