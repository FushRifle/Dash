import Image from "next/image";
import React from "react";
import { useTheme } from "@/ThemeContext";

const LAside = () => {
  const notifications = [
    {
      icon: "/bug.svg",
      name: "You fixed a bug",
      time: "Just now",
    },
    {
      icon: "/user.svg",
      name: "New user registered.",
      time: "59 minutes ago",
    },
    
    {
      icon: "/lane.svg",
      name: "Andi Lane subscribed to you.",
      time: "Today, 11:59AM",
    },
  ];

  const activities = [
    {
      name: "Changed the Style",
      icon: "/changedstyle.svg",
      time: "Just now",
    },
    {
      name: "Released a new version.",
      icon: "/newversion.svg",
      time: "59 minutes ago",
    },
    {
      name: "Submitted a bug.",
      icon: "/submittedbug.svg",
      time: "12 hours ago",
    },
    {
      name: "Modified a data in page X.",
      icon: "/modified.svg",
      time: "Today, 11:59AM",
    },
    {
      name: "Delete a page in Project X.",
      icon: "/deleted.svg",
      time: "Feb 2, 2025",
    },
  ];

  const contacts = [
    {
      name: "Natalie Craig",
      icon: "/natalie.svg",
    },
    {
      name: "Drew Cano",
      icon: "/drew.svg",
    },
    {
      name: "Andi Lane",
      icon: "/andilane.svg",
    },
    {
      name: "Koray Okumus",
      icon: "/koray.svg",
    },
    {
      name: "Kate Morrison",
      icon: "/kate.svg",
    },
    {
      name: "Melody Macy",
      icon: "/melody.svg",
    },
  ];

  const { theme } = useTheme();

  return (
    <aside
      className={`page-container md:px-[1.4rem] px-[1rem] py-[1.4rem] ${
        theme === "dark"
          ? "bg-black/80 border-gray-600"
          : "bg-white border-gray-200"
      } border-l-[1px] min-h-[128.4vh]`}
    >
      <section className="section-container">
        <span
          className={`title block ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Notifications
        </span>
        <div className="notifications mt-[1.5rem]">
          {notifications.map((item) => (
            <div
              key={item.name}
              className="notification-card p-1 rounded-[8px] cursor-default ease-in-out transition-all delay-[.25s] hover:bg-[#f2f0f0] mb-[1rem] flex items-center gap-2"
            >
              <Image src={item.icon} alt={item.name} width={25} height={25} />
              <div className="text-container">
                <span
                  className={`block ${
                    theme === "light" ? "text-black" : "text-white"
                  } notifications-text  text-[.9rem]`}
                >
                  {item.name}
                </span>
                <small
                  className={`block  text-[.7rem] ${
                    theme === "light" ? "text-black/40" : "text-white/40"
                  }`}
                >
                  {item.time}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container mt-[4rem]">
        <span
          className={`title ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Activities
        </span>
        <div className="notifications mt-[1.5rem]">
          {activities.map((item) => (
            <div
              key={item.name}
              className="notification-card mb-[1rem] flex items-center gap-2"
            >
              <Image src={item.icon} alt={item.name} width={30} height={30} />
              <div className="text-container">
                <span
                  className={`block  text-[.8rem] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.name}
                </span>
                <small
                  className={`block text-black/40 text-[.7rem] ${
                    theme === "light" ? "text-black/40" : "text-white/40"
                  }`}
                >
                  {item.time}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container mt-[4rem]">
        <span
          className={`title ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Contacts
        </span>
        <div className="notifications mt-[1.5rem]">
          {contacts.map((item) => (
            <div
              key={item.name}
              className="notification-card mb-[1rem] flex items-center gap-2"
            >
              <Image src={item.icon} alt={item.name} width={30} height={30} />
              <span
                className={`block  ${
                  theme === "dark" ? "text-white" : "text-black"
                } text-[.7rem]`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default LAside;
