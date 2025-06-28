// import axios from "axios";
// import { Province, District } from "../models";

// const importData = async () => {
//   const provincesRes = await axios.get("https://provinces.open-api.vn/api/p/");
//   const provinces = provincesRes.data;

//   for (const province of provinces) {
//     await Province.findOrCreate({
//       where: { id: province.code },
//       defaults: { name: province.name },
//     });

//     const districtsRes = await axios.get(
//       `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
//     );

//     const districts = districtsRes.data.districts;

//     for (const district of districts) {
//       await District.findOrCreate({
//         where: { id: district.code },
//         defaults: {
//           name: district.name,
//           province_id: province.code,
//         },
//       });
//     }

//     console.log(`✅ Đã import ${province.name}`);
//   }

//   console.log("🎉 Xong toàn bộ!");
//   process.exit();
// };

// importData().catch((err) => {
//   console.error("❌ Lỗi:", err.message);
//   process.exit(1);
// });
