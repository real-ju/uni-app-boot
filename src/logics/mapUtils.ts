// 船讯网api坐标 -> 前端地图坐标
export const correctCoordinate = (lat: number, lng: number) => {
  const p = GPS.gcj_encrypt(lat, lng); // 纠偏
  return [p.lat, p.lon];
};
