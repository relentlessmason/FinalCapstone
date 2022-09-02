import React from 'react';
import * as FaIcons from 'react-icons/fa/';
import * as GrIcons from 'react-icons/gr/';
import * as RiIcons from 'react-icons/ri/';
import * as VscIcons from 'react-icons/vsc/';
import * as MdIcons from 'react-icons/md/';
import * as BsIcons from 'react-icons/bs/';
import * as SiIcons from 'react-icons/si/';
import * as IoIcons from 'react-icons/io/';
import * as AiIcons from 'react-icons/ai/';


export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <SiIcons.SiJusteat />,
        cName: 'nav-text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <RiIcons.RiSearchLine />,
        cName: 'nav-text'
    },
    {
        title: 'Add Recipe',
        path: '/add-recipe',
        icon: <VscIcons.VscAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Favorites',
        path: '/favorite',
        icon: <AiIcons.AiOutlineHeart />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <BsIcons.BsCalendar3 />,
        cName: 'nav-text'
    },
    {
        title: 'Grocery List',
        path: '/grocery-list',
        icon: <BsIcons.BsFillBasket2Fill />,
        cName: 'nav-text'
    },
    {
        title: 'Pantry',
        path: '/pantry',
        icon: <FaIcons.FaCarrot />,
        cName: 'nav-text'
    },
    {
        title: 'LogOut',
        path: '/logout',
        icon: <MdIcons.MdOutlineLogout />,
        cName: 'nav-text'
    }
]