import LiveScore from "@/components/shared/LiveScore";
import { Button } from "@/components/ui/button";
import { getOngoingMatchDetails } from "@/lib/database/actions/match.actions";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)

  if(!session){
    redirect("./login")
    return
  }
  console.log(session)
  // Fetch ongoing match details

  const featuredEvents = [
    { title: "Football Tournament", date: "April 15, 2024" },
    { title: "Basketball Championship", date: "April 20, 2024" },
    { title: "Tennis Open", date: "April 25, 2024" }
  ];

  const latestNews = [
    { title: "New Training Facility Opening Soon", date: "April 10, 2024" },
    { title: "Athlete of the Month: John Doe", date: "April 12, 2024" },
    { title: "Upcoming Sports Events in the City", date: "April 14, 2024" }
  ];

  const popularItems = [
    { name: "Football Ground", category: "Grounds" },
    { name: "Basketball Court", category: "Grounds" },
    { name: "Tennis Rackets", category: "Equipment" },
    { name: "Football Jerseys", category: "Equipment" }
  ];

  const teamRegistrations = [
    { name: "Team Titans", date: "April 10, 2024" },
    { name: "Champion Squad", date: "April 12, 2024" },
    { name: "Elite United", date: "April 15, 2024" }
  ];

  const matchDetails = await getOngoingMatchDetails();

  return (
    <>
      {/* Hero section */}
      <h2 className=" text-2xl md:text-3xl font-bold mb-1 px-6 mt-2 pt-4 w-full">Welcome to Comsats Sports Portal</h2>
      <div className="w-[95%] mx-auto my-6 flex flex-col-reverse gap-4 md:flex-row items-center md:items-start justify-evenly">

        <div className="flex flex-col justify-center bg-white h-full items-center px-8 py-4 gap-3">
          <p className="max-w-lg text-slate-600 border-b mt-6 pb-4">
            Book grounds and equipment, participate in events, and register your teams—all on our{" "}
            <span className="font-bold text-primary-500">Sports  Portal.</span>
          </p>
          {/* Conditional rendering for live match */}
          {matchDetails && matchDetails.length > 0 ? (
            <p className="text-lg font-semibold text-primary">Live match streaming now</p>
          ) : (
            <p className="text-lg font-semibold text-primary">Live Scores will be shown here once the match kicks off.</p>
          )}
        </div>
        <Image src="/hero.jpg" width={365} height={380} alt="hero" className=" rounded-md" />
      </div>

      {matchDetails && matchDetails.length > 0 && <LiveScore matchData={matchDetails[0]} />}

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
        <h2 className="text-2xl font-semibold mb-4">Popular Grounds and Equipment</h2>
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

    </>
  );
}
