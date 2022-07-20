import { categoriesRoute } from '../data/routes';
import Service from './Service';

const CategoryService = new Service(categoriesRoute);

// CategoryService.get = async function get(params) {
//   const res = await fetch(
//     `${this.apiRoute}/get`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         alias: 'c',
//         join: {
//           left: 'parentId',
//           table: 'category pc',
//           right: 'pc.id',
//         },
//         columns: ['c.*, pc.name parentName'],
//         ...params,
//       }),
//     },
//   );
//   return res.json();
// };

export default CategoryService;
