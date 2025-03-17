import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  FontSpec,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useTheme } from "@/ThemeContext";
import Digits from "./Digits";
ChartJS.register(
  PointElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface MainProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  setToggleRight: (value: boolean) => void;
}

const Main = ({ setToggle, toggle, setToggleRight }: MainProps) => {
  const { theme, toggleTheme } = useTheme();

  const itemsArray = [
    {
      name: "Total Product Views",
      amount: "7,265",
      lightColor: "bg-[#EDEEFC]",
      color: "bg-[#EDEEFC]",
      percentage: "+11.01%",
      icon: "/arrowup.svg",
    },
    {
      name: "Visits",
      amount: "3,671",
      lightColor: "bg-[#E6F1FD]",
      color: "bg-[#E6F1FD]",
      percentage: "-0.03%",
      icon: "/arrowdown.svg",
    },

    {
      name: "New Users",
      amount: "156",
      lightColor: "bg-[#EDEEFC]",
      color: "bg-[#EDEEFC]",
      percentage: "+15.03%",
      icon: "/arrowup.svg",
    },

    {
      name: "Total Users",
      amount: "2,318",
      color: "bg-[#E6F1FD]",
      lightColor: "bg-[#E6F1FD]",
      percentage: "+6.08%",
      icon: "/arrowup.svg",
    },
  ];

  const traffic = [
    {
      name: "Google",
      icon: "/google.svg",
      dark: "/googledark.svg",
    },
    {
      name: "Youtube",
      icon: "/youtube.svg",
      dark: "/youtubedark.svg",
    },
    {
      name: "Instagram",
      icon: "/instagram.svg",
      dark: "/instagramdark.svg",
    },
    {
      name: "Pinterest",
      icon: "/pinterest.svg",
      dark: "/pinterestdark.svg",
    },
    {
      name: "Facebook",
      icon: "/facebook.svg",
      dark: "/facebookdark.svg",
    },
    {
      name: "Twitter",
      icon: "/twitter.svg",
      dark: "/twitterdark.svg",
    },
  ];

  const [chartData] = useState({
    labels: ["Linux", "Mac", "IOS", "Windows", "Android", "Other"],
    datasets: [
      {
        label: "Traffic by Device",
        data: [15000, 40000, 20000, 35000, 5000, 27000],
        backgroundColor: [
          "#9F9FF8",
          "#96E2D6",
          "#000000",
          "#92BFFF",
          "#AEC7ED",
          "#94E9B8",
        ],
        borderWidth: 0,
        borderRadius: 13,
      },
    ],
  });

  const getPieChartData = (theme: string) => ({
    labels: ["London", "Manchester", "Wigan", "Bristol"],
    datasets: [
      {
        label: "Traffic by Location",
        data: [52.1, 22.8, 13.9, 11.2],
        backgroundColor: [
          theme === "light" ? "#000000" : "#9F9FF8",
          "#9F9FF8",
          "#96E2D6",
          "#92BFFF",
        ],
        borderColor: theme === "light" ? "#F7F7F7" : "#4543431a",
        borderWidth: 3,
        borderRadius: 7,
      },
    ],
  });

  const pieData = getPieChartData(theme);

  type pieChartOptions = {
    responsive: boolean;
    maintainAspectRatio: boolean;

    plugins: {
      legend: {
        display: boolean;
        position: "top" | "center" | "right" | "bottom" | "left" | "chartArea";

        labels: {
          usePointStyle: boolean;
          pointStyle: "circle";
          color: string;
          generateLabels: (chart: any) => any[];
        };
      };
      title: {
        display: boolean;
        text: string;
        font: Partial<FontSpec>;
        color: string;
        padding: {
          top: number;
          bottom: number;
        };
      };
    };
  };

  const pieOptions: pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle", // Use circles for legend markers
          color: theme === "dark" ? "#FFFFFF" : "#000000",
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const backgroundColor = dataset.backgroundColor[i];
                return {
                  text: `${label.padEnd(20, " ")}${value}%`, // Display label with percentage
                  fillStyle: backgroundColor,
                  hidden: false,
                  index: i,
                  strokeStyle: "transparent",
                  pointStyle: "circle",
                  fontColor: theme === "dark" ? "#FFFFFF" : "#000000",
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: "Traffic by Location",
        font: {
          family: "Inter",
          size: 16,
          style: "normal",
          weight: "bold",
        },
        color: theme === "light" ? "#000000" : "#FFFFFF",
        padding: {
          top: 10,
          bottom: 40,
        },
      },
    },
  };

  const pieChartContainerStyle = {
    width: "100%",
    height: "250px", // Set a larger height for a bigger Pie Chart
    backgroundColor: "transparent",
  };

  type ChartOptions = {
    responsive: boolean;
    maintainAspectRatio: boolean;
    scales: {
      x: {
        grid: {
          display: boolean;
          drawBorder: boolean;
        };
        ticks: {
          display: boolean;
        };
      };
      y: {
        grid: {
          display: boolean;
          drawBorder: boolean;
        };
        ticks: {
          display: boolean;
          callback: (
            tickValue: string | number,
            index: number,
            ticks: any[]
          ) => string | number; // Compatible callback type
          stepSize: number;
        };
        min: number;
        max: number;
      };
    };
    plugins: {
      title: {
        display: boolean;
        text: string;
        align: "start" | "center" | "end" | undefined;
        font: Partial<FontSpec>;
        color: string;
        padding: {
          top: number;
          bottom: number;
        };
      };
      legend: {
        display: boolean;
      };
    };
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines on the x-axis
          drawBorder: false, // Remove the x-axis line
        },
        ticks: {
          display: true, // Keep x-axis ticks
        },
      },
      y: {
        grid: {
          display: false, // Remove gridlines on the y-axis
          drawBorder: false, // Remove the y-axis line
        },
        ticks: {
          display: true, // Show y-axis ticks
          callback: (tickValue: string | number) =>
            typeof tickValue === "number" && tickValue === 0
              ? tickValue.toString()
              : `${Number(tickValue) / 1000}k`, // Format y-axis labels
          stepSize: 10000, // Step size for the y-axis ticks
        },
        min: 0,
        max: 50000,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Traffic by Device",
        align: "start",
        font: {
          size: 16,
          weight: "bold",
          style: "normal",
          family: "Inter",
        } as any,
        color: theme === "light" ? "#000000" : "#FFFFFF",
        padding: {
          top: 10,
          bottom: 50,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const chartContainerStyle = {
    width: "100%",
    minHeight: "300px", // Set minimum height to ensure visibility
  };

  const chartRef = useRef<ChartJS<"doughnut">>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;

      const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.5, "#242424");
      gradient.addColorStop(1, "#827f7f");

      // Ensure backgroundColor is treated as an array of colors
      if (Array.isArray(chart.data.datasets[0].backgroundColor)) {
        chart.data.datasets[0].backgroundColor[0] = gradient;
      }
      chart.update();
    }
  }, [theme]);

  const getLineChartData = (theme: string) => ({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "This Month",
        data: [10000, 15000, 25000, 20000, 30000, 18000, 23000],
        borderColor: theme === "light" ? "#000000" : "#FFFFFF",
        backgroundColor: "#9F9FF8",
        fill: true,
        pointRadius: 0,
        pointBackgroundColor: "#9F9FF8",
        tension: 0.4,
      },
    ],
  });

  const lineChartData = getLineChartData(theme);

  type LineChartOptions = {
    responsive: boolean;
    maintainAspectRatio: boolean;
    scales: {
      x: {
        grid: {
          display: boolean;
          drawBorder: boolean;
        };
        ticks: {
          display: boolean;
        };
      };
      y: {
        grid: {
          display: boolean;
          drawBorder: boolean;
        };
        ticks: {
          display: boolean;
          callback: (
            tickValue: string | number
            // index: number,
            // ticks: any
          ) => string | number | string[] | number[] | null | undefined;
          stepSize: number;
        };

        min: number;
        max: number;
      };
    };
    plugins: {
      title: {
        display: boolean;
        text: string;
        align: "start" | "center" | "end" | undefined;
        font: Partial<FontSpec>;
        color: string;
        padding: {
          top: number;
          bottom: number;
          left: number;
          right: number;
        };
        backgroundColor: string;
        borderRadius: number;
        border: string;
      };
      legend: {
        display: boolean;
        position: "top" | "center" | "right" | "bottom" | "left" | "chartArea";
        labels: {
          usePointStyle: boolean;
          pointStyle: "circle";
        };
      };
    };
  };

  const lineChartOptions: LineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines on the x-axis
          drawBorder: false, // Remove the x-axis line
        },
        ticks: {
          display: true, // Keep x-axis ticks
        },
      },
      y: {
        grid: {
          display: false, // Remove gridlines on the y-axis
          drawBorder: false, // Remove the y-axis line
        },
        ticks: {
          display: true,
          callback: (
            tickValue: string | number
            // _index: number,
            // _ticks: any
          ) => {
            if (typeof tickValue === "number") {
              return tickValue === 0
                ? tickValue.toString()
                : `${tickValue / 1000}k`;
            } else {
              return tickValue;
            }
          },
          stepSize: 10000,
        },

        min: 0,
        max: 30000,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Total Users",
        align: "start",
        font: {
          size: 16,
          weight: "bold",
          style: "normal",
          family: "Inter",
        } as any,
        color: theme === "light" ? "#000000" : "#FFFFFF",
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
        backgroundColor: "#f0f0f0", // Add background color
        borderRadius: 10, // Make the title rounded
        border: "none", // Remove the border
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle", // Use circle point style
        },
      },
    },
  };

  const lineChartContainerStyle = {
    width: "100%",
    minHeight: "300px", // Set minimum height to ensure visibility
  };

  return (
    <main
      className={`min-h-screen w-full ${
        theme === "dark" ? "bg-black/80" : "bg-white"
      }`}
    >
      <nav
        className={`nav-container md:px-[2rem] px-[1rem] py-[1.4rem] border-b-[1px] flex items-center justify-between ${
          theme === "dark" ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <div className="first-item-container flex items-center gap-3  h-full">
          <button onClick={() => setToggle(!toggle)} className="outline-none">
            <Image
              src={theme === "dark" ? "/booklight.svg" : "/book.svg"}
              alt="svg-component"
              width={30}
              height={30}
            />
          </button>
          <Image
            src={theme === "dark" ? "/starlight.svg" : "star.svg"}
            alt="svg-component"
            width={30}
            height={30}
          />

          <small
            className={`md:block hidden ${
              theme === "dark" ? "text-white/40" : "text-black/40"
            }`}
          >
            Dashboard /
            <span
              className={`text-black ${
                theme === "dark" ? "text-gray-100" : "text-black/40"
              }`}
            >
              Default
            </span>
          </small>
        </div>
        <div className="second-item-container flex items-center justify-center gap-3">
          <div
            className={`search-input mr-[1rem] px-[.8rem]  ${
              theme === "light" ? "bg-gray-100" : "bg-white/10"
            } h-[2.5rem] rounded-[9px] md:flex hidden items-center w-[70%]`}
          >
            <div className="image-container">
              <Image
                src={theme === "light" ? "/search.svg" : "/darksearch.svg"}
                alt="search-icon"
                width={16}
                height={16}
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              className={`px-2 ${
                theme === "dark"
                  ? " placeholder:text-white/40"
                  : "placeholder:text-gray-300"
              } bg-transparent border-none outline-none text-[16px]`}
            />
          </div>

          <div className="toggle-section flex items-center justify-center gap-4">
            <div onClick={toggleTheme}>
              {theme === "dark" ? (
                <Image
                  src={"/darkbutton.svg"}
                  alt="toggle-button-icon"
                  width={35}
                  height={35}
                />
              ) : (
                <Image
                  src={"/lightbutton.svg"}
                  alt="toggle-button-icon"
                  width={35}
                  height={35}
                />
              )}
            </div>

            <div className="timer-container md:block hidden">
              {theme === "dark" ? (
                <Image
                  src={"/timerlight.svg"}
                  alt="timer-icon"
                  width={35}
                  height={35}
                />
              ) : (
                <Image
                  src={"/timer.svg"}
                  alt="timer-icon"
                  width={35}
                  height={35}
                />
              )}
            </div>

            <div
              onClick={() => setToggleRight(true)}
              className="notifications-container cursor-pointer"
            >
              <Image
                src={
                  theme === "dark"
                    ? "/notificationslight.svg"
                    : "/notifications.svg"
                }
                alt="notification toggle-icon"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container md:px-[2rem] px-[1rem] py-[2rem]">
        <section className="overview flex items-center justify-between">
          <span
            className={`block font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            } md:text-[1.25rem] text-[1rem]`}
          >
            Overview
          </span>
          <div className="item-container cursor-pointer flex items-center gap-2">
            <small
              className={`block ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Today
            </small>
            <Image
              src={
                theme === "light" ? "/selectarrow.svg" : "/selectarrowlight.svg"
              }
              alt="select-arrow"
              width={20}
              height={20}
            />
          </div>
        </section>

        <section className="cards-container flex-wrap mt-[2rem] w-full flex items-start justify-between gap-5 md:flex-row flex-col">
          {itemsArray.map((item) => (
            <div
              key={item.name}
              className={`card-item md:px-[1rem] items-center justify-center px-[1.4rem] md:py-[2rem] py-0 ${
                theme === "light" ? item.color : item.lightColor
              } rounded-[23px]`}
              style={{ flex: "1 190px", minWidth: "190px", width: "100%" }} // Full width on mobile, individual width on larger screens
            >
              <span className="block cursor-default hover:translate-x-1 transition-all delay-75 ease-in-out mb-[.8rem] text-[1rem] text-black">
                {item.name}
              </span>
              <div className="flex-container flex items-center justify-between gap-3">
                <span className="block font-semibold text-black md:text-[1.75vw] text-[1.5rem]">
                  {item.amount.split("").map((digit, index) => (
                    <Digits key={index} digit={digit} />
                  ))}
                </span>

                <div className="arrow-container flex items-center gap-3">
                  <small className="block cursor-default">
                    {item.percentage}
                  </small>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="cursor-default"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="chart-section mt-[4rem]">
          <div className="first-chart-section flex items-start justify-between md:flex-row flex-col">
            <div
              className={`mb-5 py-5 px-6 block min-h-[25rem] md:w-[74%] w-full rounded-[13px]  ${
                theme === "light" ? "bg-gray-100" : "bg-white/10"
              }`}
            >
              <div style={lineChartContainerStyle}>
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
            <div
              className={`py-5 px-6 block min-h-[25rem] md:w-[24%] w-full rounded-[13px]  ${
                theme === "light" ? "bg-gray-100" : "bg-white/10"
              }`}
            >
              <small
                className={`block font-bold text-[1rem] ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Traffic by Website
              </small>

              <div className="flex-container mt-[1rem]">
                <div className="">
                  {traffic.map((item) => (
                    <div
                      key={item.name}
                      className="item-card flex items-center gap-4"
                    >
                      <span
                        className={`block ${
                          theme === "light" ? "text-black" : "text-white"
                        }`}
                      >
                        {item.name}
                      </span>

                      <div className="icon-container  flex items-end justify-end">
                        <Image
                          src={theme === "light" ? item.icon : item.dark}
                          alt={item.name}
                          width={120}
                          height={80}
                          className=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="second-chart-section mt-[4rem] flex items-start justify-between gap-7 md:flex-row flex-col">
            <div
              className={`card-container
                ${
                  theme === "light" ? "bg-gray-100" : "bg-white/10"
                } mb-5 py-5 px-6 block min-h-[20rem] md:w-[50%] w-full rounded-[13px] bg-gray-100`}
            >
              <div className="title-container">
                <div style={chartContainerStyle}>
                  <Bar data={chartData} options={options} />
                </div>
              </div>
            </div>
            <div
              className={`card-container ${
                theme === "light" ? "bg-gray-100" : "bg-white/10"
              } py-5 px-6 block min-h-[21.3rem] md:w-[50%] w-full rounded-[13px] bg-gray-100`}
            >
              <div className="title-container flex items-start gap-3">
                <div style={pieChartContainerStyle}>
                  <Doughnut
                    ref={chartRef}
                    data={pieData}
                    options={pieOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
