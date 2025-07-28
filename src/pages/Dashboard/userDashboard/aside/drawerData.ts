// pages/Dashboard/userDashboard/aside/drawerData.ts

import type { IconType } from "react-icons";
import { FaTicketAlt, FaClipboardCheck, FaHistory, FaRegCommentDots, FaUser, FaCalendarAlt } from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: IconType;
  link: string;
};

export const userDrawerData: DrawerData[] = [
  {
    id: "events",
    name: "Events",
    icon: FaCalendarAlt,
    link: "events",
  },
  { id: "my-rsvps", name: "My RSVPs", icon: FaClipboardCheck, link: "my-rsvps" },
  { id: "event-history", name: "Event History", icon: FaHistory, link: "event-history" },
  { id: "support", name: "Support", icon: FaRegCommentDots, link: "support" },
  { id: "profile", name: "Profile", icon: FaUser, link: "profile" },
];
