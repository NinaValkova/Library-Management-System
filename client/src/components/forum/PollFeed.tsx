import type { Poll } from "../../models/poll";

import PollCard from "./PollCard";

interface Props {
  polls: Poll[];
  onChanged: () => Promise<void>;
}

export default function PollFeed({
  polls,
  onChanged,
}: Props) {
  if (polls.length === 0) {
    return null;
  }

  return (
    <>
      {polls.map((poll) => (
        <PollCard
          key={poll.id}
          poll={poll}
          onChanged={onChanged}
        />
      ))}
    </>
  );
}