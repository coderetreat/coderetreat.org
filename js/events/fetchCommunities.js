export default async function fetchCommunities() {
  const result = await fetch("/events/communities.json");
  return Object.entries(await result.json())
    .map(([id, community]) => ({
      id,
      ...community,      
    }));
}
