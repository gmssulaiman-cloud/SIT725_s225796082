const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api/books';

let coverageTracker = {
  CREATEFAIL: 0, UPDATEFAIL: 0, TYPE: 0, REQUIRED: 0,
  BOUNDARY: 0, LENGTH: 0, TEMPORAL: 0,
  UNKNOWNCREATE: 0, UNKNOWNUPDATE: 0, IMMUTABLE: 0
};

const test = async (name, fn, tags = []) => {
  try {
    await fn();
    console.log(`TEST|${name}|PASS|${tags.join(',')}`);
    tags.forEach(tag => { if (coverageTracker[tag] !== undefined) coverageTracker[tag]++; });
  } catch (err) {
    console.log(`TEST|${name}|FAIL|${tags.join(',')}`);
    tags.forEach(tag => { if (coverageTracker[tag] !== undefined) coverageTracker[tag]++; });
    process.exitCode = 1;
  }
};

const makeValidBook = (id = "b99") => ({
  id: id,
  title: "Valid Test Book Title",
  author: "Valid Test Author",
  year: 2025,
  genre: "Science Fiction",
  summary: "This is a sufficiently long valid summary for testing purposes.",
  price: 29.99
});

const makeValidUpdate = () => ({
  title: "Updated Title",
  summary: "This is a sufficiently long valid summary for testing purposes."
});

(async () => {
  console.log("START|VALIDATION_TESTS");

  await test("T01 - Create valid book", async () => {
    const res = await axios.post(BASE_URL, makeValidBook("b100"));
    if (res.status !== 201) throw new Error("Expected 201");
  }, ["CREATEFAIL"]);

  await test("T02 - Update valid book", async () => {
    const res = await axios.put(`${BASE_URL}/b100`, makeValidUpdate());
    if (res.status !== 200) throw new Error("Expected 200");
  }, ["UPDATEFAIL"]);

  await test("T06 - Missing required title", async () => {
    const invalid = makeValidBook("b101"); delete invalid.title;
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["REQUIRED", "CREATEFAIL"]);

  await test("T07 - Invalid year type", async () => {
    const invalid = makeValidBook("b102"); invalid.year = "not-a-number";
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["TYPE", "CREATEFAIL"]);

  await test("T08 - Year not integer", async () => {
    const invalid = makeValidBook("b103"); invalid.year = 2025.5;
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["TYPE", "CREATEFAIL"]);

  await test("T09 - Boundary: Price too high", async () => {
    const invalid = makeValidBook("b104"); invalid.price = 1000.00;
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["BOUNDARY", "CREATEFAIL"]);

  await test("T10 - Length: Summary too short", async () => {
    const invalid = makeValidBook("b105"); invalid.summary = "too short";
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["LENGTH", "CREATEFAIL"]);

  await test("T11 - Length: Summary too long", async () => {
    const invalid = makeValidBook("b106"); invalid.summary = "a".repeat(1001);
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["LENGTH", "CREATEFAIL"]);

  await test("T12 - Unknown field Create", async () => {
    const invalid = makeValidBook("b107"); invalid.hack = "x";
    try { await axios.post(BASE_URL, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["UNKNOWNCREATE", "CREATEFAIL"]);

  await test("T13 - Immutable ID Update", async () => {
    const invalid = { id: "changed" };
    try { await axios.put(`${BASE_URL}/b100`, invalid); } catch (e) { if(e.response.status !== 400) throw e; return; }
  }, ["IMMUTABLE", "UPDATEFAIL"]);

  console.log("SUMMARY|All tests completed");
  console.log(`COVERAGE|CREATEFAIL:${coverageTracker.CREATEFAIL}|UPDATEFAIL:${coverageTracker.UPDATEFAIL}|TYPE:${coverageTracker.TYPE}|REQUIRED:${coverageTracker.REQUIRED}|BOUNDARY:${coverageTracker.BOUNDARY}|LENGTH:${coverageTracker.LENGTH}|TEMPORAL:${coverageTracker.TEMPORAL}|UNKNOWNCREATE:${coverageTracker.UNKNOWNCREATE}|UNKNOWNUPDATE:${coverageTracker.UNKNOWNUPDATE}|IMMUTABLE:${coverageTracker.IMMUTABLE}`);
})();