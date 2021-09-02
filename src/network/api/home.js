import axios from "../index";

export function getBanners() {
  return axios.get("/banner");
}

export function getIcons() {
  return axios.get("/homepage/dragon/ball");
}
