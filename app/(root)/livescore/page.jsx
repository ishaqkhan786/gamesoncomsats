import Scorecard from "@/components/shared/Scorecard";
import { getAllEvents } from "@/lib/database/actions/event.actions";
import { getOngoingMatchDetails } from "@/lib/database/actions/match.actions";
const page = async () => {
  const events = await getAllEvents();
  //   console.log(events);
  const matches = await getOngoingMatchDetails();
  return (
    <>
      <Scorecard events={events} matches={matches} />
    </>
  );
};

export default page;
