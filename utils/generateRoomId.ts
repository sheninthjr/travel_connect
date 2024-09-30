import { createHash } from "crypto";

export function generateRoomId({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) {
  const sortedUuid = [userId1, userId2].sort();
  const combinedString = sortedUuid.join("-");
  const hash = createHash("sha256").update(combinedString).digest("hex");
  return hash;
}
