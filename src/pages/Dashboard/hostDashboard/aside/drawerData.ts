// pages/Dashboard/hostDashboard/aside/drawerData.ts

import type { IconType } from "react-icons";
import { FaClipboardList, FaMoneyCheckAlt, FaUserEdit, FaPlusCircle } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

export type DrawerData = {
  id: string;
  name: string;
  icon: IconType;
  link: string;
};

export const hostDrawerData: DrawerData[] = [
  { id: "my-events", name: "My Events", icon: MdEvent, link: "my-events" },
  { id: "create-event", name: "Create Event", icon: FaPlusCircle, link: "create-event" },
  { id: "rsvps", name: "RSVPs", icon: FaClipboardList, link: "rsvps" },
  { id: "payments", name: "Payments", icon: FaMoneyCheckAlt, link: "payments" },
  { id: "profile", name: "Profile", icon: FaUserEdit, link: "profile" },
];
