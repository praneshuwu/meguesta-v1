import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { firebaseDB } from './firebase';

let cachedResults;
let fetchedResults = [];

export default async function getResults() {
  if (!cachedResults) {
    const imageListRef = ref(firebaseDB, 'guests/uploads');
    const response = await listAll(imageListRef);
    let id = 0;
    response.items.forEach(async (item, index) => {
      const imgUrl = await getDownloadURL(item);
      fetchedResults.push([{ id, imgUrl }]);
      id++;
      
    });

    cachedResults = fetchedResults;
  }

  console.log(cachedResults);
  
  return cachedResults;
}
