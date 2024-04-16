import LiveScore from "@/components/shared/LiveScore";
import { Button } from "@/components/ui/button";
import { getOngoingMatchDetails } from "@/lib/database/actions/match.actions";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("./login");
    return;
  }
  // Fetch ongoing match details

  const featuredEvents = [
    { title: "Football Tournament", date: "April 15, 2024" },
    { title: "Basketball Championship", date: "April 20, 2024" },
    { title: "Tennis Open", date: "April 25, 2024" },
  ];

  const latestNews = [
    { title: "New Training Facility Opening Soon", date: "April 10, 2024" },
    { title: "Athlete of the Month: John Doe", date: "April 12, 2024" },
    { title: "Upcoming Sports Events in the City", date: "April 14, 2024" },
  ];

  const popularItems = [
    { name: "Football Ground", category: "Grounds" },
    { name: "Basketball Court", category: "Grounds" },
    { name: "Tennis Rackets", category: "Equipment" },
    { name: "Football Jerseys", category: "Equipment" },
  ];

  const teamRegistrations = [
    { name: "Team Titans", date: "April 10, 2024" },
    { name: "Champion Squad", date: "April 12, 2024" },
    { name: "Elite United", date: "April 15, 2024" },
  ];

  const onGoingMatches = await getOngoingMatchDetails();

  return (
    <div>
      {session.user.role === "admin" ? (
        <>
          <h2 className=" text-2xl ml-2 md:text-3xl font-bold mb-1 px-6 mt-2 pt-4 w-full">
            Admin Dashboard
          </h2>
          <div className="w-[95%] mx-auto my-6 flex flex-col-reverse gap-4 md:flex-row items-center md:items-start justify-evenly">
            <div className="flex flex-col justify-center bg-white h-full items-center px-8 py-4 gap-3">
              <p className="max-w-lg text-slate-600 border-b mt-6 pb-4">
                Manage All acitivities and events from here. Equipements and
                ground bookings are also managed here on{" "}
                <span className="font-bold text-primary-500">
                  Sports Portal.
                </span>
              </p>
              {/* Conditional rendering for live match */}
              {onGoingMatches && onGoingMatches.length > 0 ? (
                <p className="text-lg font-semibold text-primary">
                  Live match streaming now
                </p>
              ) : (
                <p className="text-lg font-semibold text-primary">
                  Live Scores will be shown here once the match kicks off.
                </p>
              )}
            </div>
            <Image
              src="/heruo.png"
              width={165}
              height={380}
              alt="hero"
              className=" rounded-md"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className=" text-2xl ml-2 md:text-3xl font-bold mb-1 px-6 mt-2 pt-4 w-full">
            Welcome to Comsats Sports Portal
          </h2>
          <div className="w-[95%] mx-auto py-12 rounded-md bg-gradient-to-tl from-blue-950 to-blue-700 my-6 flex flex-col-reverse gap-4 md:flex-row px-4 lg:px-0 items-center justify-evenly">
            <div className="flex flex-col justify-center rounded-md shadow space-y-4 h-full items-center px-8 py-4 gap-3">
              <p className="max-w-lg text-lg text-white border-b mt-6 pb-4">
                Book grounds and equipment, participate in events, and register
                your teams—all on our{" "}
                <span className="font-bold text-white">Sports Portal.</span>
              </p>
              {/* Conditional rendering for live match */}
              {onGoingMatches && onGoingMatches.length > 0 ? (
                <p className="text-lg font-semibold text-white">
                  <span className=" mr-1">{onGoingMatches.length}</span> Live
                  match streaming now
                </p>
              ) : (
                <p className="text-lg font-semibold text-white">
                  Live Scores will be shown here once the match kicks off.
                </p>
              )}
            </div>
            <div className="p-2 border-2 border-slate-400 rounded-md">
              <Image
                src="/hero.jpg"
                width={395}
                height={380}
                alt="hero"
                className=" rounded"
              />
            </div>
          </div>
        </>
      )}
      {/* Hero section */}

      {/* {onGoingMatches &&
        onGoingMatches.length > 0 &&
        onGoingMatches.map((match) => {
          if (match.sportsType === "cricket") {
            return <div>heloo</div>;
          }
        })} */}
      {onGoingMatches && onGoingMatches.length > 0 && (
        <div className=" flex flex-col w-[93%] bg-white px-12 mx-auto   p-4 rounded-md shadow">
          <h2 className=" text-2xl font-bold border-b w-full pb-2 ">
            Live Matches
            <span id="dot" className="ml-1">
              .
            </span>{" "}
          </h2>
          <div className=" py-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
            {onGoingMatches.map((match) => (
              <div className=" flex flex-col items-center justify-center bg-blue-50 rounded-lg shadow-md p-3">
                <h2 className=" text-2xl font-bold leading-5 border-b w-full pb-4 flex justify-center my-4 ">
                  {match.sportsType}
                </h2>
                <div className=" flex items-center justify-evenly w-full">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={"/sheild.png"}
                      className=" mb-2"
                      width={80}
                      height={50}
                      alt="team"
                    />
                    <h2 className=" font-semibold text-xl leading-4">
                      {match.teamA}
                    </h2>
                  </div>
                  <div>
                    <p className=" font-semibold text-lg">
                      {/* <span className=" text-2xl font-bold">1</span> -{" "}
                  <span className=" text-2xl font-bold">3</span> */}
                      VS
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={"/sheild.png"}
                      className=" mb-2"
                      width={80}
                      height={50}
                      alt="team"
                    />
                    <h2 className=" font-semibold text-xl leading-4">
                      {match.teamB}
                    </h2>
                  </div>{" "}
                </div>
                <div className=" my-8 flex justify-center bg-white w-[90%] rounded-md p-3">
                  <Link
                    href="/livescore"
                    className=" inline-flex gap-2 items-center"
                  >
                    Checkout Details <MdArrowOutward className="text-lg" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Featured Events Section */}
      <div className="w-[95%] mx-auto my-6 rounded-md bg-white p-4 px-8 shadow">
        <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dummy Featured Events */}
          {featuredEvents.map((event, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              {/* Add more event details here */}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[95%] mx-auto my-6 rounded-md bg-white p-4 px-8 shadow">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dummy Latest News Articles */}
          {latestNews.map((article, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.date}</p>
              {/* Add more article details here */}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[95%] mx-auto my-6 rounded-md bg-white p-4 px-8 shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Popular Grounds and Equipment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dummy Popular Grounds and Equipment */}
          {popularItems.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              {/* Add more item details here */}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[95%] mx-auto my-6 rounded-md bg-white p-4 px-8 shadow">
        <h2 className="text-2xl font-semibold mb-4">Team Registrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dummy Team Registrations or Featured Teams */}
          {teamRegistrations.map((team, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
              <p className="text-sm text-gray-600">{team.date}</p>
              {/* Add more team details here */}
            </div>
          ))}
        </div>
      </div>
      {/* Call-to-Action Buttons */}
    </div>
  );
}
