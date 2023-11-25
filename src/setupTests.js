//test setup file
//-------------------
//to enable fetchMock globally
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
// vi sets up the global fetch mock for you
const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
