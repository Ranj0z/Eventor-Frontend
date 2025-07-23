// pages/Dashboard/adminDashboard/aside/drawerData.ts

import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegMoneyBillAlt, FaTicketAlt, FaUserCheck, FaUserCog } from "react-icons/fa";
import type { IconType } from "react-icons";

export type DrawerData = {
  id: string;
  name: string;
  icon: IconType;
  link: string;
};

export const adminDrawerData: DrawerData[] = [
  {
    id: "users",
    name: "Users",
    icon: FiUsers,
    link: "users",
  },
  {
    id: "events",
    name: "Events",
    icon: FaCalendarAlt,
    link: "events",
  },
  {
    id: "venues",
    name: "Venues",
    icon: FaMapMarkerAlt,
    link: "venues",
  },
  {
    id: "rsvps",
    name: "RSVPs",
    icon: FaTicketAlt,
    link: "rsvps",
  },
  {
    id: "payments",
    name: "Payments",
    icon: FaRegMoneyBillAlt,
    link: "payments",
  },
  {
    id: "support-tickets",
    name: "Support Tickets",
    icon: FaUserCheck,
    link: "support-tickets",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: TbBrandGoogleAnalytics,
    link: "analytics",
  },
  {
    id: "profile",
    name: "Profile",
    icon: FaUserCog,
    link: "profile",
  },
];
