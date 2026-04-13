const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api/books';

let coverageTracker = {
  CREATE_FAIL: 0, UPDATE_FAIL: 0, TYPE: 0, REQUIRED: 0,
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

const api = axios.create({
  validateStatus: () => true
});

const makeValidBook = (id = 'b99') => ({
  id,
  title: 'Valid Test Book Title',
  author: 'Valid Test Author',
  year: 2025,
  genre: 'Science Fiction',
  summary: 'This is a sufficiently long valid summary for testing purposes.',
  price: 29.99
});

const makeValidUpdate = () => ({
  title: 'Updated Book Title via Safe Write',
  summary: 'This summary was successfully updated using safe write validation.',
  year: 2024
});

(async () => {
  console.log('START|VALIDATION_TESTS');

  await test('T01 - Create valid book', async () => {
    const res = await api.post(BASE_URL, makeValidBook('b100'));
    if (res.status !== 201) throw new Error(`Expected 201 got ${res.status}`);
  }, ['CREATE_FAIL']);

  await test('T02 - Update valid book', async () => {
    const res = await api.put(`${BASE_URL}/b100`, makeValidUpdate());
    if (res.status !== 200) throw new Error(`Expected 200 got ${res.status}`);
  }, ['UPDATE_FAIL']);

  await test('T03 - Get all books', async () => {
    const res = await api.get(BASE_URL);
    if (res.status !== 200) throw new Error(`Expected 200 got ${res.status}`);
  }, []);

  await test('T04 - Get book by id', async () => {
    const res = await api.get(`${BASE_URL}/b100`);
    if (res.status !== 200) throw new Error(`Expected 200 got ${res.status}`);
  }, []);

  await test('T05 - Duplicate create', async () => {
    const res = await api.post(BASE_URL, makeValidBook('b100'));
    if (res.status !== 409) throw new Error(`Expected 409 got ${res.status}`);
  }, ['CREATE_FAIL']);

  await test('T06 - Missing required title', async () => {
    const invalid = makeValidBook('b101');
    delete invalid.title;
    const res = await api.post(BASE_URL, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['REQUIRED', 'CREATE_FAIL']);

  await test('T07 - Invalid year type', async () => {
    const invalid = makeValidBook('b102');
    invalid.year = 'not-a-number';
    const res = await api.post(BASE_URL, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['TYPE', 'CREATE_FAIL']);

  await test('T08 - Year in future', async () => {
    const invalid = makeValidBook('b103');
    invalid.year = 2035;
    const res = await api.post(BASE_URL, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['TEMPORAL', 'CREATE_FAIL']);

  await test('T09 - Summary too short', async () => {
    const invalid = makeValidBook('b104');
    invalid.summary = 'short';
    const res = await api.post(BASE_URL, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['LENGTH', 'CREATE_FAIL']);

  await test('T10 - Unknown field in CREATE', async () => {
    const invalid = makeValidBook('b105');
    invalid.hack = 'malicious';
    const res = await api.post(BASE_URL, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['UNKNOWNCREATE', 'CREATE_FAIL']);

  await test('T11 - Unknown field in UPDATE', async () => {
    const res = await api.put(`${BASE_URL}/b100`, { hack: 'malicious' });
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['UNKNOWNUPDATE', 'UPDATE_FAIL']);

  await test('T12 - Change ID on UPDATE', async () => {
    const invalid = makeValidUpdate();
    invalid.id = 'b999';
    const res = await api.put(`${BASE_URL}/b100`, invalid);
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
  }, ['IMMUTABLE', 'UPDATE_FAIL']);

  console.log('SUMMARY|All tests completed');
  console.log(
    `COVERAGE|CREATE_FAIL:${coverageTracker.CREATE_FAIL}|UPDATE_FAIL:${coverageTracker.UPDATE_FAIL}|TYPE:${coverageTracker.TYPE}|REQUIRED:${coverageTracker.REQUIRED}|BOUNDARY:${coverageTracker.BOUNDARY}|LENGTH:${coverageTracker.LENGTH}|TEMPORAL:${coverageTracker.TEMPORAL}|UNKNOWNCREATE:${coverageTracker.UNKNOWNCREATE}|UNKNOWNUPDATE:${coverageTracker.UNKNOWNUPDATE}|IMMUTABLE:${coverageTracker.IMMUTABLE}`
  );
})();