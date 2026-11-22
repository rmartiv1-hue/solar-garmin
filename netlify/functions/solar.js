exports.handler = async () => {
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbz2m8Nwuy63cOtAscvLRFCky5mUYX-ZZWJx6F-KIWg97qlAhUqX0A44brDdy0S4F4oJ/exec";
  const res = await fetch(GOOGLE_URL);
  const data = await res.json();
  const acts = data.actions || [];
  const ids = ["a", "b", "c", "d", "e", "f", "g"];

  const entities = [
    {
      entity_id: "group.solar",
      state: "on",
      attributes: {
        friendly_name: "Solar",
        entity_id: ids.slice(0, acts.length).map((x) => "switch." + x),
      },
    },
  ];

  for (let i = 0; i < acts.length && i < ids.length; i++) {
    entities.push({
      entity_id: "switch." + ids[i],
      state: "on",
      attributes: { friendly_name: acts[i].title },
    });
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entities),
  };
};
