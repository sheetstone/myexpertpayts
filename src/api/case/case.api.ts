import { get, del, post, patch } from "../baseApi";
import { Case } from "./case.store";

async function getCases() {
  return get(`cases.json`);
}

async function deleteCase(id?:string) {
  if (id === undefined || id === "") {
    return;
  }
  return del(`cases/${id}.json`);
}

async function addCase(data: Case) {
  return post("cases.json", data);
}

async function updateCase(key:string, data: Case) {
  return patch(`cases/${key}.json`, data);
}

export { getCases, deleteCase, addCase, updateCase };